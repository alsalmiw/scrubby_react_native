// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
//
const AddItemsScreen: FC = ()=> {
  const [seeAll, setSeeAll] = useState(false)
  
  return (
    <View style={styles.container}>
      <View style={styles.headTitle}>
        <Text>MASTER BATHROOM ITEMS</Text> 
      </View>
      <View>
        <Text>Add Items from Categories <Text style={styles.clickText} onPress={()=> {setSeeAll(!seeAll), console.log(seeAll)}}>see all</Text> </Text>
        
      </View>
      <View style={styles.rest}>

          <View style={styles.categories}>
            
            <Text>Bathroom</Text>
          </View>
      </View>
      
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
  headTitle:{
    flex: 0.1,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-end',

  },
  clickText:{
    textDecorationLine:'underline',
    flexDirection:'row',
    justifyContent:'flex-end',
    
  },
  rest:{
    flex:0.8
  },
  categories:{
    borderColor:'black',
    borderWidth:2,
    borderRadius:8,
    height:65

  }

});

export default AddItemsScreen