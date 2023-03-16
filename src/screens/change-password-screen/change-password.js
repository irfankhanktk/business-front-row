import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';
import {connect} from 'react-redux';
import Buttons from '../../components/atoms/Button';
import {INPUT_FIELD} from '../../components/atoms/Input';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import validation from '../../services/validation';
import DIVIY_API from '../../store/api-calls';
import {STYLES as styles} from './change-password-style';
import ThemeContext from './../../context/theme-context';
const ChangePassword = props => {
  const {user_info, updatePassword} = props;
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [payload, setPayload] = React.useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const {showAlert} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);
  const [theme, setTheme] = React.useState('light');

  //save to update profile
  const onSave = async () => {
    try {
      const res = validation.passwordValidation(payload);
      if (!res.status) {
        showAlert('error', res.message);
        return;
      }
      setLoading(true);
      let obj = {...payload};
      delete obj?.confirm_password;
      // await updatePassword({...payload, user_id: user_info?.id});
      setPayload({old_password: '', new_password: '', confirm_password: ''});
      showAlert('success', 'Successfully Updated');
      props?.navigation?.pop();
    } catch (error) {
      showAlert('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <CustomHeader title="Change Password" allowBackBtn colors={colors} />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <INPUT_FIELD.InputSecondary
            secureTextEntry={true}
            editable={!loading}
            label={'Old Password'}
            placeholder="Old Password"
            value={payload?.old_password}
            onChangeText={t => setPayload({...payload, old_password: t})}
          />
          <INPUT_FIELD.InputSecondary
            secureTextEntry={true}
            editable={!loading}
            label={'New password'}
            placeholder="New password"
            value={payload?.new_password}
            onChangeText={t => setPayload({...payload, new_password: t})}
          />
          <INPUT_FIELD.InputSecondary
            secureTextEntry={true}
            editable={!loading}
            label="Re-Type Password"
            placeholder="Re-Type Password"
            value={payload?.confirm_password}
            onChangeText={t => setPayload({...payload, confirm_password: t})}
          />
        </ScrollView>
        <View
          style={{
            ...styles.btn_container,
            backgroundColor: colors.background,
          }}>
          <Buttons.ButtonPrimary
            onClick={onSave}
            disabled={loading}
            loading={loading}
            title="Save"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchUsers: user_id => DIVIY_API.fetchUsers(user_id),
  updatePassword: payload => DIVIY_API.updatePassword(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
