import React from 'react';
import { View } from 'react-native';
import { mvs } from '../../../services/metrices';
import Row from '../../atoms/row';
import Medium from './../../../presentation/typography/medium-text';
import colors from './../../../services/colors';
const HeadingTitle = ({
    title = 'I am Title',
    children
}) => {
    return (
        <Row style={{alignItems:'center',paddingHorizontal:mvs(18),marginVertical:mvs(15),backgroundColor:colors.F3F1F1,paddingVertical:mvs(7)}}>
             <Medium size={mvs(16)} label={title} color={colors.black}/>
             {children}
        </Row>
    );
};
export default HeadingTitle;