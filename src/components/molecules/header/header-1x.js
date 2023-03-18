import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Back, BlackBack } from '../../../assets/headers-icons';
import Regular from '../../../presentation/typography/regular-text';
import SERVICES from '../../../services/common-services';
import { mvs } from '../../../services/metrices';
import Buttons from '../../atoms/Button';
import ImagePlaceholder from '../../atoms/Placeholder';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../services/colors';
import Bold from '../../../presentation/typography/bold-text';
import Medium from '../../../presentation/typography/medium-text';
export const CustomHeader = ({
  title = 'Home',
  allowBackBtn = false,
  spacebetween = false,
  post = false,
  userIcon = false,
  style,
  uri,
  loading,
  isShowDelete = false,
  onPost,
  onPressDelete, titleStyle,
  size = 18
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.CONTAINER, style, {}]}>
      <View style={{}}>
        {allowBackBtn && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BlackBack />
            </TouchableOpacity>
            {!spacebetween && (
              <View style={{ paddingLeft: mvs(21.5), flexDirection: 'row', alignItems: 'center' }}>
                <Medium
                  label={title}
                  style={{ ...styles.TITLE }}
                  size={size}
                />
              </View>
            )}
          </View>
        )}
      </View>
      {spacebetween && (
        <Bold
          label={title}
          style={{ ...styles.TITLE, color: colors?.lightgray1, ...titleStyle }}
        />
      )}
      <View style={{}}>
        {isShowDelete && <TouchableOpacity onPress={onPressDelete}>
          <Icon name="delete" size={mvs(20)} color={colors?.text} />
        </TouchableOpacity>}
        {userIcon && <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ImagePlaceholder isUser uri={SERVICES._returnFile(uri)} />
          <Regular
            label={title}
            style={{ ...styles.TITLE, color: colors?.text, marginLeft: mvs(20) }}
          />
        </TouchableOpacity>}
      </View>
      {post && <Buttons.ButtonPrimary disabled={loading} loading={loading} onClick={onPost} style={{ width: mvs(80), height: mvs(35) }} title='Post' />}
    </View>
  );
};


const styles = StyleSheet.create({
  CONTAINER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mvs(65),
    paddingHorizontal: mvs(18),
    borderBottomLeftRadius: mvs(20),
    borderBottomRightRadius: mvs(20),
    zIndex: 1,
  },
  TITLE: {
    fontSize: mvs(15),
  },
  AVATAR: {
    height: mvs(30),
    width: mvs(30),
    top: mvs(4),
    borderRadius: mvs(5),
    overflow: 'hidden'
  }
});
