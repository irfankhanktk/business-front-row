import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OffCarWash, WhitePercentage } from '../../../assets/common-icons';
import { mvs } from '../../../services/metrices';
import colors from './../../../services/colors';
import Regular from './../../../presentation/typography/regular-text';
import Row from './../../atoms/row';
import SemiBold from './../../../presentation/typography/semibold-text';
import ImagePlaceholder from './../../atoms/Placeholder';
const Coupon = () => {
    return (
        <Row style={{ ...styles.rowView, borderBottomWidth: 0 }}>
            {/* <ImagePlaceholder borderRadius={mvs(8)} uri={Bg} containerStyle={{ width: mvs(69), height: mvs(70) }} /> */}
            <OffCarWash width={mvs(69)} height={mvs(72)}/>
            <View style={{ flex: 0, marginHorizontal: mvs(9),}}>
                <SemiBold label={"50% OFF Car Wash"} size={15} />
                <Regular label={"30.00 AED"} size={13} />
                <Row style={styles.voucherView}>
                    <WhitePercentage />
                    <Regular label={"CASH VOUCHER"} size={14} color={colors.white} />
                </Row>
            </View>
        </Row>
    );
};
export default Coupon;
const styles = StyleSheet.create({
    rowView: {
        justifyContent: 'space-between',
        // paddingLeft: mvs(24),
        // paddingVertical: mvs(17),
        // paddingRight: mvs(27),
        borderBottomColor: colors.lightgrey1,
        borderBottomWidth: 0.3

    },
    voucherView: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        justifyContent: 'space-evenly',
        height: mvs(25),
        width: mvs(156),
        alignItems: 'center',
        padding: mvs(1),
        marginTop: mvs(3),
        // top: mvs(5)
    },
});