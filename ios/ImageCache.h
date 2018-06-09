//
//  ImageCache.h
//  douban
//
//  Created by Jarvis Zeng on 2018/6/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ImageCache : NSObject
- (NSString *)saveImagesInLocalDirectory:(NSString *)imgURL;
- (void)clear;
@end
