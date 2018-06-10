
#import "NativeInterface.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import "ImageCache.h"
#import "ImageColors.h"


@interface NativeInterface()
@property (strong, atomic) ImageCache *cache;
@property (strong, atomic) ImageColors *imageColors;
@end

@implementation NativeInterface

- (instancetype)init
{
    self = [super init];
    if (self) {
      
      self.cache = [[ImageCache alloc] init];
      self.imageColors = [[ImageColors alloc] init];

    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(test)
{
  // Your implementation here
}

RCT_EXPORT_METHOD(clearCache)
{
  [self.cache clear];
}

RCT_EXPORT_METHOD(
                  downLoadImage:(NSString *)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
{
  NSString *localPath = [self.cache saveImagesInLocalDirectory:path];
  resolve(localPath);
}


RCT_EXPORT_METHOD(
                  imageColors:(NSString *)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
{
  UIImage *aImage = [UIImage imageNamed:path];
  NSDictionary *colorDict = [self.imageColors colorsForImage:aImage forEdge:1];
  resolve(colorDict);
}



@end





