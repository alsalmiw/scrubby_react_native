// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Pressable, Image, FlatList } from 'react-native';
//

import icons from '../../types/Icons';

import Line from '../../components/AddEdit/LineComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UserContext from '../../context/UserContext';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import SquareColoredButton from '../../components/SquareColoredButton';

//icon
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { Dimensions } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';



const AddItemsScreen: FC = () => {
  const { seeAll, setSeeAll } = useContext(UserContext)
  const [plus, setPlus] = useState(true);
  let r = Math.floor(Math.random() * 7)


  return (
    <View style={styles.container}>
      <View style={styles.headTitle}>

        <HeaderComponent title='MASTER BATHROOM ITEMS'> </HeaderComponent>
      </View>
      <View style={styles.underlineContainer}>
        <UnderlinedHeaderComponent titleOne={'Add Items from Categories'} titleTwo={'see all'} titleThree={'see less'} />
      </View>


      <>
        {
          seeAll ?
            <>
              <View style={styles.rest}>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                  {
                    icons.map((icon, idx) => {
                      return (
                        <View style={styles.categories}>
                          <Pressable key={idx} onPress={() => console.log('im clicked')}>
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
              {/* <UnderlinedOneHeaderComponent titleFirst={'Items'} /> */}
            </>
            :
            <View style={styles.rest2}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                  icons.map((icon, idx) => {
                    return (
                      <View style={styles.categories2}>
                        <Pressable key={idx} onPress={() => console.log('im clicked')}>
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
      <View style={[styles.underlineContainer, { marginBottom: 5 }]}>
        <UnderlinedOneHeaderComponent titleFirst={'Items'} />
      </View>

      <ScrollView style={{   }}>
        <View style={styles.rest3}>
        <View style={{ flexDirection:'row', flexWrap:'wrap',  }}>
        <Pressable onPress={() => {setPlus(!plus), console.log("+") }}>
          <SquareColoredButton idx={r} >
            {
              plus ?
                <>
                  <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, marginBottom: 0, textAlign: 'center' }} />
                  <Text style={{ color: 'white', textAlign: 'center', marginTop: 0 }}>Sink</Text>
                </>
                :
                <>
                  <Entypo name="plus" size={45} color="white" style={{ paddingBottom: 0, marginBottom: 0, textAlign: 'center' }} />
                  <Text style={{ color: 'white', textAlign: 'center', marginTop: 0 }}>Sink</Text>
                </>
            }

          </SquareColoredButton>
        </Pressable>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        <SquareColoredButton idx={r} >
          <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, textAlign: 'center' }} />
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 0 }}>Sink</Text>
        </SquareColoredButton>
        </View>
        </View>
      </ScrollView>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  headTitle: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',

  },
  clickText: {
    textDecorationLine: 'underline',
    flexDirection: 'row',
  },
  rest: {
    flex: 0,
    paddingLeft: 10,
    marginTop: 10,


  },
  categories: {

    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    minWidth: 83,
    maxWidth: 84,
    marginRight: 10,
    minHeight: 85,
    maxHeight: 85


  },
  rest2: {
    flex: 0,
    paddingLeft: 10,
    minWidth: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginTop: 10,
    marginBottom: 10
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
    marginBottom: 10,
    minHeight: 85,
    maxHeight: 85

  },
  underlineContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,

  },
  rest3:{
    paddingLeft:'3%',
    paddingRight:'3%',
    textAlign:'center'
  }


});

export default AddItemsScreen