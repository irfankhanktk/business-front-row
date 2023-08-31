import React, { FC } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { mvs } from '../../services/metrices';
type IProps = {
  containerStyle?: object | undefined;
  style?: object | undefined;
  uri?: any;
  imageStyle?: object | undefined;
  borderRadius: number,
  isUser?: boolean;
  resizeMode?: string;
  props?: {
    children: JSX.Element
  };
}
const ImagePlaceholder: FC<IProps> = ({ containerStyle, style, isUser = false, borderRadius = 0, uri, imageStyle, resizeMode = 'cover', ...props }) => {

  return (
    <ImageBackground
      //source={ isUser?require('../../../src/assets/images/user.png'):require('../../../src/assets/images/placeholder.png')}
      style={{ height: mvs(40), width: mvs(40), borderRadius: mvs(borderRadius), ...containerStyle, overflow: 'hidden' }}>
      <Image
        source={uri}
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'flex-end',
          position: 'absolute', ...imageStyle
        }}
        resizeMode={resizeMode}
      />
    </ImageBackground>
  );
};

export default ImagePlaceholder;

const styles = StyleSheet.create({});
