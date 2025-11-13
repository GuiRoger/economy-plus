import { DimensionValue } from "react-native";
import { Card, Text } from "react-native-paper";

export type CardEconProps = {
    value: number;
    title:string;
    percentWidth?:DimensionValue;
}
export default function CardEcon(props: CardEconProps) {
    return (
        <Card style={{  display: 'flex', width: props.percentWidth, alignItems: 'flex-start', justifyContent: 'center' }} mode="outlined">
            {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
            <Card.Content style={{paddingHorizontal:20}}>
              <Text variant="bodyLarge">{props.title}</Text>
              <Text variant="titleLarge">R$ {props.value}</Text>
            </Card.Content>
          </Card>
    )
}