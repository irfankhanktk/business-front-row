import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CarOwner } from '../../../assets/images';
import SERVICES from '../../../services/common-services';
import fonts from '../../../services/fonts';
import { mvs, width } from '../../../services/metrices';
import Regular from './../../../presentation/typography/regular-text';
import SemiBold from './../../../presentation/typography/semibold-text';
import colors from './../../../services/colors';
import ImagePlaceholder from './../../atoms/Placeholder';
import Row from './../../atoms/row';
import RatingStar from './../rating-star/index';

const ReviewsRaing = ({ ele = {}, style }) => {
  console.log('review=>>>', ele);
  return (
    <View
      style={styles.container}>
      <Row justifyContent="space-between" alignItems="flex-start">
        <Row>
          <ImagePlaceholder
            containerStyle={styles.img}
            uri={
              ele?.customer?.image
                ? { uri: SERVICES._returnFile(ele?.customer?.image) }
                : CarOwner
            }
          />
          <View
            style={{
              marginLeft: mvs(10),
            }}>
            <SemiBold
              size={mvs(12)}
              color={colors.B1B1B1B}
              label={ele?.customer?.name}
            />
            <RatingStar
              ratingSelectedColor={colors.black}
              ratingUnSelectedColor={colors.G9B9B9B}
              size={10}
              fill={colors.B323232}
              rate={ele?.rate}
              width={mvs(70)}
              tintColor={'#ffedce'}
            />
          </View>
        </Row>
        <View style={{ marginRight: mvs(10) }}>
          <Regular
            style={styles.date}
            label={moment(ele?.date).fromNow()}
          />
        </View>
      </Row>
      <Regular
        style={styles.bottomText}
        size={mvs(12)}
        color={colors.filter_divider}
        numberOfLines={5}
        label={ele?.remark}
      />
      {ele?.pics?.length > 0 && (
        <FlatList
          nestedScrollEnabled
          contentContainerStyle={{ paddingTop: mvs(10) }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={ele?.pics}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                height: mvs(52),
                width: mvs(52),
                marginRight: mvs(10),
              }}>
              <ImagePlaceholder
                containerStyle={{
                  height: '100%',
                  width: '100%',
                  borderRadius: mvs(7),
                }}
                uri={{ uri: SERVICES._returnFile(item) }}
              />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};
export default ReviewsRaing;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(16),
    backgroundColor: colors.reviewBg,
    borderRadius: mvs(5),
  },
  bottomText: {
    marginTop: mvs(10),
    fontFamily: fonts.medium,
  },
  date: {
    alignSelf: 'flex-end',
    fontFamily: fonts.medium,
    color: colors.G9B9B9B,
    fontSize: mvs(12),
  },
  img: {
    height: mvs(33),
    width: mvs(33),
    borderRadius: mvs(17),
  }
});