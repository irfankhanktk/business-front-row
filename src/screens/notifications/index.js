// import Header1x2x from 'components/atoms/headers/header-1x-2x';
// import { Loader } from 'components/atoms/';
import PageLoader from "../../components/atoms/page-loader";
// import { EmptyList } from 'components/molecules/empty-list';
// import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
// import {
// onReadNotifications
// } from 'services/api/api-actions';
// import i18n from 'translation';
// import * as IMG from '../../assets/images';
import moment from 'moment';
// import styles from './styles';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Row from '../../components/atoms/row';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import styles from "./style";
import { CustomHeader } from "../../components/molecules/header/header-1x";

let notifications = [
  {
    title: "TITLE 1",
    text: "TEXT 1",
    created_at: "asdasdasda"
  },
  {
    title: "TITLE 1",
    text: "TEXT 1",
    created_at: "asdasdasda"
  },
  {
    title: "TITLE 1",
    text: "TEXT 1",
    created_at: "asdasdasda"
  }
]
const Notifications = props => {
  const [loading, setLoading] = React.useState(false);

  const renderAppointmentItem = ({ item, index }) => (
    <View
      key={index}
      style={[
        styles.rendercontainer,
        // { backgroundColor: item?.is_read ? colors.white : colors?.blueHalf },
      ]}>
      <Row style={{ justifyContent: 'flex-start' }}>
        {/* <Image
          source={IMG.notificationcardicon}
          style={styles.notificationicon}
        /> */}
        <View style={styles.titleandtextview}>
          <Row>
            <Medium label={item.title} />
          </Row>
          <Regular label={item.text} numberOfLines={3} />
        </View>
      </Row>
      <Regular
        // label={moment(item.created_at).format('DD MMM, YYYY  hh:mm a')}
        label={item?.created_at}
        style={{ alignSelf: 'flex-end' }}
        fontSize={mvs(12)}
        color={colors.primary}
      />
    </View>
  );
  const itemSeparatorComponent = () => {
    return <View style={{ paddingVertical: mvs(5) }}></View>;
  };
  return (
    <View style={styles.container}>
      {/* <Header1x2x title={t('notifications')} /> */}
      {loading ? (
        <PageLoader />
      ) : (
        <>
          {/* <Text>Hello world</Text> */}
          <CustomHeader
            colors={colors}
            title="Notifications"
            titleStyle={{ color: colors.black }}
            allowBackBtn
            spacebetween
          />
          <FlatList
            // ListEmptyComponent={<EmptyList label={t('no_notification')} />}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            data={notifications}
            renderItem={renderAppointmentItem}
            ItemSeparatorComponent={itemSeparatorComponent}
            keyExtractor={(_, index) => index?.toString()}
          />
        </>
      )}
    </View>
  );
};
export default Notifications;
