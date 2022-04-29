import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, StatusBar, View } from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import RootStackParamList from "../../types/INavigateSettings";




type Props = NativeStackScreenProps <RootStackParamList, 'AcceptRequest'>

const AcceptRequestScreen:FC<Props> = ({navigation, route})=>{
    return(
        <View>
            <HeaderComponent title={"ADD TO MY SPACE"}></HeaderComponent>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight
    },
  });

export default AcceptRequestScreen