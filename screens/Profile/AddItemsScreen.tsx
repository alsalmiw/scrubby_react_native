// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Pressable, Image, Button } from 'react-native';
////

import icons from '../../types/Icons';
import { Dimensions } from 'react-native';


const AddItemsScreen: FC = () => {
  const [seeAll, setSeeAll] = useState(false)
  const windowWidth = Dimensions.get('window').width / 0.25;
  const firstRow: any = [];
  const secRow: any = [];
  icons.filter((x, idx) => idx < Math.floor(icons.length / 2) ? firstRow.push(x) : secRow.push(x))

  return (
    <View style={styles.container}>
      <View style={styles.headTitle}>
        <Text>MASTER BATHROOM ITEMS</Text>
      </View>
      <View style={{flex:0.1, flexDirection:'row'}}>
        <Text style={{justifyContent:'flex-start', textAlign:'left'}}>Add Items from Categories  </Text>
          {
            seeAll ?
            <Text style={styles.clickText} onPress={() => { setSeeAll(!seeAll), console.log(seeAll) }}>see all</Text>
            :
            <Text style={styles.clickText} onPress={() => { setSeeAll(!seeAll), console.log(seeAll) }}>see less</Text>
          }
          

      </View>
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
                          <Image style={{ width: 50, height: 50, }} source={icon.Link} />
                          <Text style={{ textAlign: 'center' }}>{icons[idx].Name} </Text>
                        </Pressable>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
            :
            <>
              <View style={styles.rest2}>
                {
                  firstRow.map((icon: string, idx: number) => {

                    return (
                      <View style={styles.categories2}>
                        <Pressable key={idx} >
                          <Image style={{ width: 50, height: 50, }} source={firstRow[idx].Link} />
                          <Text style={{ textAlign: 'center' }}>{firstRow[idx].Name} </Text>
                        </Pressable>
                      </View>
                    )
                  })

                }


              </View>
              <View style={styles.rest2}>
                {
                  secRow.map((icon: string, idx: number) => {

                    return (
                      <View style={styles.categories2}>
                        <Pressable key={idx} >
                          <Image style={{ width: 50, height: 50, }} source={secRow[idx].Link} />
                          <Text style={{ textAlign: 'center' }}>{secRow[idx].Name} </Text>
                        </Pressable>
                      </View>
                    )
                  })
                }
              </View>
            </>
        }
      </>

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
  headTitle: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',

  },
  clickText: {
    textDecorationLine: 'underline',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'flex-end'

  },
  rest: {
    flex: 0.1,
    paddingLeft: 10

  },
  categories: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    minWidth: 75,
    marginRight: 10,

  },
  rest2: {
    flex: 0.1,
    paddingLeft: 10,
    flexDirection: 'row',
    minWidth: 'auto',
    marginTop: 10

  },
  categories2: {

    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    minWidth: 75,
    marginRight: 10,

  },


});

export default AddItemsScreen