import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { mvs } from '../../../services/metrices';
import Regular from './../../../presentation/typography/regular-text';
type IProps={
    title?:string,
    onPress?:()=>void,
    colors?:any
}
export const DrawerItem:FC<IProps> = ({
    title,
    onPress,
    colors,
    children,
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.option, borderColor: colors.border}}>
         {children}
        <Regular
          label={title}
          style={{...styles.optionTitle, color: colors.text}}
        />
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    option: {
        alignItems: 'center',
        flexDirection: 'row',
        height: mvs(60),
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      optionTitle: {
        fontSize: mvs(15),
        marginLeft: mvs(15),
        marginRight: mvs(15),
      },
});