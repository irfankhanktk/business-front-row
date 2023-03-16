import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SelectedCard, UnSelectedCard } from '../../../assets/common-icons';
import { Bg } from '../../../assets/images';
import Bold from '../../../presentation/typography/bold-text';
import colors from '../../../services/colors';
import { mvs, width } from '../../../services/metrices';
import ImagePlaceholder from '../../atoms/Placeholder';
import Row from '../../atoms/row';
import Coupon from '../coupon';
import Buttons from './../../atoms/Button';
import Medium from './../../../presentation/typography/medium-text';
const AssignModal = ({
    title,
    value=1,
    setValue=(arg)=>{},
    visible,
    setVisible =(bool)=>{},
    items = [1,2,3],
}) => {
    const bool= items?.filter(x=>x===value);
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
                <Bold label={`${title}`} style={{marginVertical: mvs(10),fontSize:mvs(18)}}/>
                    {items.map((item, index) => (
                        <TouchableOpacity key={index} style={{ width: '100%',}} onPress={() => {
                            setValue(item);
                        }}>
                            <Row style={{borderBottomWidth:0.9,borderColor:colors.GE0E0E0,paddingVertical:mvs(10),alignItems:'center',paddingHorizontal:mvs(10)}}>
                                <Row alignItems='center'>
                                <ImagePlaceholder uri={Bg} containerStyle={{height:mvs(40),width:mvs(40),borderRadius:mvs(40/2)}}/>
                                <Medium style={{marginLeft:mvs(14)}} label={'Jacob Reyes'}/>
                                </Row>
                                <View style={{justifyContent:'center'}}>
                                    {item === value ?<SelectedCard />:<UnSelectedCard/>}
                                </View>
                            </Row>
                        </TouchableOpacity>
                    ))}
                </>
                <Buttons.ButtonPrimary onClick={()=>setVisible(false)} style={{marginTop: mvs(25),backgroundColor:bool?.length!==0?colors.primary:colors.GE1E1E1}} title={'Assign'}/>
            </View>
        </ReactNativeModal>
    );
};
export default AssignModal;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: colors.white,
        borderTopLeftRadius: mvs(15),
        borderTopRightRadius: mvs(15),
        paddingHorizontal: 15,
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