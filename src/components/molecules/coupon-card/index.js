import React from 'react';
import { View, Text } from 'react-native';
import { OffCarWash, Percent } from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import Medium from '../../../presentation/typography/medium-text';
import Regular from '../../../presentation/typography/regular-text';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Row from '../../atoms/row';
const CouponCard = () => {
    return (
        <Row>
            <OffCarWash />
            <View style={{ marginLeft: mvs(10), flex: 1 }}>
                <Medium size={mvs(15)} label={'50% OFF Car Wash'} />
                <Regular color={colors.G777373} size={mvs(13)} label={'30.00 AED'} />
                <Row style={{ marginTop: mvs(3) }} justifyContent='flex-start'>
                    <Percent height={mvs(16)} width={mvs(16)} />
                    <Regular style={{ textTransform: 'uppercase' }} size={mvs(12)} color={colors.primary} label={' Cash Voucher'} />
                </Row>
                <Row style={{ marginTop: mvs(3) }}>
                    <Regular color={colors.G777373} size={mvs(13)} label={'Expires on May 09 2021'} />
                    <Bold size={mvs(16)} label={'AED 47.00'} />
                </Row>
            </View>
        </Row>
    );
};
export default CouponCard;