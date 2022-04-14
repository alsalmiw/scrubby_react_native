import { useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native"
import UserContext from "../../context/UserContext";

const ChildFreeBoolComponent = ()=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const {isChildFree, setIsChildFree} = useContext(UserContext)

    return (
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#767577", true: "#186A02" }}
            // trackColor={{ false: "#767577", true: "#2f90e4" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            {...setIsChildFree(isEnabled)}

          />
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });

export default ChildFreeBoolComponent