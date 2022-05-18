import { FC, useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import HeaderComponent from "../HeaderComponent"
import ModalComponent from "../ModalComponent"
import CoinsPointsDisplayContainer from "../Profile/CoinsPointsDisplayContainer"
import UnderlinedOneHeaderComponent from "../UnderlinedOneHeaderComponent"

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from "../../context/ThemeContext"
import FullButtonComponent from "../FullButtonComponent"
import ButtonModalComponent from "./ButtonModalComponent"


interface ITaskInfoModal {
    
    Space: String;
    Location: String;
    task: any;
    isChild: boolean;
    taskedInfo:any

}

const TaskInfoModalComponent: FC<ITaskInfoModal> = ({ Space, Location, task, isChild, taskedInfo }) => {
    const { yellowColor, secondaryTextColor } = useContext(ThemeContext)

    const SubmitTaskForCompletion =()=> {

    }


    return (

        <View>
            <ModalComponent>
                <View style={styles.modalContainer}>
                <View>
                <View style={styles.modalHead}>
                    <View style={styles.headerWidth}>
                    <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{task.task.name + " " + task.item.name}</Text>
                    </View>
                    <View style={styles.coinStart}>
                        <View>
                            <Text> <FontAwesome5 name="coins" color={yellowColor} /> {task.task.coins} coins</Text>
                            <Text> <FontAwesome name="star" color={yellowColor} /> {task.task.coins} points</Text>
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
                        <Text>{task.task.description}+ sdadddddddddddddddddddddddddddddddddddddddddddddddddd</Text>
                    </View>
                </View>
                </View>
                <View>
                    <ButtonModalComponent onPress={()=> SubmitTaskForCompletion()}>
                        <Text>Completed</Text>
                        </ButtonModalComponent>
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
    modalContainer:{
        height:"90%",
        justifyContent: 'space-between',
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
    },  mainHeader: {
        fontSize:20,
        fontWeight: "bold", 
        textTransform:"uppercase"
    },
    headerWidth:{
        width: "70%"
    }
});
export default TaskInfoModalComponent