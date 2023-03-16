import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {mvs, width} from '../../../services/metrices';
import Row from './../../atoms/row';
import colors from './../../../services/colors';
import ImagePlaceholder from './../../atoms/Placeholder';
import SemiBold from './../../../presentation/typography/semibold-text';
import RatingStar from './../rating-star/index';
import Regular from './../../../presentation/typography/regular-text';
import {Bg} from '../../../assets/images';

const ReviewsRaing = ({bg = `${colors.primary}70`, style}) => {
  return (
    <View style={{marginTop: mvs(30), ...style}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{paddingHorizontal: mvs(18)}}>
        {[0, 1, 2, 3, 4].map((ele, index) => (
          <View
            key={index}
            style={{
              paddingHorizontal: mvs(12),
              marginRight: mvs(16),
              width: width - mvs(65),
              paddingVertical: mvs(16),
              backgroundColor: bg,
              borderRadius: mvs(5),
            }}>
            <Row justifyContent="flex-start" style={{}}>
              <ImagePlaceholder
                containerStyle={{
                  height: mvs(33),
                  width: mvs(33),
                  borderRadius: mvs(17),
                }}
                uri={Bg}
              />
              <View style={{marginLeft: mvs(10)}}>
                <SemiBold
                  size={mvs(14)}
                  color={colors.B1B1B1B}
                  label={'Garnet Bins '}
                />
                <RatingStar fill={colors.B323232} width={mvs(90)} />
              </View>
              <View style={{flex: 1}}>
                <Regular
                  style={{
                    alignSelf: 'flex-end',
                    color: colors.black,
                    fontSize: mvs(12),
                  }}
                  label={'Yesterday 09:28'}
                />
              </View>
            </Row>
            <Regular
              style={{marginVertical: mvs(15)}}
              size={mvs(12)}
              numberOfLines={2}
              label={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam.'
              }
            />
            <Row justifyContent={'space-between'}>
              {[0, 1, 2, 3, 4].map((ele, index) => (
                <View key={index} style={{height: mvs(52), width: mvs(52)}}>
                  <ImagePlaceholder
                    containerStyle={{
                      height: '100%',
                      width: '100%',
                      borderRadius: mvs(16),
                    }}
                    uri={Bg}
                  />
                </View>
              ))}
            </Row>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ReviewsRaing;
