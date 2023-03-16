import React from 'react';
import { StyleSheet, View } from 'react-native';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import ActionButton from './action-button';
const SlotItem = ({
  slotText = '12 February 2021 9:30 AM-10:00 AM',
  details = 'The first available slot',
  noMore = false,
  loading = false,
  noSlot = false,
  showAccept = false,
  showRemove = false,
  showFind = false,
  showChange = false,
  onAcceptClick,
  onChangeClick,
  onFindClick,
  onRemoveClick,
  loaders = {
    accept: false,
    change: false,
    find: false,
    remove: false,
  },
}) => {
  return (
    <Row alignItems="center" style={styles.CONTAINER}>
      <View style={{ flex: 1 }}>
        <Row>
          <Medium label={'Date & Time'} style={{ marginBottom: mvs(5) }} size={15} color={colors.black} />
          {showAccept && (
            <ActionButton
              loading={loaders?.accept}
              style={styles.button}
              title="Accept"
              onClick={onAcceptClick}
            />
          )}
          {showFind && (
            <ActionButton
              loading={loaders?.find}
              title="Find"
              onClick={onFindClick}
              style={styles.button}
            />
          )}
        </Row>
        <Regular
          label={slotText}
          color={colors.primary}
          size={13}
        />
        <Row style={{ alignItems: 'center', flex: 1 }}>
          <Regular
            label={details}
            color={!noMore ? colors.lightgrey1 : colors.red}
            size={13}
            style={{ fontStyle: 'italic', flex: 1 }}
          />
          <View>
            {showChange && (
              <ActionButton
                loading={loaders?.change}
                style={styles.button}
                title="Change"
                onClick={onChangeClick}
                bgColor={colors.lightGreen1}
                titleColor={colors.green}
              />
            )}

            {showRemove && (
              <ActionButton
                loading={loaders?.remove}
                style={styles.button}
                title="Remove"
                onClick={onRemoveClick}
                bgColor={colors.lightPink1}
                borderColor={colors.red}
                titleColor={colors.red}
              />
            )}
          </View>
        </Row>
      </View>
      <View></View>
    </Row>
  );
};
export default SlotItem;
const styles = StyleSheet.create({
  CONTAINER: {
    marginVertical: mvs(15),
    // borderBottomWidth: 0.7,
    paddingBottom: mvs(15),
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.2,
  },
  button: {
    width: mvs(80),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
});
