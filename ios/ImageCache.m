//
//  ImageCache.m
//  douban
//
//  Created by Jarvis Zeng on 2018/6/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//
// ref link: https://stackoverflow.com/questions/19993307/how-do-i-download-an-image-from-a-url-and-save-it-to-my-computer

#import "ImageCache.h"

@implementation ImageCache

- (NSString *)saveImagesInLocalDirectory:(NSString *)imgURL {
  NSString *documentsDirectoryPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
  NSString *imgName = [[NSURL URLWithString:imgURL] lastPathComponent];
  NSFileManager *fileManager = [NSFileManager defaultManager];
  NSString *writablePath = [documentsDirectoryPath stringByAppendingPathComponent:imgName];
  if(![fileManager fileExistsAtPath:writablePath]){
    // file doesn't exist
    NSLog(@"file doesn't exist and imgName: %@", imgName);
    if (imgName) {
      //save Image From URL
      [self getImageFromURLAndSaveItToLocalData:imgName fileURL:imgURL inDirectory:documentsDirectoryPath];
    }
  }
  else{
    // file exist
    NSLog(@"file exist");
  }
  return writablePath;
}

- (void)getImageFromURLAndSaveItToLocalData:(NSString *)imageName fileURL:(NSString *)fileURL inDirectory:(NSString *)directoryPath {
  NSData * data = [NSData dataWithContentsOfURL:[NSURL URLWithString:fileURL]];
  NSError *error = nil;
  [data writeToFile:[directoryPath stringByAppendingPathComponent:[NSString stringWithFormat:@"%@", imageName]] options:NSAtomicWrite error:&error];
  if (error) {
    NSLog(@"Error Writing File : %@",error);
  }else{
    NSLog(@"Image %@ Saved SuccessFully",imageName);
  }
}

// TODO: add some strategy for image clear
- (void)clear {
  NSString *folderPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
  NSError *error = nil;
  for (NSString *file in [[NSFileManager defaultManager] contentsOfDirectoryAtPath:folderPath error:&error]) {
    [[NSFileManager defaultManager] removeItemAtPath:[folderPath stringByAppendingPathComponent:file] error:&error];
  }
}

@end
