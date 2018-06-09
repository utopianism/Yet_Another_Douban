//
//  ImageColors.m
//  douban
//
//  Created by Jarvis Zeng on 2018/6/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//
// ref link: https://stackoverflow.com/questions/15962893/determine-primary-and-secondary-colors-of-a-uiimage/41401246

#import "ImageColors.h"

@interface Colour : NSObject
@property int r, g, b, d;
@end

@implementation Colour
@end


@implementation ImageColors

-(NSDictionary *)colorsForImage:(UIImage *)image forEdge:(int)edge {
  
  NSLog(@"start");
  
  //1. set vars
  float dimension = 20;
  
  //2. resize image and grab raw data
  //this part pulls the raw data from the image
  CGImageRef imageRef = [image CGImage];
  CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
  unsigned char *rawData = (unsigned char*) calloc(dimension * dimension * 4, sizeof(unsigned char));
  NSUInteger bytesPerPixel = 4;
  NSUInteger bytesPerRow = bytesPerPixel * dimension;
  NSUInteger bitsPerComponent = 8;
  CGContextRef context = CGBitmapContextCreate(rawData, dimension, dimension, bitsPerComponent, bytesPerRow, colorSpace, kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
  CGColorSpaceRelease(colorSpace);
  CGContextDrawImage(context, CGRectMake(0, 0, dimension, dimension), imageRef);
  CGContextRelease(context);
  
  //3. create colour array
  NSMutableArray * colours = [NSMutableArray new];
  float x = 0, y = 0; //used to set coordinates
  float eR = 0, eB = 0, eG = 0; //used for mean edge colour
  for (int n = 0; n<(dimension*dimension); n++){
    
    Colour * c = [Colour new]; //create colour
    int i = (bytesPerRow * y) + x * bytesPerPixel; //pull index
    c.r = rawData[i]; //set red
    c.g = rawData[i + 1]; //set green
    c.b = rawData[i + 2]; //set blue
    [colours addObject:c]; //add colour
    
    //add to edge if true
    if ((edge == 0 && y == 0) || //top
        (edge == 1 && x == 0) || //left
        (edge == 2 && y == dimension-1) || //bottom
        (edge == 3 && x == dimension-1)){ //right
      eR+=c.r; eG+=c.g; eB+=c.b; //add the colours
    }
    
    //update pixel coordinate
    x = (x == dimension - 1) ? 0 : x+1;
    y = (x == 0) ? y+1 : y;
    
  }
  free(rawData);
  
  //4. calculate edge colour
  Colour * e = [Colour new];
  e.r = eR/dimension;
  e.g = eG/dimension;
  e.b = eB/dimension;
  
  //5. calculate the frequency of colour
  NSMutableArray * accents = [NSMutableArray new]; //holds valid accents
  
  float minContrast = 3.1; //play with this value
  while (accents.count < 3) { //minimum number of accents
    for (Colour * a in colours){
      
      //NSLog(@"contrast value is %f", [self contrastValueFor:a andB:e]);
      
      //5.1 ignore if it does not contrast with edge
      if ([self contrastValueFor:a andB:e] < minContrast){ continue;}
      
      //5.2 set distance (frequency)
      for (Colour * b in colours){
        a.d += [self colourDistance:a andB:b];
      }
      
      //5.3 add colour to accents
      [accents addObject:a];
    }
    
    minContrast-=0.1f;
  }
  
  //6. sort colours by the most common
  NSArray * sorted = [[NSArray arrayWithArray:accents] sortedArrayUsingDescriptors:@[[[NSSortDescriptor alloc] initWithKey:@"d" ascending:true]]];
  
  //6.1 set primary colour (most common)
  Colour * p = sorted[0];
  
  //7. get most contrasting colour
  float high = 0.0f; //the high
  int index = 0; //the index
  for (int n = 1; n < sorted.count; n++){
    
    Colour * c = sorted[n];
    float contrast = [self contrastValueFor:c andB:p];
    //float sat = [self saturationValueFor:c andB:p];
    
    if (contrast > high){
      high = contrast;
      index = n;
    }
  }
  //7.1 set secondary colour (most contrasting)
  Colour * s = sorted[index];
  
  NSLog(@"er %i eg %i eb %i", e.r, e.g, e.b);
  NSLog(@"pr %i pg %i pb %i", p.r, p.g, p.b);
  NSLog(@"sr %i sg %i sb %i", s.r, s.g, s.b);
  // 很明显，获取到 rgb 的结果太白的话，UI 上的效果不好，因为 UI 上的 nav title 是白色的
  if (e.r > 200) {
    e.r = 200;
  }
  if (e.g > 200) {
    e.g = 200;
  }
  if (e.b > 200) {
    e.b = 200;
  }
  NSDictionary *result = @{
                           @"background":[NSString stringWithFormat:@"rgb(%i,%i,%i)", e.r, e.g, e.b],
                           @"primary":[NSString stringWithFormat:@"rgb(%i,%i,%i)", p.r, p.g, p.b],
                           @"secondary":[NSString stringWithFormat:@"rgb(%i,%i,%i)", s.r, s.g, s.b],
                           };
  NSLog(@"end");
  return result;
  
}

-(float)contrastValueFor:(Colour *)a andB:(Colour *)b {
  float aL = 0.2126 * a.r + 0.7152 * a.g + 0.0722 * a.b;
  float bL = 0.2126 * b.r + 0.7152 * b.g + 0.0722 * b.b;
  return (aL>bL) ? (aL + 0.05) / (bL + 0.05) : (bL + 0.05) / (aL + 0.05);
}

-(float)saturationValueFor:(Colour *)a andB:(Colour *)b {
  float min = MIN(a.r, MIN(a.g, a.b)); //grab min
  float max = MAX(b.r, MAX(b.g, b.b)); //grab max
  return (max - min)/max;
}

-(int)colourDistance:(Colour *)a andB:(Colour *)b {
  return abs(a.r-b.r)+abs(a.g-b.g)+abs(a.b-b.b);
}

@end
