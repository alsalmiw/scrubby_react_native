import { useContext, useState, useEffect } from "react";
import { StyleSheet, Switch, Text, View } from "react-native"
import { ThemeContext } from "../../context/ThemeContext";
import UserContext from "../../context/UserContext";
import { ChildFreeSwitch } from '../../services/dataService'

const ChildFreeBoolComponent = () => {
  useEffect(() => {


  }, [])


  const { isChildFree, setIsChildFree, userData } = useContext(UserContext)
  const { violetColor, lilacColor } = useContext(ThemeContext)

  const toggleSwitch = async () => {
    let switched: any = await ChildFreeSwitch(userData.id)
    if (switched) {
      setIsChildFree(!isChildFree);
    }
  }

  return (
    <View style={styles.container}>
      <Switch
        thumbColor={isChildFree ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor={violetColor}
        onValueChange={toggleSwitch}
        value={isChildFree}
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