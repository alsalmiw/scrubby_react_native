import { FC, useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import HeaderComponent from "../HeaderComponent"
import ModalComponent from "../ModalComponent"
import CoinsPointsDisplayContainer from "../Profile/CoinsPointsDisplayContainer"
import UnderlinedOneHeaderComponent from "../UnderlinedOneHeaderComponent"

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from "../../context/ThemeContext"


interface ITaskInfoModal {
    headerTitle: String;
    Space: String;
    Location: String;
    Instruction: String;
    coins: String;
    points: String;

}

const TaskInfoModalComponent: FC<ITaskInfoModal> = ({ headerTitle, Space, Location, Instruction, coins, points }) => {
    const { yellowColor } = useContext(ThemeContext)


    return (

        <View>
            <ModalComponent>
                <View style={styles.modalHead}>
                    <Text style={{ fontSize: 30 }}>{headerTitle}</Text>
                    <View style={styles.coinStart}>
                        <View>
                            <Text> <FontAwesome5 name="coins" color={yellowColor} /> {coins} coins</Text>
                            <Text> <FontAwesome name="star" color={yellowColor} /> {points} points</Text>
                        </View>

                    </View>

                </View>


                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Space'}></UnderlinedOneHeaderComponent>
                    <View style={styles.txtRap}>
                        <Text>{Space}</Text>
                    </View>
                </View>

                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Location'}></UnderlinedOneHeaderComponent>
                    <View style={styles.txtRap}>
                        <Text>{Location}</Text>
                    </View>
                </View>

                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Instructions'}></UnderlinedOneHeaderComponent>
                    <View style={styles.txtRap}>
                        <Text>{Instruction}+ sdaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwww</Text>
                    </View>
                </View>



            </ModalComponent>

        </View>

    )
}

const styles = StyleSheet.create({
    underlinedView: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        marginBottom: '5%',
    },
    modalHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        paddingTop: 0,
        marginBottom: '10%',
        paddingRight: 10,
        paddingLeft: 10
    },
    txtRap: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    coinStart: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});
export default TaskInfoModalComponent