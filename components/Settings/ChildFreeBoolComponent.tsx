import { useContext, useState, useEffect } from "react";
import { StyleSheet, Switch, Text, View } from "react-native"
import { ThemeContext } from "../../context/ThemeContext";
import UserContext from "../../context/UserContext";
import {ChildFreeSwitch} from  '../../services/dataService'

const ChildFreeBoolComponent = ()=>{
    useEffect(()=>{


    },[])


    const {isChildFree, setIsChildFree,  userData} = useContext(UserContext)
    const {violetColor, lilacColor} = useContext(ThemeContext)

    const toggleSwitch = async() => {
      console.log(userData.id)
      let switched:any = await ChildFreeSwitch(userData.id)
      if(switched)
      {
        console.log("entered true")
        setIsChildFree(!isChildFree);
        console.log(isChildFree)
      }
    }

    return (
        <View style={styles.container}>
          <Switch
            //trackColor={{ false: "#767577", true: {lilacColor}}}
            thumbColor={isChildFree ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor={violetColor}
            onValueChange={toggleSwitch}
            value={isChildFree}
           // {...setIsChildFree(isChildFree)}
            style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}

          />
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-end",
      justifyContent: "center",
    }
  });

export default ChildFreeBoolComponent