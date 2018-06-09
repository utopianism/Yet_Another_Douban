// @flow

import * as React from 'react';
import { Text } from 'react-native';
import type { Style } from '../types/TypeDefinition';
import { colors } from '../config';

type Props = {
  children?: React.Node,
  style?: Style,
};

const BasicText = (props: Props) => {
  return (
    <Text
      style={[{
        fontSize: 14,
        color: colors.fontgrey,
        padding: 15,
      }, props.style]
    }
    >
      {props.children}
    </Text>
  );
};

export { BasicText };
