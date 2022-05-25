import { FC, useContext, useEffect } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import HeaderComponent from "../HeaderComponent"
import ModalComponent from "../ModalComponent"
import CoinsPointsDisplayContainer from "../Profile/CoinsPointsDisplayContainer"
import UnderlinedOneHeaderComponent from "../UnderlinedOneHeaderComponent"

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from "../../context/ThemeContext"
import FullButtonComponent from "../FullButtonComponent"
import ButtonModalComponent from "./ButtonModalComponent"
import { UpdateUserTaskToCompleted, SubmitTaskChildApproval, ApproveTaskForCompletionChild, GetUserDefaultSchedule, NewCoinAmountDependent } from "../../services/dataService"
import UserContext from "../../context/UserContext"
import IRedeemCoinsChild from "../../Interfaces/IRedeemChildCoins"


//


interface ITaskInfoModal {
    
    Space: String;
    Location: String;
    task: any;
    isChild: boolean;
    taskedInfo:any;
    isButton: boolean;
    // childCoins:any;
    // childPoints:any;
    // userCoins:any;
    // userPoints:any;

}

const TaskInfoModalComponent: FC<ITaskInfoModal> = ({ Space, Location, task, isChild, taskedInfo, isButton }) => {

    const { setModalVisible, setDefaultSpace, defaultSpace, userData, runAgain, setRunAgain, setTaskModal } = useContext(UserContext)
    const { yellowColor, secondaryTextColor } = useContext(ThemeContext)


    const SubmitTaskForCompletion =async()=> {
        //console.log("task Info:",task.id)
            if(!isChild){
             let result:any =  await UpdateUserTaskToCompleted(task.id)
             console.log(task.id)
             if(result){
                let defaultCollection = await GetUserDefaultSchedule(userData.username)
                if(defaultCollection!=null){
                    //Alert.alert("Congratulations", 'Task is now completed', [{ text: "Ok", style: "cancel",  onPress: () =>setTaskModal(false) }])
                    setDefaultSpace(defaultCollection)
                    setModalVisible(false)
                    setRunAgain(true)
                    //console.log(defaultCollection);
                }
                
             }
        
               

            }else{  
                    //submit task for approval
              let result= await SubmitTaskChildApproval(task.id)
              if(result){
                Alert.alert("Congratulations", 'Task has been submited to be completed', [{ text: "Ok", style: "cancel", onPress: () =>setTaskModal(false) }]);
                setRunAgain(true)
              }
              console.log("completed:",result)

                    
            }
    }

    const ApproveSubmittedTask = async()=> {
       let result = await ApproveTaskForCompletionChild(task.id)
       if(result){
        Alert.alert("Congratulations", 'Task is now completed', [{ text: "Ok", style: "cancel",  onPress: () =>setTaskModal(false) }])
        setRunAgain(true)
       } 
       //console.log("approve:", result)
        console.log("approve task for child");

    }

    // const updateCoinsandPoint = async()=>{
    //     let childRedeem: IRedeemCoinsChild = {
    //         Id: aChild.id,
    //         DependentCoins: leftover
    
    //       }
    //     let updateCNP = NewCoinAmountDependent(childRedeem)
    // }
    



    return (
        

        <View>
            {/* {console.log("task123", task)} */}
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
                            <ButtonModalComponent onPress={()=> {SubmitTaskForCompletion()}}>
                            <Text>Completed</Text>
                            </ButtonModalComponent>
                        :


                        <ButtonModalComponent onPress={()=> {ApproveSubmittedTask()}}>
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