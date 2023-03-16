import {StyleSheet} from 'react-native';
import colors from '../../../services/colors';
import {mvs} from '../../../services/metrices';

export const Home_Styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: mvs(10),
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    marginVertical: mvs(10),
    ...colors.shadow,
  },
  image: {
    height: mvs(50),
    width: mvs(50),
    borderRadius: mvs(25),
  },
  topTabBarContainer: {
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
    marginTop: mvs(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: mvs(30),
  },
  tabbarButton: {
    backgroundColor: colors.gray,
    height: mvs(40),
    width: mvs(150),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 14,
    color: colors.primary,
  },
});
