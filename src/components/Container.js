// @flow

import * as React from 'react';
import { View } from 'react-native';
import type { Style } from '../types/TypeDefinition';
import { constants } from '../config';

type Props = {
  children?: React.Node,
  style?: Style,
};

const Container = (props: Props) => {
  return (
    <View
      style={[{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: constants.isIphoneX ? 26 : 0,
      }, props.style]
    }
    >
      {props.children}
    </View>
  );
};

export { Container };
