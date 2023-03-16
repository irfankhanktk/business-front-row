import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SelectedCard, UnSelectedCard } from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import colors from '../../../services/colors';
import { mvs, width } from '../../../services/metrices';
import Row from '../../atoms/row';
const ServicePickerModal = ({
    onChangeService = (arg) => { },
    visible,
    setVisible = (bool) => { },
    items = [],
}) => {

    return (
        <ReactNativeModal
            propagateSwipe
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onSwipeComplete={() => setVisible(false)}
            swipeDirection='up'
            style={{ margin: 0 }}>
            <View style={styles.container}>
                <>
                    <Bold label={`Select Service`} />
                    {items.map((item, index) => (
                        <TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => {
                            onChangeService(items?.map((x, i) => ({ ...x, selected: i === index })));
                        }}>
                            <Row style={{ ...styles.PAYMENTDROPDOWN, }}>
                                <Bold size={15} style={{ flex: 1, marginHorizontal: mvs(8) }} label={item?.title} />
                                <View>
                                    {item?.selected ? <SelectedCard /> : <UnSelectedCard />}
                                </View>
                            </Row>
                        </TouchableOpacity>
                    ))}
                </>
            </View>
        </ReactNativeModal>
    );
};
export default ServicePickerModal;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: colors.white,
        borderTopLeftRadius: mvs(15),
        borderTopRightRadius: mvs(15),
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    PAYMENTDROPDOWN: {
        justifyContent: 'space-between',
        height: mvs(50),
        alignItems: 'center',
        borderRadius: 10,
        top: mvs(8),
        borderBottomWidth: 0.7,
        borderColor: colors.gray,
        paddingHorizontal: mvs(11)
    }
});