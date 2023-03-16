import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { FC, useState } from 'react';
import {
  KeyboardTypeOptions, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PhoneInput from 'react-native-phone-input';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SVGS from '../../assets/common-icons';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import { INPUT_STYLES } from '../../styles/input';
import Bold from './../../presentation/typography/bold-text';
import PickerModal from './../molecules/modals/picker-model';
import ServiceModal from './../molecules/modals/service-modal';
import { OtpInput } from './../molecules/otp-input/otp-input';
import Buttons from './Button';
import Row from './row';
const countries = [
  'Egypt',
  'Canada',
  'Australia',
  'Ireland',
  'Brazil',
  'England',
  'Dubai',
  'France',
  'Germany',
  'Saudi Arabia',
  'Argentina',
  'India',
];
type IProps = {
  label?: string | number;
  value?: string;
  title?: string;
  items?: any[];
  dropdownStyle?: object;
  onChangeText?: (t: string | any) => void;
  placeholder?: string;
  containerStyle?: object;
  labelStyle?: object;
  secureTextEntry?: boolean;
  editable?: boolean;
  maxLength?: number | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  style?: object;
  children?: any;
  isMatch?: boolean;
  leftIcon: string;
  rightIcon: string;
  ref: any,
  setValue?: (arg: any) => void;
};

const InputSecondary: FC<IProps> = ({
  label = '',
  value = '',
  onChangeText,
  placeholder = 'placeholder',
  containerStyle,
  labelStyle,
  secureTextEntry,
  maxLength,
  keyboardType,
  style,
  leftIcon = 'User',
  rightIcon = 'User',
  editable = true,
}) => {
  const [eye, setEye] = React.useState(true);
  const { colors }: any = useTheme();
  const LIcon = SVGS[leftIcon as keyof typeof SVGS];
  const RIcon = SVGS[rightIcon as keyof typeof SVGS];
  return (
    <View style={[{ marginBottom: mvs(18) }, containerStyle]}>
      <SemiBold
        label={label}
        style={{ color: colors.text, marginBottom: mvs(10), ...labelStyle }}
      />
      <View
        style={{
          ...INPUT_STYLES.SECONDARY_INPUT,
          backgroundColor: colors.white,
          ...style,
        }}>
        <LIcon
          name={eye ? 'eye' : 'eye-with-line'}
          color={colors.text}
          size={mvs(20)}
        />
        <TextInput
          editable={editable}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry ? eye : false}
          // value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          onChangeText={onChangeText}
          style={{
            color: colors.black,
            padding: mvs(5),
            ...style,
            flex: 1,
            borderLeftWidth: 2,
            borderLeftColor: colors.gray,
            marginLeft: mvs(10),
            paddingLeft: mvs(10),
          }}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setEye(f => !f)}
            style={{
              right: mvs(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={eye ? 'eye' : 'eye-with-line'}
              color={colors.text}
              size={mvs(20)}
            />
          </TouchableOpacity>
        ) : (
          rightIcon ? <View
            style={{
              right: mvs(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <RIcon
            />
          </View> : null
        )}
      </View>
    </View>
  );
};
const ServiceDropDown: FC<IProps> = ({
  label,
  value = '',
  title = '',
  onChangeText,
  placeholder = 'This month',
  style,
  dropdownStyle,
  items = [],
}) => {

  const [eye, setEye] = React.useState(true);
  const [visible, setVisible] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => setVisible(true)}
      style={{ ...INPUT_STYLES.DROPDOWN_INPUT, ...style }}>
      {label && (
        <Regular label={label} />
      )}
      <Row style={{ paddingHorizontal: mvs(20) }} alignItems='center'>
        <>
          <Regular label={!value ? placeholder : value} style={{ flex: 1, }} />
          <SVGS.Caret style={{ marginLeft: mvs(10), transform: [{ translateY: mvs(1) }] }} />
        </>
      </Row>
      <ServiceModal
        title={title}
        value={value}
        setValue={onChangeText}
        setVisible={() => setVisible(false)}
        items={items}
        visible={visible}
      />

    </TouchableOpacity>

  );
};

const InputDropDown: FC<IProps> = ({
  label,
  value = '',
  title = '',
  onChangeText,
  placeholder = 'This month',
  style,
  dropdownStyle,
  items = [],
}) => {

  const [eye, setEye] = React.useState(true);
  const [visible, setVisible] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => setVisible(true)}
      style={{ ...INPUT_STYLES.DROPDOWN_INPUT, ...style }}>
      {label && (
        <Regular label={label} />
      )}
      <Row style={{ paddingHorizontal: mvs(20) }} alignItems='center'>
        <>
          <Regular label={!value ? placeholder : value} style={{ flex: 1, }} />
          <SVGS.Caret style={{ marginLeft: mvs(10), transform: [{ translateY: mvs(1) }] }} />
        </>
      </Row>
      <PickerModal
        title={title}
        value={value}
        setValue={onChangeText}
        setVisible={() => setVisible(false)}
        items={items}
        visible={visible}
      />

    </TouchableOpacity>

  );
};
const CustomDropDown: FC<IProps> = ({
  label = '',
  value = '',
  title = '',
  onChangeText,
  placeholder = 'This month',
  style,
  dropdownStyle,
  items = [],
}) => {
  const [eye, setEye] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  return (
    <TouchableOpacity
      onPress={() => setVisible(true)}
      style={{ ...INPUT_STYLES.DROPDOWN_INPUT, ...INPUT_STYLES.CUSTOM_DROPDOWN, ...style }}>
      {label && (
        <Regular label={label} style={{}} />
      )}
      <Row style={{ marginTop: mvs(4) }} alignItems='center'>
        <>
          <Bold label={!value ? placeholder : value} style={{ flex: 1 }} />
          <SVGS.Caret style={{ transform: [{ translateY: mvs(1) }] }} />
        </>
      </Row>

      <PickerModal
        title={title}
        value={value}
        setValue={onChangeText}
        setVisible={() => setVisible(false)}
        items={items}
        visible={visible}
      />
    </TouchableOpacity>
  );
};
const InputDropDown2: FC<IProps> = ({
  label = '',
  value = '',
  onChangeText,
  placeholder = 'placeholder',
  style
}) => {
  const [eye, setEye] = React.useState(true);
  const { colors }: any = useTheme();

  return (
    <View
      style={{ ...INPUT_STYLES.DROPDOWN_INPUT, ...style }}>
      <SemiBold
        label={label}
        style={{ color: colors.text, marginBottom: mvs(10), marginLeft: mvs(17) }}
      />
      <SelectDropdown
        data={countries}
        defaultButtonText={placeholder}
        onSelect={(selectedItem, index) => {
          //  console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={INPUT_STYLES.dropdown1BtnStyle}
        buttonTextStyle={INPUT_STYLES.dropdown1BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={10} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={INPUT_STYLES.dropdown1DropdownStyle}
        rowStyle={INPUT_STYLES.dropdown1RowStyle}
        rowTextStyle={INPUT_STYLES.dropdown1RowTxtStyle}

      />

    </View>

  );
};
const InputView: FC<IProps> = ({
  label = '',
  value = '',
  onChangeText,
  placeholder = 'placeholder',
  style
}) => {

  const { colors }: any = useTheme();

  return (
    <View
      style={{ ...INPUT_STYLES.DROPDOWN_INPUT, ...INPUT_STYLES.CUSTOM_DROPDOWN, height: mvs(90), paddingHorizontal: mvs(20), ...style }}>
      <SemiBold
        label={label}
        style={{ color: colors.text, fontSize: 14 }}
      />
      <TextInput style={{ ...INPUT_STYLES.TXTINPUT, marginBottom: mvs(10), paddingLeft: 0 }} placeholder={placeholder} onChangeText={onChangeText} />
    </View>

  );
};
const ReviewInput: FC<IProps> = ({
  label = 'Write a Review',
  value = '',
  placeholder = '',
  style,
  containerStyle,
  children,
}) => {
  const { colors }: any = useTheme();
  return (
    <View style={{ paddingTop: mvs(15), marginVertical: mvs(15) }}>
      <View style={[INPUT_STYLES.REVIEW_CONTAINER, containerStyle]}>
        {children}
      </View>
      <View style={INPUT_STYLES.REVIEW_LABEL_CONTAINER}>
        <Regular
          label={label}
          style={{ fontSize: mvs(14), color: colors.text }}
        />
      </View>
    </View>
  );
};

const CustomOtpInput: FC<IProps> = ({ value, setValue, isMatch = true }) => {
  const { colors }: any = useTheme();
  return (
    <View style={{ height: mvs(85), marginTop: mvs(28), alignItems: 'center' }}>
      <Regular
        label={'Verification Code'}
        style={{ color: colors.primary, marginBottom: mvs(7) }}
      />
      <OtpInput isMatch={isMatch} value={value} setValue={setValue} />
    </View>
  );
};
const PhoneTextInput: FC<IProps> = ({ onChangeText, ref, containerStyle }) => {
  return (
    <View
      style={[
        {
          width: '80%',
          backgroundColor: 'red',
          alignSelf: 'center',
          height: mvs(59),
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: mvs(15),
          borderRadius: mvs(15),
        },
        containerStyle,
      ]}>
      <PhoneInput
        ref={ref}
        initialCountry={'gb'}
        // initialValue={'92xx xxxxxxx'}
        textProps={{
          placeholder: 'xxxx xxxxxxx',
          placeholderTextColor: 'blue',
        }}
        onChangePhoneNumber={onChangeText}
      />
    </View>
  );
};

const DatePicker: FC<IProps> = ({ onChangeText = () => { }, value }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    // console.log('date::', date);

    onChangeText(moment(date).format('lll'));
    hideDatePicker();
  };
  return (
    <View
      style={{
        width: '100%',
      }}>
      <Regular label={'Select time'} style={{ marginBottom: mvs(10) }} />
      <Buttons.ButtonPrimary
        title={value}
        onClick={() => setDatePickerVisibility(true)}
        style={{ height: mvs(38), backgroundColor: colors.secondary }}
        textStyle={{ color: colors.primary }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={'datetime'}
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      // maximumDate={new Date(moment().subtract(18, 'years'))}
      // minimumDate={new Date(moment().subtract(50, 'years'))}
      />
    </View>
  );
};

export const INPUT_FIELD = {
  DatePicker,
  InputSecondary,
  ReviewInput,
  CustomOtpInput,
  PhoneTextInput,
  InputDropDown,
  InputView,
  ServiceDropDown,
  InputDropDown2,
  CustomDropDown
};
