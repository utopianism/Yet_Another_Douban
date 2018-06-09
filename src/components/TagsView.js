// @flow

import React from 'react';
import { View, Dimensions } from 'react-native';
import { TagsButton } from './TagsButton';

const WIDTH = Dimensions.get('window').width;

type Props = {
  tags: Array<string>;
};

const TagsView = (props: Props) => {
  const { containerStyle } = styles;
  const { tags } = props;
  return (
    <View style={containerStyle}>
      {tags.map((tag, index) => <TagsButton title={tag} uniqueKey={`tags${index}`} />)}
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    margin: 15,
    marginTop: 0,
    marginBottom: 0,
    width: WIDTH - 30,
  },
};

export { TagsView };
