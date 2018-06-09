/* @flow */

import React, { // eslint-disable-line no-unused-vars
  Component,
} from 'react';

import {
  Image,
  View,
} from 'react-native';


type NetworkImage = { uri: string };
type ImageSource = NetworkImage | number;

type Style = number | string | Object | Array<?Style>;

type Props = {
  placeholderSource?: ImageSource,
  style: {
    width: number,
    height: number,
    [key: string]: Style,
  },
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center',
  source: NetworkImage,
};

type State = {
  loaded: boolean,
};

class AsyncImage extends Component<Props, State> {
  props: Props
  state: State

  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  _onLoad = () => {
    this.setState(() => ({ loaded: true }));
  }

  render() {
    const {
      placeholderSource,
      style,
      source,
      resizeMode,
    } = this.props;

    const {
      loaded,
    } = this.state;

    return (
      <View
        style={style}
      >
        <Image
          source={source}
          resizeMode={resizeMode || 'contain'}
          style={[
            style,
            {
              position: 'absolute',
            },
          ]}
          onLoad={this._onLoad}
        />

        {(placeholderSource && !loaded) &&
          <Image
            source={placeholderSource}
            style={[
                    style,
                    {
                      position: 'absolute',
                    },
            ]}
          />
        }

      </View>
    );
  }
}

export { AsyncImage };
