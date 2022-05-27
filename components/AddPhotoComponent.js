import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {ThemeContext} from "../context/ThemeContext"
import * as ImagePicker from 'expo-image-picker';
import TitleComponent from "./AddEdit/TitleComponent";
import FullButtonComponent from "./FullButtonComponent";
import UserContext from "../context/UserContext";
import { ChangeAvatarImage, ChangeDependentAvatarImageawait } from "../services/dataService";


const AddPhotoComponent = () => {
    const {lilacColor, orangeColor, blueColor} = useContext(ThemeContext)
  const {username, isEditImage, setIsEditImage, memberInfo } = useContext(UserContext)

    const [image, setImage] = useState('');
    const [isSelected, setIsSelected] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission] =useState(false);


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
          let imgType=''
          let fileName =''
          if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri)
            imgType = result.uri.split('.')[1]
            console.log(imgType);
            fileName = result.uri.replace(/^.*[\\\/]/, "")
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
                    uri: result.uri,
                    name: "avatar46.png",
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
                              navigation.navigate('ProfileScreen')
                            }
                    
                        }
                        else if (memberInfo.isChild)
                        {
                          let data = {
                            Id: memberInfo.Id,
                            Photo: response.path
                            }
                            console.log(data)
                            let result = ChangeDependentAvatarImageawait (data)
                            if(result) {
                                alert("You have successfully updated your child's photo")
                                navigation.navigate('ChildTasks')
                              }
                      
                        }
                    }
                   
    }

  

    return(
        <>
        <TitleComponent title={memberInfo.isChild?"Edit Child's Photo":"Edit Profile Photo"} />
        <Pressable style={[styles.container]} onPress={selectPhoto}>
            {
                isSelected?
           <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius:10 }} />
                :
                 <FontAwesome name="photo" color={lilacColor} size={50}  />

            }
            
           
        </Pressable>

<FullButtonComponent radius={0} onPress={handleSaveImage} color={blueColor}>
<Text>Save</Text>
</FullButtonComponent>
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