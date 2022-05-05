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


type Props = NativeStackScreenProps <RootStackParamList, 'TaskFamily'>


const TaskFamilyScreen: FC<Props> = ({navigation})=> {

  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor, greenColor } = useContext(ThemeContext);
  const { mySpaces, userData, childData, acceptedInvitations , taskUser, setTaskUser, mySpace, setMySpace} = useContext(UserContext)

  const [isInvited, setIsInvited] = useState(false)

  useEffect(() => {
    //setTaskUser(userData)
  }, [])

  let r = Math.floor(Math.random() * 7)

  const handleGoToSpaceRooms = async(space:any)=> {
    console.log("collection id is "+space.id)
    fetchSpace(space.id)
    navigation.navigate('TaskMember')
    
  }

  const handleGoToTaskMember = (member:any)=> {
    console.log( member)
    setTaskUser(member)
    
  }

  const fetchSpace = async(id: number) =>{
    let space = await GetSpacesByCollectionID(id)
    if(space.length>0){
      setMySpace(space)
    }
  } 
  const fetchSharedSpace = async(id: number) => 
  {
    let space = await GetSharedSpacesById(id)
    if(space.length>0){
      return space;
    }
  }


  const handleGoToTaskInivtedMember = async(member:any)=> {
    console.log( member)
    setTaskUser(member)
   
  }
 
  


  return (
    
    <ScrollView style={styles.container}>
      <HeaderComponent title="Task Family"/>
      <View style={styles.underlineContainer}>
            <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
          </View>
    <View style={styles.selectMemberCon}>
    <AvatarComponent onPress={()=> handleGoToTaskMember(userData)} imageSource={userData.photo} />
    {childData.map((child:any, idx:number)=> {
      return(
        <AvatarComponent key={idx} onPress={()=> handleGoToTaskMember(child)} imageSource={child.DependentPhoto} />
      )
    })}
    {acceptedInvitations.map((person:any, idx:number)=> {
      return(
        
        <AvatarComponent key={idx} onPress={()=> handleGoToTaskInivtedMember(person)} imageSource={person.invitedPhoto} />
        
      )
    })}

    </View>
    <UnderlinedHeaderComponent titleOne={'My Spaces'} titleTwo={''} titleThree={''} />
 

        <View style={styles.spacesContainer}>

        {
        !isInvited?
        mySpaces.map((space:ISpace, idx:number) =>
          <TaskSpaceRowComponent
            idx={r+idx}
            key={idx}
            onPress={()=>handleGoToSpaceRooms(space)}
          >
            <Text style={styles.spaceFont}>{space.collectionName}</Text>
          </TaskSpaceRowComponent>
        )
        :null
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