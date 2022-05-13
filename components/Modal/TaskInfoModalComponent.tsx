import { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import HeaderComponent from "../HeaderComponent"
import ModalComponent from "../ModalComponent"
import CoinsPointsDisplayContainer from "../Profile/CoinsPointsDisplayContainer"
import UnderlinedOneHeaderComponent from "../UnderlinedOneHeaderComponent"


const TaskInfoModalComponent: FC = () => {


    return (

        <View>
            <ModalComponent>
                <View>
                    <HeaderComponent title={"Organized Bed"} />
                    <CoinsPointsDisplayContainer coins="10 coins" points="10 points" />
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