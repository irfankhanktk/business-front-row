import { StyleSheet } from 'react-native';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';

export const Home_Styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    marginBottom: mvs(20),
    ...colors.shadow,
  },
  image: {
    height: mvs(200),
    width: '100%',

  },
  body1: {
    flex: 1,
    paddingHorizontal: mvs(16),
    paddingTop: mvs(1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 24,
    marginTop: mvs(0),
    color: colors.black
  },
  welcomeSubText: {
    fontSize: 18,
    textAlign: 'center'
  },
});
