import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import AvatarComponent from "../../components/AvatarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import ChildLockModalComponent from "../../components/Modal/ChildLockModalComponent";
import CoinsPointsDisplayContainer from "../../components/Profile/CoinsPointsDisplayContainer";
import UnderlinedOneHeaderComponent from "../../components/UnderlinedOneHeaderComponent";
import UserContext from "../../context/UserContext";
import RootStackParamList from "../../types/INavigateProfile";

import { FontAwesome5 } from '@expo/vector-icons';
import UnderlinedHeaderComponent from "../../components/UnderlinedHeaderComponent";


type Props = NativeStackScreenProps<RootStackParamList, 'LockedChildTasks'>

const LockChildTasksScreen: FC = () => {

    const { userData, childPage, setModalVisible } = useContext(UserContext);

    useEffect(() => {
        console.log(childPage)
        console.log('yes')
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <HeaderComponent title='My Tasks Locked'></HeaderComponent>
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <View style={styles.firstRow}>
                        <AvatarComponent onPress={() => console.log('hi')} imageSource={userData.photo} />
                    </View>


                    <View style={styles.nameAndCoinContainer}>
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-evenly', }}>
                            <Text style={{ fontSize: 20 }}>{childPage.dependentName}</Text>
                        </View>

                        <Text>{childPage.dependentAge} years old</Text>


                        <View style={styles.coinContainer}>
                            <CoinsPointsDisplayContainer coins={childPage.dependentCoins} points={childPage.dependentPoints} ></CoinsPointsDisplayContainer>
                        </View>


                    </View>
                    <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 10, paddingRight: 10, marginTop: 10, height: 100 }}>
                        <Pressable onPress={() => { setModalVisible(true), console.log('ll') }}>
                            <FontAwesome5 name="lock" size={40} color="black" />
                        </Pressable>
                        <ChildLockModalComponent />
                    </View>



                </View>

                <View style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center' }}>
                    <UnderlinedOneHeaderComponent titleFirst={"My Rooms"} ></UnderlinedOneHeaderComponent>
                   
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {/* <ShowRooms /> */}

                </ScrollView>

                <View style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center' }}>
                    <UnderlinedOneHeaderComponent titleFirst={'Remaining Tasks'}></UnderlinedOneHeaderComponent>

                </View>
                <ScrollView>
                    {/* task */}
                </ScrollView>
                <View style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center' }}>
                    <UnderlinedOneHeaderComponent titleFirst={'Completed Tasks'}></UnderlinedOneHeaderComponent>
                </View>



            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight
    },
    coinContainer: {
        marginTop: '6%',
        alignItems: 'center',
        width: '100%'
    },
    nameAndCoinContainer: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        paddingLeft: 0,
        marginLeft: 0

    },
    firstRow: {
        marginVertical: '0%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSize: {
        width: 50, height: 50
    },
});

export default LockChildTasksScreen;