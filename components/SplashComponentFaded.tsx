import { FC, useContext } from "react"

import UserContext from "../context/UserContext"
import { ActivityIndicator, Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { ThemeContext } from "../context/ThemeContext"


const SplashComponentFaded: FC<any> = ({ children }) => {
    const {waiting, setWaiting} = useContext(UserContext)
    const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor, greenColor } = useContext(ThemeContext);




    return (
        <>

            {waiting ?
                <View style={styles.spinBackgroundColor}>
                    <View style={[styles.spinBackgroundColor, { justifyContent: 'center' }]}>

                        <SafeAreaView >
                            <ActivityIndicator color={blueColor} size="large" />
                            <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <Text style={{color:blueColor}}>Loading, please wait...</Text>
                            </View>
                              
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

        //backgroundColor: 'white',
        minWidth: "100%",
        minHeight: '100%',
   
    },
})

export default SplashComponentFaded