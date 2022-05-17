import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View, Image } from "react-native";
import AvatarComponent from "../../components/AvatarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import ChildLockModalComponent from "../../components/Modal/ChildLockModalComponent";
import CoinsPointsDisplayContainer from "../../components/Profile/CoinsPointsDisplayContainer";
import UnderlinedOneHeaderComponent from "../../components/UnderlinedOneHeaderComponent";
import UserContext from "../../context/UserContext";
import RootStackParamList from "../../types/INavigateProfile";

import { FontAwesome5 } from '@expo/vector-icons';
import UnderlinedHeaderComponent from "../../components/UnderlinedHeaderComponent";
import SquareColoredButton from "../../components/SquareColoredButton";

import iconsMap from '../../types/IconsMap';


type Props = NativeStackScreenProps<RootStackParamList, 'LockedChildTasks'>

const LockChildTasksScreen: FC = () => {

    const { userData, childPage, setModalVisible, childRooms, setChildRooms, rState } = useContext(UserContext);

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
                        <View style={styles.childName}>
                            <Text style={{ fontSize: 20 }}>{childPage.dependentName}</Text>
                        </View>

                        <Text>{childPage.dependentAge} years old</Text>


                        <View style={styles.coinContainer}>
                            <CoinsPointsDisplayContainer coins={childPage.dependentCoins} points={childPage.dependentPoints} ></CoinsPointsDisplayContainer>
                        </View>


                    </View>
                    <View style={styles.lockStyle}>
                        <Pressable onPress={() => { setModalVisible(true) }}>
                            <FontAwesome5 name="lock" size={40} color="grey" />
                        </Pressable>
                        <ChildLockModalComponent />
                    </View>



                </View>

                <View style={styles.underLineStyle}>
                    <UnderlinedOneHeaderComponent titleFirst={"My Rooms"} ></UnderlinedOneHeaderComponent>

                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.myRoomScrollView}>
                    {childRooms != null ?
                        childRooms.map((room: any) => {
                            // missing logic to display task not completed and today and future task.
                            return (

                                room.rooms.filter((roomName: any, x: number) => roomName.tasksAssigned.length != 0
                                ).map((roomWithTask: any, x: number) => {
                                    // fix on press. refer back to child task screen
                                    return (<View style={styles.sqrBtn}>
                                        <SquareColoredButton key={x + 1} idx={x + rState + 1} onPress={() => { console.log(roomWithTask) }}>
                                            <View style={styles.sqrBtn}>
                                                <Image style={styles.buttonSize} source={iconsMap.get(roomWithTask.spaceCategory)} />
                                            </View>
                                            <View style={styles.sqrBtn}>
                                                <Text style={styles.sqrTxt}>{roomWithTask.spaceCategory}</Text>
                                            </View>
                                        </SquareColoredButton>
                                    </View>
                                    )
                                })


                            )
                        })
                        : null
                    }

                </ScrollView>

                <View style={styles.underLineStyle}>
                    <UnderlinedOneHeaderComponent titleFirst={'Remaining Tasks'}></UnderlinedOneHeaderComponent>

                </View>
                <ScrollView>
                    {/* task */}
                </ScrollView>
                <View style={styles.underLineStyle}>
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
    underLineStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    myRoomScrollView: {
        paddingLeft: "2.5%",
        paddingRight: "2.5%",
        marginTop: "2%",
        marginBottom: "2%"
    },
    sqrBtn: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lockStyle: {
        flex: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingRight: 10,
        marginTop: 10,
        height: 100
    },
    sqrTxt: {
        color: 'white',
        flexShrink: 1,
        fontSize: 13
    },
    childName: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});

export default LockChildTasksScreen;