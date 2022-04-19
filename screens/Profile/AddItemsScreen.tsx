// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Pressable, Image, Button } from 'react-native';
////

import icons from '../../types/Icons';
import { Dimensions } from 'react-native';
import Line from '../../components/AddEdit/LineComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UserContext from '../../context/UserContext';


const AddItemsScreen: FC = () => {
   const {seeAll, setSeeAll} = useContext(UserContext)

  return (
    <View style={styles.container}>
      <View style={styles.headTitle}>
        <Text>MASTER BATHROOM ITEMS</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }}>
        <UnderlinedHeaderComponent titleOne={'AddItems from Categories'} titleTwo={'see all'} titleThree={'see less'} />
      </View>
        {/* <Line /> */}

      <>
        {
          seeAll ?
            <View style={styles.rest}>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                {
                  icons.map((icon, idx) => {
                    return (
                      <View style={styles.categories}>
                        <Pressable key={idx} >
                          <View style={{ alignItems: 'center' }}>
                            <Image style={{ width: 50, height: 50, }} source={icon.Link} />
                          </View>
                          <Text style={{ textAlign: 'center' }}>{icons[idx].Name} </Text>
                        </Pressable>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
            :
            <View style={styles.rest2}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                  icons.map((icon, idx) => {
                    return (
                      <View style={styles.categories2}>
                        <Pressable key={idx} >
                          <View style={{ alignItems: 'center' }}>
                            <Image style={{ width: 50, height: 50, }} source={icon.Link} />
                          </View>
                          <Text style={{ textAlign: 'center', }}>{icons[idx].Name} </Text>
                        </Pressable>
                      </View>
                    )
                  })
                }
              </View>
            </View>
        }
      </>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  headTitle: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',

  },
  clickText: {
    textDecorationLine: 'underline',
    flexDirection: 'row',
  },
  rest: {
    flex: 0.1,
    paddingLeft: 10,
    marginTop: 10

  },
  categories: {

    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    minWidth: 83,
    maxWidth: 84,
    marginRight: 10,

  },
  rest2: {
    flex: 0.1,
    paddingLeft: 10,
    minWidth: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginTop: 10
  },
  categories2: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    paddingBottom: 2,
    minWidth: 84,
    maxWidth: 84,
    marginRight: 10,
    marginBottom: 10

  },


});

export default AddItemsScreen