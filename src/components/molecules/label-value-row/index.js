import React from 'react';
import SemiBold from '../../../presentation/typography/semibold-text';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Regular from './../../../presentation/typography/regular-text';
import Row from './../../atoms/row';
import { StyleSheet } from 'react-native';
const LabelValue = ({
    label = 'I am Title',
    value='value here',
    subValue='',
    mb=mvs(10),
    vColor=colors.B323232,
    lcolor=colors.B323232,
    subColor=`${colors.B323232}34`,
    bw=StyleSheet.hairlineWidth,

}) => {
    return (
        <Row style={{justifyContent:'space-between',marginHorizontal:mvs(18),paddingVertical: mvs(6),marginBottom:mb,borderBottomWidth: bw,borderColor: colors.GE1E1E1,}}>
             <Regular size={mvs(14)} label={label} color={lcolor}/>
             <SemiBold size={mvs(14)} label={value} color={vColor}>
                 <SemiBold size={mvs(14)} label={subValue} color={subColor}/>
             </SemiBold>
        </Row>
    );
};
export default LabelValue;