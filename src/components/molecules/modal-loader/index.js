import React from 'react';
import { View } from 'react-native';
import colors from '../../../services/colors';
import PageLoader from '../../atoms/page-loader';
const ModalLoader = ({
}) => {
    return (
        <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: colors.white,
            opacity: 0.6,
            position: 'absolute',
        }}>
            <PageLoader />
        </View>
    );
};
export default ModalLoader;