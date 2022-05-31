import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {ThemeContext} from "../context/ThemeContext"
import * as ImagePicker from 'expo-image-picker';
import TitleComponent from "./AddEdit/TitleComponent";
import FullButtonComponent from "./FullButtonComponent";
import UserContext from "../context/UserContext";
import { ChangeAvatarImage, ChangeDependentAvatarImage, GetDependantByChildId, GetUserByUsername } from "../services/dataService";
import { useNavigation } from "@react-navigation/native";
import TwoFullButtonComponent from './TwoFullButtonComponent';


const AddPhotoComponent = () => {
    const {lilacColor, orangeColor, blueColor} = useContext(ThemeContext)
  const {username, isEditImage, setIsEditImage, memberInfo, userData, setChildPage, setUserData } = useContext(UserContext)

    const [image, setImage] = useState('');
    const [imgType, setImgType] = useState('');
    const [fileName, setFileName] = useState('');

    const [isSelected, setIsSelected] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission] =useState(false);
    const navigation = useNavigation();

 

    useEffect(()=>{
        (async () => {
            const galleryStatuses = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatuses.status==='granted')
        })();

    }, [])

    const selectPhoto = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          //console.log(result);
          
          
          if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri)
            setImgType(result.uri.split('.')[1])
            console.log(imgType);
            setFileName(result.uri.replace(/^.*[\\\/]/, ""))
            console.log(fileName)
          
          }

          if(hasGalleryPermission==false){
              return alert("Could not access photo gallery")
          }
          
          setIsSelected(true)
        
         
        //     let file = event.target.files[0];
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //       console.log(reader.result)
        //       setBlogImage(reader.result)
        //     }
        //     reader.readAsDataURL(file)
        //   }
        
    }

    const handleSaveImage = async () => {

           const formData = new FormData();
                formData.append('photo',  {
                    uri: image,
                    name: fileName,
                    type: `image/${imgType}`

                    })
                 console.log(formData)
                 
                    let res = await fetch('https://scrubbyapi.azurewebsites.net/Photos/uploadingImage',{
                        method: "POST",
                        headers:{
                            "Accept": "application/json",
                        },
                        body: formData,
                    })
                    let response = await res.json()
                    console.log(response.path)

                    if(response!=null){
                        if(!memberInfo.isChild)
                        {
                          let data = {
                          Id: userData.id,
                          Photo: response.path
                          }
                          console.log(data)
                          let result = await ChangeAvatarImage(data)
                          if(result) {

                              alert("You have successfully updated your photo")
                              let userInfo = await GetUserByUsername(userData.username)
                              if (userInfo!=null) {
                                  setUserData(userInfo)
                              }
                              navigation.navigate('MyProfile')
                            }
                    
                        }
                        else if (memberInfo.isChild)
                        {
                          let data = {
                            Id: memberInfo.id,
                            Photo: response.path
                            }
                            console.log(data)
                            let result = await ChangeDependentAvatarImage (data)
                            if(result) {
                                let childInfo = await GetDependantByChildId(memberInfo.id)
                                if(childInfo!=null) {
                                  setChildPage(childInfo)
                                }
                                alert("You have successfully updated your child's photo")
                                navigation.navigate('ChildTasks')
                              }
                      
                        }
                    }
                   
    }

  

    return(
        <>
        <View></View>
        <View>
        <TitleComponent title={memberInfo.isChild?"Edit Child's Photo":"Edit Profile Photo"} />
        <Pressable style={[styles.container]} onPress={selectPhoto}>
            {
                isSelected && image.length>0?
           <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius:10 }} />
                :
                 <FontAwesome name="photo" color={lilacColor} size={50}  />

            }
         
           
        </Pressable>
             </View>

             {
                isSelected && image.length>0?

                <TwoFullButtonComponent text1={"Back"} text2={"Save"} onAcceptPress={handleSaveImage} onBackPress={()=>navigation.goBack()} color={blueColor}/>
                    :
                <FullButtonComponent radius ={0} onPress={()=>navigation.goBack()} color={blueColor}>
                            <Text>Back</Text>
                            </FullButtonComponent>
                }

</>
    )
}

const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor:"white",
            justifyContent: 'center',
             width:200,
             height:200,
            padding: 10,
            borderRadius:5,
            margin: 3,
            
        },
    })

export {AddPhotoComponent}