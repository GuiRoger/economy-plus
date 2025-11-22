import { useState } from "react";
import { View } from "react-native";
import { Button, ButtonProps } from "react-native-paper";


export default function ChoseBetweenTwoComponent() {
    
    let [value, setValue] = useState('Expensive');
    return (
        <View style={{
            justifyContent: 'center',
            backgroundColor: '#29382e',
            padding: 8,
            borderRadius: 8,
            flexDirection: 'row',
            gap: 5
        }}>


            <ButtonOnPress
                onPress={() => setValue('Expensive')}
                pressed={value === 'Expensive'}
                textColor="#ffff"
            >Expensive</ButtonOnPress>

            <ButtonOnPress
                textColor="#ffff"
                onPress={() => setValue('Income')}
                pressed={value === 'Income'}
            >Income</ButtonOnPress>
        </View>


    )
}

function ButtonOnPress({ pressed, ...props }: { pressed?: boolean } & ButtonProps) {
    return (
        <Button style={{
            borderRadius: 8,
            backgroundColor: pressed ? '#111813' : 'transparent',
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
        }} {...props}></Button>
    )
}
