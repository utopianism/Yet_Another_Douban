// @flow

import React from 'react';
import {
  View,
  Dimensions,
  FlatList,
} from 'react-native';

import { CommentCell } from './CommentCell';
import type { Comment } from '../types/TypeDefinition';


type Props = {
  comments: Array<Comment> | null,
};

const WIDTH = Dimensions.get('window').width;

const Comments = (props: Props) => {
  return (
    <View style={styles.containerStyle} >
      <FlatList
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CommentCell comment={item} />}
        data={props.comments}
        keyExtractor={(item, index) => `comment${index}`}
        initialNumToRender={5}
        windowSize={3}
      />
    </View>
  );
};


const styles = {
  containerStyle: {
    flex: 1,
    width: WIDTH,
  },
};

export { Comments };
