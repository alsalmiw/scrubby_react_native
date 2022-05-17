import { FC, useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import HeaderComponent from "../HeaderComponent"
import ModalComponent from "../ModalComponent"
import CoinsPointsDisplayContainer from "../Profile/CoinsPointsDisplayContainer"
import UnderlinedOneHeaderComponent from "../UnderlinedOneHeaderComponent"

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from "../../context/ThemeContext"


interface ITaskInfoModal{
    headerTitle: string;
    Space: string;
    Location: string;
    Instruction: string;
    coins:string;
    points:string;

}

const TaskInfoModalComponent: FC<ITaskInfoModal> = ({headerTitle, Space, Location, Instruction, coins, points}) => {
    const { yellowColor } = useContext(ThemeContext)


    return (

        <View>
            <ModalComponent>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, paddingTop: 0 }}>
                    <Text style={{ fontSize: 30 }}>{headerTitle}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  }}>
                        <View>
                            <Text> <FontAwesome5 name="coins" color={yellowColor} /> {coins} coins</Text>
                            <Text> <FontAwesome name="star" color={yellowColor} /> {points} points</Text>
                        </View>

                    </View>

                </View>


                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Space'}></UnderlinedOneHeaderComponent>
                    <Text>{Space}</Text>
                </View>
                
                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Location'}></UnderlinedOneHeaderComponent>
                    <Text>{Location}</Text>
                </View>
                
                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Instructions'}></UnderlinedOneHeaderComponent>
                    <Text>{Instruction}</Text>
                </View>
                


            </ModalComponent>

        </View>

    )
}

const styles = StyleSheet.create({
    underlinedView: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    }
});
export default TaskInfoModalComponent