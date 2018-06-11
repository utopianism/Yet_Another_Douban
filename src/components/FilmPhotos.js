// @flow

import React from 'react';
import {
  View,
  Dimensions,
  FlatList,
} from 'react-native';

import { FilmPhotoCell } from './FilmPhotoCell';
import { ImageListFooter } from './ImageListFooter';


type Props = {
  onPress?: () => void,
  imgURLs: Array<string> | null,
  photosCount: number,
};

const WIDTH = Dimensions.get('window').width;

const FilmPhotos = (props: Props) => {
  return (
    <View
      style={styles.containerStyle}
      onPress={props.onPress}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
        horizontal={true}
        renderItem={({ item }) => <FilmPhotoCell imgURI={item} />}
        data={props.imgURLs}
        keyExtractor={(item, index) => `FilmPhotos${index}`}
        initialNumToRender={5}
        windowSize={3}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        ListFooterComponent={() => {
          return <ImageListFooter style={styles.listFooterStyle} title="全部剧照" count={`${props.photosCount}张`} />;
        }}
      />
    </View>
  );
};


const styles = {
  containerStyle: {
    width: WIDTH,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooterStyle: {
    height: 140,
    width: 140,
    borderRadius: 0,
  },
};

export { FilmPhotos };
