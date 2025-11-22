import ChoseBetweenTwoComponent from "@/components/ToggleButton/ChoseBetweenTwoComponent";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";


export default function AddScreen() {
  return (
    <View style={{flex:1,paddingHorizontal:16, gap:16,justifyContent:'space-between'}}>
      <View style={{gap:16, marginTop:16}}>
        <ChoseBetweenTwoComponent/>
        <TextInput  placeholder="Amount" style={{backgroundColor:'#29382e'}}/>
        <TextInput placeholder="Description" style={{backgroundColor:'#29382e'}}/>
        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Category</Text>

      </View>

      <Button textColor="black" style={{marginBottom:8,backgroundColor:'#19e65d',borderRadius:8}} mode="contained" >Add</Button>
    </View>
  );
}
