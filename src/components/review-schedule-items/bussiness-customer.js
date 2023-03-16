import React from 'react';
import { StyleSheet, View } from 'react-native';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import { Gulf, Service } from '../../assets/images';
import Medium from '../../presentation/typography/medium-text';
import SERVICES from '../../services/common-services';
import ImagePlaceholder from '../atoms/Placeholder';
const loading = true;
const BussinessCustomer = ({
  item,
  loading = false,
  image = require('../../assets/images/car-owner.png'),
}) => {
  return (
    <View style={styles.CONTAINER}>
      <View style={{ borderBottomColor: colors.gray, borderBottomWidth: 0.2 }}>
        <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>

          <ImagePlaceholder
            containerStyle={styles.SERVICE_IMAGE}
            uri={item?.offering?.cover ? { uri: SERVICES._returnFile(item?.offering?.cover) } : Service}
          />
          <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
            <Medium label={item?.offering?.title} size={15} />
            <Regular numberOfLines={2} label={item?.offering?.subTitle} size={13} />
          </View>
          {/* <Image style={styles.WATER_IMAGE} source={WaterIcon} /> */}
        </Row>
        <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
          <ImagePlaceholder containerStyle={styles.IMAGE}
            uri={item?.business?.logo ? { uri: SERVICES._returnFile(item?.business?.logo) } : Gulf}
          />
          <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
            <Medium label={item?.business?.title} size={15} />
            <Regular
              label={item?.business?.view?.address}
              size={13}
              numberOfLines={2}
            />
          </View>
        </Row>
        <Row
          style={{
            ...styles.UPPERROW,
            paddingTop: mvs(13),
            paddingBottom: mvs(19),
          }}>
          <Row style={{ width: '50%' }} alignItems="center">
            <ImagePlaceholder
              containerStyle={styles.IMAGE}
              uri={!item?.customer?.image ? image : { uri: SERVICES._returnFile(item?.customer?.image) }}
              borderRadius={10}
            />
            <View style={{ ...styles.bussinessView, borderRightWidth: item?.vehicleId ? 0.2 : 0 }}>
              <Medium label={item?.customer?.name} size={15} />
              <Regular
                label={item?.customer?.mobile}
                size={11}
                style={{ width: mvs(103) }}
              />
            </View>
          </Row>
          <Row
            style={{ paddingLeft: mvs(15), width: '50%', alignItems: 'center' }}>
            {item?.vehicleId && <>
              {/* <SVG.VehicleTwo /> */}
              <View style={{ marginHorizontal: mvs(5), flex: 1 }}>
                <Medium
                  label={item?.vehicle?.make + ' ' + item?.vehicle?.model}
                  size={14}
                  color={colors.black}
                />
                <Regular
                  label={item?.vehicle?.registration}
                  size={12}
                  numberOfLines={1}
                />
              </View>
            </>}
          </Row>
        </Row>
      </View>
    </View>
  );
};
export default BussinessCustomer;
const styles = StyleSheet.create({
  CONTAINER: {
    marginTop: mvs(12.5),
  },
  IMAGE: {
    height: mvs(45),
    width: mvs(45),
    borderRadius: mvs(45 / 2),
  },
  BOTTOMIMG: {
    height: mvs(49),
    width: mvs(52),
    borderRadius: mvs(10),
  },
  UPPERROW: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  SERVICE_IMAGE: {
    height: mvs(45),
    width: mvs(45),
    borderRadius: 8,
  },
  BUTTON: {
    backgroundColor: colors.lightBlue,
    marginVertical: mvs(12.5),
    width: '93%',
    alignSelf: 'center',
  },
  WATER_IMAGE: {
    height: mvs(28),
    width: mvs(28),
    borderRadius: 1000,
    alignSelf: 'flex-start',
  },
  BUTTONTEXT: {
    color: colors.blue,
  },
  TIMETOPVIEW: {
    paddingVertical: mvs(14.5),
    paddingHorizontal: mvs(3),
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.2,
  },
  bussinessView: {
    marginHorizontal: mvs(10),
    borderRightColor: colors.gray,
    borderRightWidth: 0.2,
    flex: 1,
  },
});
