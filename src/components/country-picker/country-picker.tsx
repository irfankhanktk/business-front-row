import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, PixelRatio, Switch } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import { mvs } from '../../services/metrices'
import { CountryCode, Country } from '../../types/country-picker-types'
import colors from '../../services/colors';
import Regular from './../../presentation/typography/regular-text';

const styles = StyleSheet.create({
  // ...
})
type props = {
  visible: boolean;
  withFilter: boolean;
  label:string;
  textColor:string;
  backgroundColor:string;
  onChangeText:(t:any)=>void;
}
export const PickCountry: FC<props> = ({ visible, withFilter,label='Address',backgroundColor,textColor,onChangeText }) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('PK')
  const [country, setCountry] = useState<Country>(
    { "callingCode": ["92"], "cca2": "PK", "currency": ["PKR"], "flag": "flag-pk", "name": "Pakistan", "region": "Asia", "subregion": "Southern Asia" }
  )
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country);
    onChangeText(country.name);
  }
  return (
    <View style={{marginBottom:mvs(15)}}>
      <Regular label={label} style={{marginBottom:mvs(10)}}/>
      <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:backgroundColor,paddingHorizontal:mvs(7),borderRadius:mvs(10), height: mvs(38), }}>
        <CountryPicker
          {...{
            countryCode,
            withFilter,
            // withFlag,
            // withCountryNameButton,
            // withAlphaFilter,
            // withCallingCode,
            // withEmoji,
            onSelect,
          }}
          visible={visible}
        />
        { }
        {country !== null && (
          // <Text style={{}}>{JSON.stringify(country, null, 2)}</Text>
          <Text style={{color:textColor}}>{country?.name}</Text>
        )}
      </View>
    </View>
  )
}