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
    paddingHorizontal:mvs(18)
  },
  card:{
    backgroundColor:colors.white,
    borderRadius:mvs(20),
    marginBottom:mvs(20),
    ...colors.shadow,
  },
  image:{
    height:mvs(200),
    width:'100%',

  }
});
