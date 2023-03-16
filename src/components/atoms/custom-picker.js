import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React, {  useState } from 'react';
import { View } from 'react-native';
import myColors from '../../services/colors';
import { mvs } from '../../services/metrices';

const CustomPicker = ({types=[],onChange,value}) => {
    const [open, setOpen] = useState(false);
    const {colors}=useTheme();
    return (
        <View style={{borderRadius:mvs(10),backgroundColor:colors.background,height:mvs(40),justifyContent:'center',}}>
        <Picker
            selectedValue={value}
            onValueChange={(v)=>onChange(v)}>
           {types.map(ele=>( <Picker.Item style={{color:myColors.input_txt_color}} label={ele.label} value={ele.value} />))}
        </Picker>
        </View>
    );
}
export default CustomPicker;