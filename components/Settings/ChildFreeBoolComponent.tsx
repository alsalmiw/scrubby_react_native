import { useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native"
import { ThemeContext } from "../../context/ThemeContext";
import UserContext from "../../context/UserContext";

const ChildFreeBoolComponent = ()=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const {isChildFree, setIsChildFree} = useContext(UserContext)
    const {violetColor, lilacColor} = useContext(ThemeContext)

    return (
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#767577", true: {lilacColor}}}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor={violetColor}
            onValueChange={toggleSwitch}
            value={isEnabled}
            {...setIsChildFree(isEnabled)}
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