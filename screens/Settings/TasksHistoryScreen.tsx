import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View} from 'react-native';
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

type Props = NativeStackScreenProps<RootStackParamList, 'TasksHistory'>

const TasksHistoryScreen: FC<Props> = ({navigation})=> {
  const {orangeColor, blueColor, fuchsiaColor, violetColor, greenColor, yellowColor, purpleColor, lilacColor} = useContext(ThemeContext)
  const { mySpaces, userData, childData, childrenData, acceptedInvitations , taskUser, setTaskUser, mySpace, setMySpace, selectedUser, setSelectedUser, seeAll} = useContext(UserContext)
  const [allMembers, setAllMembers] = useState([])
  //const navigation = useNavigation();

 

  useEffect(() => {
   
    handleCreateUsersList()

  }, [childrenData, acceptedInvitations])


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
  setSelectedUser(member)

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
    id: person.invitedId,
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

  const ShowMembers=() : any=> {

    return(

      
        allMembers.map((member:any, idx:number)=> {
          return(
          <Pressable key={idx} onPress={()=> {setSelectedUser(member), console.log(member)}}>
            <AvatarComponent  onPress={undefined} imageSource={member.photo} />
            <View style={[styles.fadedImage, {backgroundColor:lilacColor, opacity: selectedUser.id==member.id && selectedUser.isChild ==member.isChild ? 0:0.5}]} ></View>
            </Pressable>
          )
           }
        )
      
    )
  } 

  return (

        <View style={styles.container}>
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
                
          
     </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
});

export default TasksHistoryScreen