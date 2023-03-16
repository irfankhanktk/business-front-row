import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Map, RightArrow, Total } from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import { mvs } from '../../../services/metrices';
import Row from '../../atoms/row';
import colors from '../../../services/colors';
import Regular from '../../../presentation/typography/regular-text';
import RatingStar from '../rating-star';
const TotalRateMap = () => {
    return (
        <Row alignItems='center' style={{ height: mvs(96), paddingHorizontal: mvs(20), borderBottomWidth: 0.5, borderTopWidth: 0.5, marginTop: mvs(17), borderColor: colors.GD8D8D8, }}>
            <Total />
            <View style={{ marginLeft: mvs(15), flex: 1, justifyContent: 'space-between' }}>
                <Bold label={'Total Al Safeer Car Wash'} size={mvs(16)} color={colors.black} />
                <Row justifyContent='flex-start'>
                    <Map />
                    <Regular style={{ transform: [{ translateY: mvs(-3) }] }} color={colors.G9B9B9B} label={'  Sharjah Al nahada road'} />
                </Row>
                <RatingStar width={mvs(84)} rate={5} />
            </View>
            <TouchableOpacity>
                <RightArrow />
            </TouchableOpacity>
        </Row>
    );
};
export default TotalRateMap;