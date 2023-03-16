import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

export const Proposal_Styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingVertical: mvs(20),
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
