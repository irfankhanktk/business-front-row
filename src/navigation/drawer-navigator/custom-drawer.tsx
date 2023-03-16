import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
// import {
//   Rank,
//   Setting,
//   Support
// } from '../../../src/assets/common-icons';
// import colors from './../../config/colors';
import Regular from '../../presentation/typography/regular-text';
import SERVICES from '../../services/common-services';
import { mvs } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import ImagePlaceholder from './../../components/atoms/Placeholder';
import { DrawerItem } from './../../components/molecules/drawer-item/drawer-item';


const CustomDrawerContent = (props) => {
  const {colors} = useTheme();
  const {user_info} = props;
  const onNavigate = (screen) => {
      props.navigation.toggleDrawer();
    props.navigation.navigate(screen);
  };
  const onSignOut = async () => {
    await AsyncStorage.clear();
    props?.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'Signin'},
        ],
      }),
    );
  };
 // console.log(SERVICES._returnFile(user_info?.image));

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: mvs(22),
        paddingTop: mvs(20),
        backgroundColor:colors.background,
      }}>
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingBottom: mvs(20),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ImagePlaceholder
            isUser
            uri={SERVICES._returnFile(user_info?.image)}
            containerStyle={{
              borderRadius: mvs(50),
              height: mvs(100),
              width: mvs(100),
            }}
          />
          <Regular
            style={{marginLeft: mvs(10)}}
            label={`${user_info?.first_name} ${user_info?.last_name}`}
          />
        </View>
        <Regular
          style={{marginTop: mvs(10), color: colors.primary}}
          label={`${user_info?.email}`}
        />
      </View>
    
      <DrawerItem
        onPress={() => onNavigate('Home')}
        colors={colors}
        title={'Home'}>
      {/* <Discussion height={mvs(25)} width={mvs(25)} /> */}
      </DrawerItem>
      {/* <DrawerItem
        onPress={() => onNavigate('Profile')}
        colors={colors}
        title={'Profile'}>
      <Discussion height={mvs(25)} width={mvs(25)} />
      </DrawerItem> */}
      <DrawerItem
        onPress={() => onNavigate('Settings')}
        colors={colors}
        title={'Settings'}>
      {/* <Discussion height={mvs(25)} width={mvs(25)} /> */}
      </DrawerItem>
      <DrawerItem
        onPress={() => onNavigate('Requests')}
        colors={colors}
        title={'Requests'}>
        {/* <Setting height={mvs(25)} width={mvs(25)} /> */}
      </DrawerItem>
      <DrawerItem onPress={()=>{}} colors={colors} title={'Support'}>
        {/* <Support height={mvs(25)} width={mvs(25)} /> */}
      </DrawerItem>
      <DrawerItem onPress={onSignOut} colors={colors} title={'Sign Out'}>
      <AntDesign name={'logout'} size={mvs(25)}/>
      </DrawerItem>
    </View>
  );
};
const mapStateToProps = (store) => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  signin: (payload) => DIVIY_API.signin(payload),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContent);

export const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(22),
  },
  optionTitle: {
    fontSize: mvs(15),
    marginLeft: mvs(15),
    marginRight: mvs(15),
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    height: mvs(60),
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
