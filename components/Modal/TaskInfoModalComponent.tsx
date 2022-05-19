import { FC, useContext, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import HeaderComponent from "../HeaderComponent"
import ModalComponent from "../ModalComponent"
import CoinsPointsDisplayContainer from "../Profile/CoinsPointsDisplayContainer"
import UnderlinedOneHeaderComponent from "../UnderlinedOneHeaderComponent"

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from "../../context/ThemeContext"
import FullButtonComponent from "../FullButtonComponent"
import ButtonModalComponent from "./ButtonModalComponent"
import { UpdateUserTaskToCompleted, SubmitTaskChildApproval, ApproveTaskForCompletionChild, GetUserDefaultSchedule } from "../../services/dataService"
import UserContext from "../../context/UserContext"



interface ITaskInfoModal {
    
    Space: String;
    Location: String;
    task: any;
    isChild: boolean;
    taskedInfo:any;
    isButton: boolean;

}

const TaskInfoModalComponent: FC<ITaskInfoModal> = ({ Space, Location, task, isChild, taskedInfo, isButton }) => {

    const { setModalVisible, setDefaultSpace, defaultSpace, userData, runAgain, setRunAgain } = useContext(UserContext)
    const { yellowColor, secondaryTextColor } = useContext(ThemeContext)


    const SubmitTaskForCompletion =async()=> {
            if(!isChild){
             let result =  await UpdateUserTaskToCompleted(task.id)
             console.log(task.id)
             if(result){
                let defaultCollection = await GetUserDefaultSchedule(userData.username)
                if(defaultCollection!=null){
                    setDefaultSpace(defaultCollection)
                    setModalVisible(false)
                    setRunAgain(true)
                    console.log(defaultCollection);
                }
                
             }
        
               

            }else{  
                    //submit task for approval
              let result= await SubmitTaskChildApproval(task.id)
              
              console.log("submit task for approval child");

                    
            }
    }

    const ApproveSubmittedTask = async()=> {
       let result = await ApproveTaskForCompletionChild(task.id)
        console.log("approve task for child");

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
                {/* <View>
                    <Text>
                    {Status} Hellow
                    </Text>

                </View> */}


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
                    {
                        isButton?
                        !task.isRequestedApproval?
                            <ButtonModalComponent onPress={()=> SubmitTaskForCompletion()}>
                            <Text>Completed</Text>
                            </ButtonModalComponent>
                        :


                        <ButtonModalComponent onPress={()=> ApproveSubmittedTask()}>
                         <Text>Approve</Text>
                        </ButtonModalComponent>
                        : null
                    }
                   

                       


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