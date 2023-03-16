import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BlackBack } from '../../../assets/headers-icons';
import { mvs } from '../../../services/metrices';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../services/colors';
import Medium from '../../../presentation/typography/medium-text';
import Row from '../../atoms/row';
export const CustomAppHeader = ({
  title = 'Home',
  color = colors?.primary,
  size = 18,
  onBackClick
}) => {
  const navigation = useNavigation();
  return (
    <Row alignItems='center' style={styles.CONTAINER}>
      {onBackClick ?
        <TouchableOpacity onPress={onBackClick}>
          <BlackBack />
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BlackBack />
        </TouchableOpacity>
      }

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Medium
          label={title}
          size={size}
        />
      </View>
    </Row>
  );
};


const styles = StyleSheet.create({
  CONTAINER: {
    paddingHorizontal: mvs(10)
  }
});
