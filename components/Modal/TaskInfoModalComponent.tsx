import { FC, useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import HeaderComponent from "../HeaderComponent"
import ModalComponent from "../ModalComponent"
import CoinsPointsDisplayContainer from "../Profile/CoinsPointsDisplayContainer"
import UnderlinedOneHeaderComponent from "../UnderlinedOneHeaderComponent"

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from "../../context/ThemeContext"


const TaskInfoModalComponent: FC = () => {
    const { yellowColor } = useContext(ThemeContext)


    return (

        <View>
            <ModalComponent>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, paddingTop: 0 }}>
                    <Text style={{ fontSize: 30 }}>Organized Bed</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  }}>
                        <View>
                            <Text> <FontAwesome5 name="coins" color={yellowColor} /> 10 coins</Text>
                            <Text> <FontAwesome name="star" color={yellowColor} /> 10 points</Text>
                        </View>

                    </View>

                </View>


                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Space'}></UnderlinedOneHeaderComponent>
                </View>
                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Location'}></UnderlinedOneHeaderComponent>
                </View>
                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Instructions'}></UnderlinedOneHeaderComponent>
                </View>
                <View style={styles.underlinedView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Products'}></UnderlinedOneHeaderComponent>
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