import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, Text} from 'react-native';
import SettingsLinkComponent from '../../components/Settings/SettingsLinkComponent';
import { FontAwesome, FontAwesome5  } from '@expo/vector-icons';
import HeaderComponent from "../../components/HeaderComponent"
import RootStackParamList from '../../types/INavigation'
import { ThemeContext } from '../../context/ThemeContext';
import ChildFreeBoolComponent from '../../components/Settings/ChildFreeBoolComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocalStorageInfo} from '../../services/localStorage'
import UserContext from '../../context/UserContext';
import AvatarComponent from '../../components/AvatarComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import TaskRowHistoryComponent from '../../components/TaskRowHistoryComponent';
import { GetAllTasksHistoryForMembers } from '../../services/dataService';


type Props = NativeStackScreenProps<RootStackParamList, 'TasksHistory'>

const TasksHistoryScreen: FC<Props> = ({navigation})=> {
  const {orangeColor, blueColor, fuchsiaColor, violetColor, greenColor, yellowColor, purpleColor, lilacColor} = useContext(ThemeContext)
  const { mySpaces, userData, childData, childrenData, acceptedInvitations , taskUser, setTaskUser, mySpace, setMySpace, selectedUser, setSelectedUser, seeAll, tasksHistory, setTasksHistory, current, setCurrent, isChildFree } = useContext(UserContext)
  const [allMembers, setAllMembers] = useState([])
  //const navigation = useNavigation();

 

  useEffect(() => {
    getArchives()
    handleCreateUsersList()

  }, [childrenData, acceptedInvitations, tasksHistory])

  const getArchives = async ()=>{
    let archives = await GetAllTasksHistoryForMembers (userData.Id)
    if(archives.length!=0){
      setTasksHistory(archives)
    }
  }
 
const handleCreateUsersList =  () => {
let membersArr = [] as any
  let member = {
    id: userData.id,
    fullName: userData.name,
    photo:userData.photo,
    isChild: false,
    isInvited:false
  }
  membersArr.push(member)
 setSelectedUser(member)

 !isChildFree?
 childrenData.length>0?
 childrenData.map((child:any, idx:number)=> {

  let kid = {
    id: child.id,
    fullName: child.dependentName,
    photo:child.dependentPhoto,
    isChild: true,
    isInvited:false

  }
  membersArr.push(kid)
 })
: null
:null
acceptedInvitations.length > 0?
acceptedInvitations.map((person:any, idx:number)=> { mySpaces.map((space:any, idx:number)=> space.sharedWith.map((shared: any)=> 
  {
  if(shared.invitedId == person.invitedId)
    {
  let invited = 
  {
    id: person.invitedId,
    fullName: person.invitedFullname,
    photo:person.invitedPhoto,
    isChild: false,
    isInvited:true

  }
  if(!membersArr.includes(invited))
  {
     membersArr.push(invited)
  }
 
  }

  }
  ))
})
:null

setAllMembers(membersArr)
console.log(membersArr)

console.log(membersArr)
}




let r = Math.floor(Math.random() * 7)
  const ShowMembers=() : any=> {

    return(

      
        allMembers.map((member:any, idx:number)=> {
          return(
          <Pressable key={idx} onPress={()=> {setSelectedUser(member), console.log(member)}}>
            <AvatarComponent  onPress={undefined} imageSource={member.photo} />
            <View style={[styles.fadedImage, {backgroundColor:"#FFF", opacity: selectedUser.id==member.id && selectedUser.isChild ==member.isChild ? 0:0.5}]} ></View>
            </Pressable>
          )
           }
        )
      
    )
  } 

  return (

        <ScrollView style={styles.container}>
          <HeaderComponent title="Tasks History"/>

          <View style={styles.underlineContainer}>
        {allMembers.length <=3?
         <UnderlinedOneHeaderComponent titleFirst={'Select Member'}  />
        : 
        <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
        }
           
          </View>
    <View style={styles.selectMemberCon}>
  
     {

            seeAll?

                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                      <ShowMembers />
                  </ScrollView>

                  : 
                  <View style={styles.selectMemberCon}>
                  <ShowMembers />
                  </View>

     }
              
    </View>
 
    <UnderlinedOneHeaderComponent titleFirst={'Last 50 days'}  />
   
    
    <View style = {styles.flexrow}>
       
       
      
</View>

     {
         selectedUser!=null?
         tasksHistory!=null?

         tasksHistory.map((task:any, idx: number) =>{ 
             return( 
            task.memberId==selectedUser.id && task.isChild == selectedUser.isChild?
            <View key={idx}>
            <TaskRowHistoryComponent r={r} key={idx} idx={idx} task={task} />
            <View style={[ {display:current===idx?"flex": "none", padding: 10}]}>
            <Text style={[styles.taskInfo ]}>Location: {task.taskSpace} </Text>
             <Text style={[styles.taskInfo ]}>Room: {task.taskRoom} </Text>
            <Text style={[styles.taskInfo ]}>Date Scheduled: {task.dateScheduled.slice(0,10)}</Text>
             <Text style={[styles.taskInfo ]}>Date Completed: {task.isCompleted?task.dateCompleted.slice(0,10):"not completed"}</Text>
            
             </View>
  
            </View>
  
                 : null
             )
         })
         
         : <Text>You have no Task History</Text>
         :null
     }

    </ScrollView>
         



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    // justifyContent: 'center',
  },
  fadedImage: {
    borderRadius:10, 
    width: 100,
    height: 100, 
    margin: 5,
    position: 'absolute'

},
underlineContainer: {

    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },
  selectMemberCon:{
    flexDirection: 'row',
    flexWrap: "wrap",

  },
  flexrow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  taskInfo: {
    fontSize: 20,
}
});

export default TasksHistoryScreen