import { StatusBar } from 'expo-status-bar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../types/INavigateTasking'
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AvatarComponent from '../../components/AvatarComponent';
import HeaderComponent from '../../components/HeaderComponent';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import { ThemeContext } from '../../context/ThemeContext';
import UserContext from '../../context/UserContext';
import IChild from '../../Interfaces/IChild';
import IInviteUser from '../../Interfaces/IInviteUser';
import { ISpace } from '../../Interfaces/ISpace';
import {GetSharedSpacesById, GetSpacesByCollectionID} from '../../services/dataService';
import { ISpaceArr } from '../../Interfaces/ISpaceArr';


type Props = NativeStackScreenProps <RootStackParamList, 'TaskFamily'>


const TaskFamilyScreen: FC<Props> = ({navigation})=> {

  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor, greenColor } = useContext(ThemeContext);
  const { mySpaces, userData, childData, childrenData, acceptedInvitations , taskUser, setTaskUser, mySpace, setMySpace, selectedUser, setSelectedUser} = useContext(UserContext)

  const [isInvited, setIsInvited] = useState(false)
  const [allMembers, setAllMembers] = useState([])

  useEffect(() => {
    setTaskUser(userData)
    handleCreateUsersList()
    //setTaskUser(userData)/
  }, [])


const handleCreateUsersList = () => {
let membersArr = [] as any
  let member = {
    id: userData.id,
    fullName: userData.name,
    photo:userData.photo,
    isChild: false,
    isInvited:false
  }
  membersArr.push(member)

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

acceptedInvitations.length > 0?
acceptedInvitations.map((person:any, idx:number)=> { mySpaces.map((space:any, idx:number)=> space.sharedWith.map((shared: any)=> 
  {
  if(shared.invitedId == person.invitedId)
    {
  let invited = 
  {
    id: person.id,
    fullName: person.invitedFullname,
    photo:person.invitedPhoto,
    isChild: false,
    isInvited:true

  }
  membersArr.push(invited)
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

  const handleGoToSpaceRooms = (space:any)=> {
    console.log("collection id is "+space.id)
    setMySpace(space)
    // fetchSpace(space.id)
    navigation.navigate('TaskMember')
    console.log(selectedUser)
    
  }

  // const handleGoToTaskUser = (user:any)=> {
  //   let member = {
  //     id: user.id,
  //     fullName: user.name,
  //     Photo:user.photo,
  //     isChild: false
  //   }
  //   setSelectedUser(member)
  //   console.log( member)
  //   //console.log( mySpaces)
  //   setTaskUser(user)
  //   setIsInvited(false)
    
  // }

  // const handleGoToTaskChild = (child:any)=> {
  //   let member = {
  //     id: child.id,
  //     fullName: child.dependentName,
  //     Photo:child.dependentPhoto,
  //     isChild: true
  //   }
  //   setSelectedUser(member)
  //   console.log( member)
  //   //console.log( mySpaces)
  //   setTaskUser(child)
  //   setIsInvited(false)
    
  // }

  // const handleGoToTaskInivtedMember = async(user:any)=> {
  //   let member = {
  //     id: user.invitedId,
  //     fullName: user.invitedFullname,
  //     Photo: user.invitedPhoto,
  //     isChild: false
  //   }
  //   setSelectedUser(member)
  //   console.log( member)
  //   //console.log( user)

  //   setTaskUser(user)
  //   setIsInvited(true)
  // }

  return (
    
    <ScrollView style={styles.container}>
      <HeaderComponent title="Task Family"/>
      <View style={styles.underlineContainer}>
            <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
          </View>
    <View style={styles.selectMemberCon}>
    {/* <AvatarComponent onPress={()=> handleGoToTaskUser(userData)} imageSource={userData.photo} />

    { childrenData.length>0?
    childrenData.map((child:any, idx:number)=> {
      return(
       <View key={idx}>
        <AvatarComponent  onPress={()=> handleGoToTaskChild(child)} imageSource={child.dependentPhoto} />
        <View style={[styles.fadedImage, {backgroundColor:lilacColor, opacity:0.8}]} ></View>
        </View>
      )
    }): null} */}
    {
      allMembers.map((member:any, idx:number)=> {
        return(
        <View key={idx}>
          <AvatarComponent  onPress={()=> {setTaskUser(member), setSelectedUser(member)}} imageSource={member.photo} />
          <View style={[styles.fadedImage, {backgroundColor:lilacColor, opacity: taskUser.id==member.id && taskUser.isChild ==member.isChild ? 0:0.5}]} ></View>
          </View>
        )
         }
      )
    }
    {/* {
    acceptedInvitations.length > 0?
    acceptedInvitations.map((person:any, idx:number)=> { 
     return mySpaces.map((space:any, idx:number)=> space.sharedWith.map((shared: any)=> 
          shared.invitedId == person.invitedId?  
      
          <View key={idx}>
        <AvatarComponent key={idx} onPress={()=> handleGoToTaskInivtedMember(person)} imageSource={person.invitedPhoto} />
        <View style={styles.fadedImage} ></View>
        </View>
      :null
    ))
    })
    : null
    } */}

    </View>
    <UnderlinedHeaderComponent titleOne={'My Spaces'} titleTwo={''} titleThree={''} />
 

        <View>

      {
    
        
      taskUser.isInvited?
          
        ( mySpaces.length > 0 ?
                mySpaces.map((space:any, idx:number) =>{
                  return (
                  <TaskSpaceRowComponent
                    idx={r+idx}
                    key={idx}
                    onPress={()=>handleGoToSpaceRooms(space)}
                  >
                    <Text style={styles.spaceFont}>{space.collectionName}</Text>
                  </TaskSpaceRowComponent>
                  )
                })
                :null 
        )

            : 

        ( mySpaces.length > 0 ?
             mySpaces.map((space:any, idx:number)=>space.sharedWith.map((shared: any)=>{
               return(
          shared.invitedId == taskUser.invitedId? 
        
             <TaskSpaceRowComponent
            idx={r+idx}
            key={idx}
            onPress={()=>handleGoToSpaceRooms(space)}
          >
            <Text style={styles.spaceFont}>{space.collectionName}</Text>
          </TaskSpaceRowComponent>
              
          : null
          
              ) }))
            :null
        )
          
      
        
        
      }

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    padding:10,
  },
  spaceFont:{
    color: '#fff',
    fontWeight: "bold",
    fontSize: 20,
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
  fadedImage: {
    borderRadius:10, 
    width: 100,
    height: 100, 
    margin: 8,
    position: 'absolute'

}
});

export default TaskFamilyScreen