import React from 'react';
import {ScrollView, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Bell, HomeActive, TotalHeader} from '../../assets/common-icons';
import {BlackBack} from '../../assets/headers-icons';
import {INPUT_FIELD} from '../../components/atoms';
import Row from '../../components/atoms/row';
import HeadingTitle from '../../components/molecules/heading-title/index';
import LabelValue from '../../components/molecules/label-value-row';
import ThemeContext from '../../context/theme-context';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import RNChart from './../../components/molecules/rn-chart/index';
import {STYLES as styles} from './style';

const MoreDetails = props => {
  const {user_info} = props;
  const [payload, setPayload] = React.useState({
    image: '',
    last_name: '',
    first_name: '',
  });
  const {showAlert} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);
  const [value, setVlue] = React.useState('This month');
  const [earnings, setEarnings] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Row alignItems='center' style={styles.header}>
        <BlackBack />
        <Regular label={'More Details'} color={colors.B323232} size={mvs(18)} />
        <Regular label={'Withdraw'} color={colors.primary} size={mvs(18)} />
      </Row> */}
      <Row
        style={{
          marginHorizontal: mvs(20),
          paddingVertical: mvs(15),
          borderBottomWidth: 0.5,
          borderColor: colors.GD8D8D8,
        }}>
        <Row>
          <HomeActive />
          <SemiBold size={mvs(16)} label={'  Home'} color={colors.B444251} />
        </Row>
        <Row style={{width: mvs(65), alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: mvs(30),
              height: mvs(30),
              backgroundColor: colors.FBF8F8,
              borderRadius: mvs(15),
            }}>
            <View
              style={{
                backgroundColor: colors.FF0000,
                width: mvs(8),
                height: mvs(8),
                borderRadius: mvs(4),
                alignSelf: 'flex-end',
                position: 'absolute',
              }}
            />
            <View
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Bell />
            </View>
          </TouchableOpacity>
          <TotalHeader />
        </Row>
      </Row>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={{alignSelf: 'center'}}>
            <Bold size={mvs(24)} color={colors.primary} label={'AED 400'} />
            <Regular
              label={'Personal balance'}
              size={mvs(14)}
              color={`${colors.B323232}34`}
            />
          </View>
          <HeadingTitle title={'Overview'}>
            <INPUT_FIELD.InputDropDown
              value={value}
              onChangeText={setVlue}
              items={['This month', 'This week']}
              style={{
                width: mvs(150),
                height: mvs(35),
                paddingHorizontal: mvs(1),
              }}
            />
          </HeadingTitle>
          <Row>
            <TouchableOpacity
              onPress={() => setEarnings(true)}
              style={{
                borderColor: earnings ? colors.primary : colors.DDDDDD,
                ...styles.graph_buttons,
              }}>
              <SemiBold
                color={earnings ? colors.B323232 : colors.G6A728A}
                label={'Earnings'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEarnings(false)}
              style={{
                borderColor: !earnings ? colors.primary : colors.DDDDDD,
                ...styles.graph_buttons,
              }}>
              <SemiBold
                color={!earnings ? colors.B323232 : colors.G6A728A}
                label={'Bookings'}
              />
            </TouchableOpacity>
          </Row>
          <View style={{height: mvs(240)}}>
            <RNChart />
          </View>
          <HeadingTitle title={'Analytics'} />
          <LabelValue label="Earned In January " value={'5K'} />
          <LabelValue
            label="Active Bookings "
            value={'16'}
            subValue={' (AED 1,039)'}
          />
          <LabelValue
            label="New Bookings "
            value={'2'}
            subValue={' (AED 100)'}
          />
          <LabelValue label="Available For Withdrawal " value={'AED 400'} />
          <LabelValue
            label="Completed Bookings "
            value="100"
            subValue={' (AED 10,039)'}
          />
          <HeadingTitle title="Revenues" />
          <LabelValue
            label="Cancelled Bookings "
            value="1"
            subColor={colors.FE0922}
            subValue={' (AED 50)'}
          />
          <LabelValue label="Pending Clearance " value="AED 1,039" />
          <LabelValue label="Withdraw " value="AED 100" />
          <LabelValue label="Cleared  " value="AED 400" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchUsers: user_id => DIVIY_API.fetchUsers(user_id),
  updatePersonalInfo: (payload, user_id) =>
    DIVIY_API.updatePersonalInfo(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(MoreDetails);
