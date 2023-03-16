import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Row from '../../atoms/row';
const RatingStar = ({
    size=mvs(16),
    fill=colors.primary,
    stroke=colors.border,
    rate=4,
    width='100%'

}) => {
    return (
        <Row style={{width:width}}>
             {
                 [1,2,3,4,5].map((item,index)=>(
                     <AntDesign key={index} name={item>rate?'staro':'star'} size={size} color={item>rate?stroke:fill}/>
                 ))
             }
        </Row>
    );
};
export default RatingStar;