// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer'
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import AddPhotoComponent from '../../components/AddPhotoComponent';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import TaskSpaceRowIconComponent from '../../components/TaskSpaceRowIconComponent';
import TaskSpaceRowTrash from '../../components/TaskSpaceRowTrash';
import RootStackParamList from '../../types/INavigateProfile'
import UseTheme from '../../hooks/use-theme';


//This is just testing
import { Dimensions } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TaskSpaceRowCheck from '../../components/TaskSpaceRowCheck';

const windowWidth = Dimensions.get('window').width * 0.33;

type Props = NativeStackScreenProps <RootStackParamList, 'MyProfile'>

const MyProfileScreen: FC<Props> = ({navigation}) => {

  const {bgColor, lilacColor} = useContext(ThemeContext)

  let r = Math.floor(Math.random() * 7)

  let testDummyArr = [
    { name: 'plus', id: '0' },
    { name: 'pic', id: '1' },
    { name: 'pic', id: '2' },
    { name: 'pic', id: '3' },
    { name: 'pic', id: '4' },
    { name: 'pic', id: '5' },
  ]

  const displayAddIcon = () => {
    console.log('Plus Icon Works');
    navigation.navigate('AddNewSpace')
  }

  const displayProfileStuff = () => {
    console.log('Profile Image Stuff');
  }

  const handleAddNewRoomNavigation = () => {
    navigation.navigate('AddNewRoom');
  }

  return (

    <View style={styles.container}>

      {/* <CoinsPointsDisplayContainer coins="200" points="10,000" />
        {arr.map((title, idx) => {
          return (
           <TaskSpaceRowComponent key={idx} idx={idx+r}>
          <Text>{title}</Text>
          <Text>Icon</Text>
          <Text>{idx+2}</Text>
        </TaskSpaceRowComponent>
          )
        })}
        */}

    {/* <Text>MyProfile</Text>
        
    </View> */}

      <HeaderComponent title="MY PROFILE"></HeaderComponent>
      <View style={styles.firstRow}>
        <AddPhotoComponent />
        <View style={styles.nameAndCoinContainer}>

          <UserNameComponent name="Daniel"></UserNameComponent>
          <View style={styles.coinContainer}>
            <CoinsPointsDisplayContainer coins="20" points="39"></CoinsPointsDisplayContainer>
          </View>
        </View>
      </View>


      <UnderlinedHeaderComponent titleOne="My Spaces" titleTwo=""></UnderlinedHeaderComponent>
      <View style={styles.secondRow}>
        <AddItemButtonComponent onPress={displayAddIcon}>
          <Entypo name="squared-plus" size={50} color={lilacColor} />
        </AddItemButtonComponent>
        <View style={styles.userNameContainer}>
          <UserNameComponent name="Create a New Space"></UserNameComponent>
        </View>
      </View>
      <View style={styles.newSpaceContainer}>
        {/* Make this a component for check marks */}
        <TaskSpaceRowTrash idx={r} onPress={handleAddNewRoomNavigation} />
        <TaskSpaceRowTrash idx={r} onPress={handleAddNewRoomNavigation} />
        <TaskSpaceRowTrash idx={r} onPress={handleAddNewRoomNavigation} />


        {/* Make this a component for the trash  */}
        {/* <TaskSpaceRowComponent idx={r} onPress={handleAddNewRoomNavigation}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textStyle}>Hello World</Text>
            <TaskSpaceRowIconComponent>
              <Feather name="trash-2" size={24} color={bgColor} />
              
            </TaskSpaceRowIconComponent>
          </View>
        </TaskSpaceRowComponent> */}

        <TaskSpaceRowTrash idx={r} onPress={handleAddNewRoomNavigation} />
        

      </View>



      <UnderlinedHeaderComponent titleOne="Kids" titleTwo=""></UnderlinedHeaderComponent>

      <View style={styles.thirdRow}>
        <FlatList data={testDummyArr}
          renderItem={({ item, index }) => {
            return (
              <View>
                {index === 0 ? <AddItemButtonComponent onPress={displayAddIcon}>
                  <Entypo name="squared-plus" size={windowWidth} color={lilacColor}  />
                </AddItemButtonComponent> : <AddItemButtonComponent onPress={displayProfileStuff}>
                  <Entypo name="squared-cross" size={windowWidth} color={lilacColor}  />
                </AddItemButtonComponent>}
              </View>

            )
          }}

          numColumns={3}
          keyExtractor={item => item.id}
          alwaysBounceVertical={false}
        />
      </View>

    </View>





  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },

  firstRow: {
    marginVertical: '4%',
    flexDirection: 'row',
    justifyContent: 'center',

    alignItems: 'center',
    paddingTop: StatusBar.currentHeight
  },

  nameAndCoinContainer: {
    flex: 1,
    alignItems: 'center',
  },

  coinContainer: {
    marginTop: '6%',
    alignItems: 'center',
    width: '100%'
  },

  secondRow: {
    marginTop: '4%',
    marginLeft: '4%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  newSpaceContainer: {
    alignItems: 'center',
  },

  userNameContainer: {
    marginLeft: '4%'
  },

  thirdRow: {
    flex: 1
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  }

});

export default MyProfileScreen