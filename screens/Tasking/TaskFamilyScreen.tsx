import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
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
import {GetSharedSpacesById} from '../../services/dataService';

const TaskFamilyScreen: FC = ()=> {

  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor, greenColor } = useContext(ThemeContext);
  const { mySpaces, userData, childData, invited } = useContext(UserContext)

  const [isInvited, setIsInvited] = useState(false)

  let r = Math.floor(Math.random() * 7)

  const handleGoToSpaceRooms = async(space:any)=> {
    console.log("collection id is "+space.id)
    
  }

  const handleGoToTaskMember = async(member:any)=> {
    console.log( member)
    console.log(invited)
  }

  const handleGoToTaskInivtedMember = async(member:any)=> {
    console.log( member)
  }
 
  


  return (
    
    <ScrollView style={styles.container}>
      <HeaderComponent title="Task Family"/>
      <View style={styles.underlineContainer}>
            <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
          </View>
    <View style={styles.selectMemberCon}>
    <AvatarComponent onPress={()=> handleGoToTaskMember(userData)} imageSource={userData.photo} />
    {childData.map((child:IChild, idx:number)=> {
      return(
        <AvatarComponent key={idx} onPress={()=> handleGoToTaskMember(child)} imageSource={child.DependentPhoto} />
      )
    })}
    {invited.map((person:any, idx:number)=> {
      return(
        invited.isAccepted?
        <AvatarComponent key={idx} onPress={()=> handleGoToTaskInivtedMember(person)} imageSource={person.invitedPhoto} />
        : null
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
    fontWeight: "bold"
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