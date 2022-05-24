import { FC, useContext } from "react"

import UserContext from "../context/UserContext"
import { ActivityIndicator, Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"


const SplashComponent: FC<any> = ({ children }) => {
    const {blank, setBlank} = useContext(UserContext)




    return (
        <>

            {blank ?
                <View style={styles.spinBackgroundColor}>
                    <View style={[styles.spinBackgroundColor, { justifyContent: 'center' }]}>

                        <SafeAreaView >
                            <ActivityIndicator color='#FFF' size="large" />
                        </SafeAreaView>

                    </View>
                </View>
                :
                <>
                    {children}
                </>
            }
        </>




    )
}
const styles = StyleSheet.create({
    spinBackgroundColor: {

        backgroundColor: '#1699B1',
        minWidth: "100%",
        minHeight: '100%',
    },
})

export default SplashComponent