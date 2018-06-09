
// @flow
import * as React from 'react';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../config';

type Props = {
  rating: number,
  size: number,
};

const RatingStar = (props: Props) => {
  const starView = () => {
    const ratingStar = [];
    const starLength = Math.round((props.rating + 0.5) / 2);
    for (let i = 0; i < starLength; i += 1) {
      if (i === starLength - 1) {
        if ((2 * (i + 1)) - props.rating > 0.5) {
          ratingStar.push(<FontAwesome
            style={{ marginLeft: 3 }}
            size={props.size}
            color={colors.gold}
            name="star-half-empty"
            key={`${i}star`}
          />);
        } else {
          ratingStar.push(<FontAwesome
            style={{ marginLeft: 3 }}
            size={props.size}
            color={colors.gold}
            name="star"
            key={`${i}star`}
          />);
        }
      } else {
        ratingStar.push(<FontAwesome
          style={{ marginLeft: 3 }}
          size={props.size}
          color={colors.gold}
          name="star"
          key={`${i}star`}
        />);
      }
    }
    for (let j = 0; j < 5 - starLength; j += 1) {
      ratingStar.push(<FontAwesome
        style={{ marginLeft: 3 }}
        size={props.size}
        color={colors.gold}
        name="star-o"
        key={`${j}nostar`}
      />);
    }
    return ratingStar;
  };

  return (
    <View
      style={{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {starView()}
    </View>
  );
};

export { RatingStar };
