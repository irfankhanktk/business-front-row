import React, { FC } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Search } from '../../../../src/assets/common-icons';
import { styles } from './Search-bar-styles';
type IProps={
    value?:string,
    onChangeText?:(t:string)=>void,
    style?:object;
    textStyle?:object;
    placeholderColor?:string;
}
export const SearchBar:FC<IProps> = ({
    value,
    onChangeText,
    style,
    textStyle,
    placeholderColor,
}) => {
    return (
        <View style={[styles.container,style]}>
            <Search/>
           <TextInput placeholderTextColor={placeholderColor} value={value} onChangeText={onChangeText} style={[styles.input,textStyle]} placeholder='Search here'/>
        </View>
    );
};