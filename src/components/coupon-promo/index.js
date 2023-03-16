import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Cross } from '../../assets/common-icons';
import { Bg } from '../../assets/images';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import ImagePlaceholder from '../atoms/Placeholder';
import HeadingTitle from '../molecules/heading-title';
const CouponPromo = () => {
    return (
        <View>
           <HeadingTitle title='Coupons & Promos' />
            <View>
              <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: mvs(18) }}>
                {[0, 1, 2, 3, 4].map((ele, index) => (<View style={{ width: mvs(134), marginRight: mvs(7), borderTopRightRadius: mvs(8), borderRadius: mvs(8), overflow: 'hidden' }}>
                  <ImagePlaceholder containerStyle={{ height: mvs(91), width: '100%', }} uri={Bg} />
                  <View style={{ padding: mvs(5), backgroundColor: colors.white }}>
                    <Regular size={mvs(12)} color={colors.primary} label={'Business Name'} />
                    <SemiBold color={colors.black} numberOfLines={2} label={'50% OFF Car Wash'} />
                    <Regular size={mvs(11)} color={colors.G5E5E5E} label={'Description...'} />
                    <TouchableOpacity style={{ width: mvs(83),backgroundColor:colors.primary, height: mvs(15), borderRadius: mvs(3),flexDirection:'row',alignItems:'center',justifyContent:'center' }}>
                      <Cross/>
                      <Regular label={' Cash Voucher'} style={{ textTransform:'uppercase',fontSize: mvs(8), color: colors.white }} />
                    </TouchableOpacity>
                    <Bold size={mvs(12)} color={colors.black} label={'3.00 AED'}/>
                  </View>
                </View>))}
              </ScrollView>
            </View>
        </View>
    );
};
export default CouponPromo;