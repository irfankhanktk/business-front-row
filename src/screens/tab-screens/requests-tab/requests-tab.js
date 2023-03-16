import { useTheme, useNavigation, CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import Buttons from '../../../components/atoms/Button';
import ImagePlaceholder from '../../../components/atoms/Placeholder';
import { CustomHeader } from '../../../components/molecules/header/header-1x';
// import HomeCard from './../../../components/molecules/home-card/home-card';
import Regular from '../../../presentation/typography/regular-text';
import { mvs } from '../../../services/metrices';
import DIVIY_API from '../../../store/api-calls';
import { Home_Styles as styles } from './reqests-styles';
import moment from 'moment';
import SERVICES from '../../../services/common-services';

const Requests = props => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [selectedCat, setSelectedCat] = React.useState(1);
  const [flag, setflag] = useState('completed');

  const {
    user_info,
    categories,
    home_categories,
    fetchSubCategories,
    fetchHomeCategories,
  } = props;

  useEffect(() => {
    function handleBackButton() {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Drawer' }],
        }),
      );
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, [navigation]);
  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      await fetchHomeCategories();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchSubCategories(selectedCat);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedCat]);
  const renderRequestCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props?.navigation?.navigate('CategoryDetails', {
            item,
            prev_screen: 'requests',
          })
        }
        style={styles.card}>
        <ImagePlaceholder uri={SERVICES._returnFile(item?.image)} containerStyle={styles.image} />
        <View
          style={{
            borderRadius: mvs(10),
            paddingHorizontal: mvs(10),
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Regular style={{ color: colors.primary }} label={item?.name} />
          <Regular style={{ color: colors.border }} label={moment().fromNow()} />
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Regular
            style={{ color: colors.text }}
            label={flag == 'progress' ? 'In Progress' : 'Completed'}
          />
        </View>
      </TouchableOpacity>
    );
  };
  if (loading) {
    return (
      <View style={{ ...styles.conntainer, backgroundColor: colors.background }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={colors.text} />
        </View>
      </View>
    );
  } else if (home_categories?.data?.length === 0 && !loading) {
    return (
      <View style={{ ...styles.conntainer, backgroundColor: colors.background }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Regular label={'No record found'} />
        </View>
      </View>
    );
  }
  return (
    <View style={{ ...styles.conntainer, backgroundColor: colors.background }}>
      <CustomHeader
        title="Diviy"
        style={{ flexDirection: 'row-reverse' }}
        userIcon
        colors={colors}
      />
      <View style={styles.topTabBarContainer}>
        <TouchableOpacity
          onPress={() => setflag('completed')}
          style={{
            ...styles.tabbarButton,
            backgroundColor: flag == 'completed' ? colors.primary : colors.gray,
          }}>
          <Text
            style={{
              ...styles.buttonText,
              color: flag == 'completed' ? 'white' : colors.primary,
            }}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setflag('progress')}
          style={{
            ...styles.tabbarButton,
            backgroundColor: flag == 'progress' ? colors.primary : colors.gray,
          }}>
          <Text
            style={{
              ...styles.buttonText,
              color: flag == 'progress' ? 'white' : colors.primary,
            }}>
            in Progress
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <FlatList
          data={categories?.data}
          contentContainerStyle={{ paddingHorizontal: mvs(22) }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRequestCard}
        // onEndReachedThreshold={0.5}
        // onEndReached={() => getHomePosts(setPageLoading, 0)}
        />
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  home_categories: store.state.home_categories,
  categories: store.state.categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomeCategories: () => DIVIY_API.fetchHomeCategories(),
  fetchSubCategories: parent_cat_id =>
    DIVIY_API.fetchSubCategories(parent_cat_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Requests);
