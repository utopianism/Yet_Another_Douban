//
//  ImageColors.h
//  douban
//
//  Created by Jarvis Zeng on 2018/6/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ImageColors : NSObject
-(NSDictionary *)colorsForImage:(UIImage *)image forEdge:(int)edge;
@end
