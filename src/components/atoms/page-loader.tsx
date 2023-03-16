import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../../services/colors';
const PageLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size={'small'} />
    </View>
  );
};

export default PageLoader;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
