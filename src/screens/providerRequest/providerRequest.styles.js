import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

export const Home_Styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    marginTop: mvs(20),
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
  button: {
    width: mvs(60),
    height: mvs(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: mvs(20),
    marginRight: mvs(5),
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
});
