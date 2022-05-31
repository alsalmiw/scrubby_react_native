import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../../types/INavigateTasking'
import { FC, useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AvatarComponent from '../../components/AvatarComponent';
import HeaderComponent from '../../components/HeaderComponent';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import { ThemeContext } from '../../context/ThemeContext';
import UserContext from '../../context/UserContext';
import IChild from '../../Interfaces/IChild';
import IInviteUser from '../../Interfaces/IInviteUser';
import { ISpace } from '../../Interfaces/ISpace';
import { GetAcceptedInvitationsbyInviterId, GetCollectionDTOByCollectionID, GetDependantsDTOByUserId, GetSharedSpacesById, GetSpacesByCollectionID } from '../../services/dataService';
import { ISpaceArr } from '../../Interfaces/ISpaceArr';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import SplashComponentFaded from '../../components/SplashComponentFaded';


type Props = NativeStackScreenProps<RootStackParamList, 'TaskFamily'>


const TaskFamilyScreen: FC<Props> = ({ navigation }) => {

  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor, greenColor } = useContext(ThemeContext);
  const { mySpaces, userData, childData, childrenData, acceptedInvitations, taskUser, setTaskUser, mySpace, setMySpace, selectedUser, setSelectedUser, seeAll, isChildFree, setChildrenData, setAcceptedInvitations, sharedSpacesInfo, setSharedSpacesInfo, spacesRooms, setWaiting, waiting } = useContext(UserContext)

  const [isInvited, setIsInvited] = useState(false)
  const [allMembers, setAllMembers] = useState([]) as any
  const [firstTime, setFirstTime] = useState<boolean>(true)


  useEffect(() => {
   
    handleCreateUsersList()
    ShowMembers()

    
    
  }, [childrenData, acceptedInvitations, sharedSpacesInfo, spacesRooms])

  const getUsers =async () => {

    let dependent= await GetDependantsDTOByUserId(userData.Id)
    if(dependent.length!= 0){
      setChildrenData(dependent)
    }
    let invites = await GetAcceptedInvitationsbyInviterId(userData.Id)
    if(invites.length!= 0){
      setAcceptedInvitations(invites)
    }

  }

  const handleCreateUsersList = () => {

    
    let membersArr = [] as any
    let member = {
      id: userData.id,
      fullName: userData.name,
      photo: userData.photo,
      isChild: false,
      isInvited: false
    }
    membersArr.push(member)
    setSelectedUser(member)
    setTaskUser(member)

    !isChildFree ?

      childrenData.length > 0 ?
        childrenData.map((child: any, idx: number) => {

          let kid = {
            id: child.id,
            fullName: child.dependentName,
            photo: child.dependentPhoto,
            isChild: true,
            isInvited: false

          }
          membersArr.push(kid)
        })
        : null
      : null
        //console.log("membersArray",membersArr)
    acceptedInvitations.length > 0 ?
      acceptedInvitations.map((person: any, idx: number) => {
        sharedSpacesInfo.map((space: any, idx: number) => space.sharedWith.map((shared: any) => {
          let invited=[] as any
          if (shared.invitedId == person.invitedId) {
            invited =
            {
              id: person.invitedId,
              fullName: person.invitedFullname,
              photo: person.invitedPhoto,
              isChild: false,
              isInvited: true
            }

             let foundmember = membersArr.some((member:any) => {
              if(member.id==invited.id && member.isChild==false) {
               return true
              }
            })
            if(!foundmember)
            {
              membersArr.push(invited)
            }
          }

         


        }
        ))
      })
      : null

    setAllMembers(membersArr)
    //console.sslog(membersArr)

    //console.log(membersArr)
  }

  let r = Math.floor(Math.random() * 7)

  const handleGoToSpaceRooms = async (space: any) => {
        console.log("collection id is "+space.id)
        setWaiting(true)
    let spaceInfo = await GetCollectionDTOByCollectionID(space.id)
    if(spaceInfo!=null){
        setMySpace(spaceInfo)
       navigation.navigate('TaskMember')
      
    }

  }

  const ShowMembers = (): any => {

    return (


      allMembers.map((member: any, idx: number) => {
        return (
          <Pressable key={idx} onPress={() => { setTaskUser(member), setSelectedUser(member) }}>
            <AvatarComponent onPress={undefined} imageSource={member.photo} />
            <View style={[styles.fadedImage, { backgroundColor: '#FFF', opacity: taskUser.id == member.id && taskUser.isChild == member.isChild ? 0 : 0.5 }]} ></View>
          </Pressable>
        )
      }
      )

    )
  }

  return (
    <SplashComponentFaded>

    <ScrollView style={styles.container}>
      <HeaderComponent title="Task Family" />
      <View style={styles.underlineContainer}>
        {allMembers.length <= 3 ?
          <UnderlinedOneHeaderComponent titleFirst={'Select Member'} />
          :
          <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
        }

      </View>
      <View style={styles.selectMemberCon}>

        {

          seeAll ?

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

              <ShowMembers />
            </ScrollView>

            :
            <View style={styles.selectMemberCon}>
              <ShowMembers />
            </View>

        }

      </View>
      <UnderlinedHeaderComponent titleOne={'My Spaces'} titleTwo={''} titleThree={''} />


      <View>

        {


          !taskUser.isInvited ?

            (spacesRooms.length > 0 ?
              spacesRooms.map((space: any, idx: number) => {
                return (
                  <View  key={idx}>
                  {
                    space.rooms!=null ?
                 
                  <TaskSpaceRowComponent
                    idx={r + idx}
                    key={idx}
                    onPress={() => handleGoToSpaceRooms(space)}
                  >
                    <Text style={styles.spaceFont}>{space.collectionName}</Text>
                  </TaskSpaceRowComponent>
                  :null
                   }
                  </View>
                )
              })
              : <Text style={{padding:10}}>Loading ... or you have no spaces</Text>
            )

            :

            (sharedSpacesInfo.length > 0 ?
              sharedSpacesInfo.map((space: any, idx: number) => space.sharedWith.map((shared: any) => {
                return (
                  shared.invitedId == taskUser.id ?
                  space.rooms!= null?
                    <TaskSpaceRowComponent
                      idx={r + idx}
                      key={idx}
                      onPress={() => handleGoToSpaceRooms(space)}
                    >
                      <Text style={styles.spaceFont}>{space.collectionName}</Text>
                    </TaskSpaceRowComponent>
                    :null
                    : null

                )
              }))
              : <Text style={{padding:10}}>Loading ... or you have no spaces</Text>
            )




        }

      </View>

    </ScrollView>
    </SplashComponentFaded>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 60,
     padding: 10,
  },
  spaceFont: {
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
  selectMemberCon: {
    flexDirection: 'row',
    flexWrap: "wrap",

  },
  fadedImage: {
    borderRadius: 10,
    width: 100,
    height: 100,
    margin: 5,
    position: 'absolute'

  }
});

export default TaskFamilyScreen