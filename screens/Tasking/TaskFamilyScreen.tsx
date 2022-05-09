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

  useEffect(() => {
    setTaskUser(userData)
    //setTaskUser(userData)/
  }, [])

  let r = Math.floor(Math.random() * 7)

  const handleGoToSpaceRooms = (space:any)=> {
    console.log("collection id is "+space.id)
    setMySpace(space)
    // fetchSpace(space.id)
    navigation.navigate('TaskMember')
    console.log(selectedUser)
    
  }

  const handleGoToTaskUser = (user:any)=> {
    let member = {
      id: user.id,
      fullName: user.name,
      isChild: false
    }
    setSelectedUser(member)
    console.log( member)
    console.log( mySpaces)
    setTaskUser(user)
    setIsInvited(false)
    
  }

  const handleGoToTaskChild = (child:any)=> {
    let member = {
      id: child.id,
      fullName: child.dependentName,
      isChild: true
    }
    setSelectedUser(member)
    console.log( child)
    console.log( mySpaces)
    setTaskUser(child)
    setIsInvited(false)
    
  }

  const handleGoToTaskInivtedMember = async(user:any)=> {
    let member = {
      id: user.invitedId,
      fullName: user.invitedFullname,
      isChild: false
    }
    setSelectedUser(member)
    console.log( member)
    console.log( user)

    setTaskUser(user)
    setIsInvited(true)
  }

  return (
    
    <ScrollView style={styles.container}>
      <HeaderComponent title="Task Family"/>
      <View style={styles.underlineContainer}>
            <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
          </View>
    <View style={styles.selectMemberCon}>
    <AvatarComponent onPress={()=> handleGoToTaskUser(userData)} imageSource={userData.photo} />

    {childrenData.map((child:any, idx:number)=> {
      return(
        childrenData.length>0?
        <AvatarComponent key={idx} onPress={()=> handleGoToTaskChild(child)} imageSource={child.DependentPhoto} />
        : null
      )
    })}
    {acceptedInvitations.map((person:any, idx:number)=> {
      return(
        acceptedInvitations.length > 0?
        <AvatarComponent key={idx} onPress={()=> handleGoToTaskInivtedMember(person)} imageSource={person.invitedPhoto} />
        : null
      )
    })}

    </View>
    <UnderlinedHeaderComponent titleOne={'My Spaces'} titleTwo={''} titleThree={''} />
 

        <View style={styles.spacesContainer}>

        {
        !isInvited?
       ( mySpaces.length > 0 ?
        mySpaces.map((space:any, idx:number) =>
          <TaskSpaceRowComponent
            idx={r+idx}
            key={idx}
            onPress={()=>handleGoToSpaceRooms(space)}
          >
            <Text style={styles.spaceFont}>{space.collectionName}</Text>
          </TaskSpaceRowComponent>
          
        )
        :null )
        : 
        ( mySpaces.length > 0 ?
        mySpaces.map((space:any, idx:number)=>space.sharedWith.map((shared: any)=>
          shared.invitedId == taskUser.invitedId?     
             <TaskSpaceRowComponent
            idx={r+idx}
            key={idx}
            onPress={()=>handleGoToSpaceRooms(space)}
          >
            <Text style={styles.spaceFont}>{space.collectionName}</Text>
          </TaskSpaceRowComponent>
              
          : null
        
        ))
        :null)
      
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
  spacesContainer:{

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

  }
});

export default TaskFamilyScreen