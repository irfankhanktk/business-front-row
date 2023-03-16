import React from 'react';
import { Animated, SafeAreaView, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Img1 } from '../../assets/common-icons/onboarding';
import Buttons from '../../components/atoms/Button';
import Bold from '../../presentation/typography/bold-text';
import { mvs, width } from '../../services/metrices';
import { Pagination } from './../../components/atoms/pagination';
import Row from './../../components/atoms/row';
import Regular from './../../presentation/typography/regular-text';
import colors from './../../services/colors';
import { Styles as styles } from './styles';
// const styles={};
const list = [0, 1, 2, 3];
const Onboarding = props => {
  const { route, navigation } = props;
  const { item, prev_screen, user_info } = route?.params || {};
  const [scrollX, setScrollX] = React.useState(
    React.useRef(new Animated.Value(0)).current,
  );
  const onScrollEvent = () => {
    return Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { x: scrollX },
          },
        },
      ],
      {
        useNativeDriver: true,
      },
    );
  };
  const pagination = () => {
    return (
      <Pagination
        list={list}
        scrollX={scrollX}
        style={{ marginTop: mvs(35) }}
        dotStyle={{ backgroundColor: colors.GE0E0E0 }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.conntainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollEvent()}
          style={{}}
          contentContainerStyle={{}}
          pagingEnabled
          horizontal
          data={list}
          renderItem={({ item }) => (
            <View style={{ width: width }}>
              <View style={{ alignItems: 'center' }}>
                <Img1 height={mvs(500)} width={mvs(326)} />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 25,
                  width: mvs(311),
                  alignSelf: 'center',
                }}>
                <Bold
                  style={{ alignSelf: 'center', marginTop: mvs(30) }}
                  color={colors.B1E1F20}
                  size={mvs(24)}
                  label={'Walkthrough Title'}
                />
                <Regular
                  numberOfLines={3}
                  style={{ textAlign: 'center', marginTop: mvs(0) }}
                  color={colors.B1E1F20}
                  size={mvs(18)}
                  label={'Lorem ipsum dolor sit amet'}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index + ''}
        />
        {pagination()}
        <View
          style={{
            justifyContent: 'flex-end',
            paddingHorizontal: mvs(22),
            paddingTop: mvs(20),
            paddingBottom: mvs(20),
          }}>
          <Row>
            <Buttons.ButtonPrimary
              style={{ marginBottom: mvs(40) }}
              onClick={() => props?.navigation?.navigate('Signin')}
              title="Login"
            />
          </Row>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  home_categories: store.state.home_categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomePosts: (user_id, page) => DIVIY_API.fetchHomePosts(user_id, page),
};
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
