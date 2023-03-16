import React from 'react';
import { View } from 'react-native';
import { mvs } from '../../../services/metrices';
import Medium from '../../../presentation/typography/medium-text';
import colors from '../../../services/colors';
import Row from './../../atoms/row';
import * as SVGS from '../../../assets/common-icons';
import Buttons from '../../atoms/Button';
import Bold from './../../../presentation/typography/bold-text';

const ServiceButton = ({
    title = 'I am Title',
    icon = 'Engine'
}) => {
    const Icon = SVGS[icon];
    return (
        <Row alignItems='center' style={{paddingVertical: mvs(15),borderBottomWidth:0.5,borderColor:colors.GE1E1E1}}>
            <Icon />
            <Bold style={{flex:1,marginLeft: mvs(15),}} size={mvs(12)} label={title} color={colors.black} />
            <Buttons.ButtonPrimary textStyle={{fontSize:mvs(12),color:colors.primary}} style={{width:mvs(102),backgroundColor:colors.G878787,borderRadius: mvs(5),height:mvs(26)}} title='AED 45-60'/>
        </Row>
    );
};
export default ServiceButton;