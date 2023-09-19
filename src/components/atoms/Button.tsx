import React, { FC } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import buttonStyles from '../../services/button';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import SemiBold from './../../presentation/typography/semibold-text';
import * as SVG from '../../assets/common-icons'
import Medium from '../../presentation/typography/medium-text';
type BProps = {
  title?: string;
  onClick?: () => void;
  style?: object;
  containerStyle?: object;
  textStyle?: object;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  subTitle?: string;
  props?: object;
};

const ButtonPrimary: FC<BProps> = ({
  title,
  onClick,
  style,
  textStyle,
  loading,
  icon = "",
  disabled = false,
  ...props
}) => {
  const Icon = SVG[icon];
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      {...props}
      style={{ ...buttonStyles.buttonPrimary, backgroundColor: (disabled || loading) ? `${colors.primary}50` : colors.primary, ...style }}
      onPress={onClick}
      activeOpacity={0.5}>
      {loading ? (
        <ActivityIndicator color={colors.white} size={'small'} />
      ) : (
        <>
          {Icon && (<Icon />)}
          <Medium
            {...props}
            size={mvs(18)}
            label={title}
            style={{ color: colors.white, ...textStyle }}
          />
        </>

      )}
    </TouchableOpacity>
  );
};
const ButtonSecondary: FC<BProps> = ({
  title,
  onClick,
  style,
  textStyle,
  loading,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      {...props}
      style={{ ...buttonStyles.buttonSecondary, ...style }}
      onPress={onClick}
      activeOpacity={0.5}>
      {loading ? (
        <ActivityIndicator color={colors.white} size={'small'} />
      ) : (
        <SemiBold
          {...props}
          size={mvs(18)}
          label={title}
          style={{ color: colors.headerTitle, ...textStyle }}
        />
      )}
    </TouchableOpacity>
  );
};
const ButtonButton: FC<BProps> = ({
  title,
  subTitle,
  onClick,
  style,
  containerStyle,
  textStyle,
  loading,
  disabled = false,
  counter,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      {...props}
      style={{ ...buttonStyles.buttonButton, ...containerStyle }}
      onPress={onClick}
      activeOpacity={0.5}>
      <View style={{ paddingRight: mvs(10), width: '85%', }}>
        <SemiBold
          {...props}
          size={mvs(14)}
          label={title}
          style={{ color: colors.headerTitle, }}
        />
        <Regular size={mvs(12)} color={`${colors.B323232}34`} label={subTitle} />
      </View>
      <TouchableOpacity style={{ height: mvs(40), justifyContent: 'center', alignItems: 'center', backgroundColor: `${colors.primary}10`, borderRadius: mvs(6), width: mvs(46), ...style }}>
        <Bold label={counter || '1'} style={{ ...textStyle }} />
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

const ButtonPlus: FC<BProps> = ({
  title,
  onClick,
  style,
  textStyle,
  loading,
  disabled = false,
  icon = 'plus',
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onClick}
      style={buttonStyles.plus_button}
      {...props}>
      <Icon name={icon} color={colors.white} size={mvs(30)} />
    </TouchableOpacity>
  );
};

const Buttons = {
  ButtonPrimary,
  ButtonSecondary,
  ButtonButton,
  ButtonPlus,
};
export default Buttons;
