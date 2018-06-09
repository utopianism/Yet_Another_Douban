// @flow

import React from 'react';
import {
  View,
  Dimensions,
  FlatList,
} from 'react-native';

import { CastCell } from './CastCell';
import type { Cast } from '../types/TypeDefinition';
import { ImageListFooter } from './ImageListFooter';


type Props = {
  onPress?: () => void,
  casts: Array<Cast>,
};

const WIDTH = Dimensions.get('window').width;

const renderItem = ({ item }) => {
  return (
    <CastCell
      name={item.name}
      title={item.title}
      imgURI={item.imgURI}
    />
  );
};


const CastsList = (props: Props) => {
  return (
    <View
      style={styles.containerStyle}
      onPress={props.onPress}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
        horizontal={true}
        renderItem={row => renderItem(row)}
        data={props.casts}
        keyExtractor={(item, index) => `casts${index}`}
        initialNumToRender={5}
        windowSize={3}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        ListFooterComponent={() => {
          return <ImageListFooter title="全部" count={`${props.casts && props.casts.length}人`} />;
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
};

export { CastsList };
