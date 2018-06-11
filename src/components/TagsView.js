// @flow

import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../config';

const WIDTH = Dimensions.get('window').width;

type Props = {
  tags: Array<string> | null;
  onPress?: () => void,
};

const TagsView = (props: Props) => {
  const {
    containerStyle,
    textViewStyle,
    textStyle,
  } = styles;
  const { tags, onPress } = props;
  return (
    <View style={containerStyle} >
      {tags && tags.map((tag, index) => {
        return (
          <TouchableOpacity
            style={textViewStyle}
            onPress={onPress}
            key={`touch${index + 3}`}
          >
            <Text style={textStyle} key={`text${index + 2}`}>
              {tag}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color={colors.primary}
              style={{ backgroundColor: 'transparent' }}
              key={`icon${index + 1}`}
            />
          </TouchableOpacity>
        );
      })}
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
  textViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tags,
    opacity: 0.7,
    marginRight: 5,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 0.3,
    borderColor: colors.primary,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.primary,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 0,
  },
};

export { TagsView };
