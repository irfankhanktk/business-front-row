import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, View} from 'react-native';
import {connect} from 'react-redux';
import {splash} from '../../assets';
import {mvs} from '../../services/metrices';
import {ACTIONS} from '../../store/actions';
import {Splash_Styles as styles} from './splash-styles';
import Buttons from '../../components/atoms/Button';
import {Logo} from '../../assets/common-icons';
import {getData} from '../../localStorage';
const Splash = props => {
  const {setUserInfo, navigation} = props;
  const {colors} = useTheme();

  React.useEffect(() => {
    (async () => {
      // const token = await AsyncStorage.getItem('@token');
      // const user = await AsyncStorage.getItem('@user');
      const token = await getData('token');
      setTimeout(() => {
        if (token != null) {
          navigation.replace('Main');
        } else {
          // setSocket(ioClient);
          // setUserInfo(JSON.parse(user));
          navigation.replace('Onboarding');
        }
      }, 3000);
    })();
  }, []);

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <Logo />
    </View>
  );
};

const mapStateToProps = store => ({
  home_posts: store.state.home_posts,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  setUserInfo: payload => ACTIONS.setUserInfo(payload),
  setSocket: payload => ACTIONS.setSocket(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
