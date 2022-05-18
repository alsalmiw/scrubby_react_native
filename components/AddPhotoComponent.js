import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {ThemeContext} from "../context/ThemeContext"
import * as ImagePicker from 'expo-image-picker';


const AddPhotoComponent = () => {
    const {lilacColor} = useContext(ThemeContext)
    const [image, setImage] = useState('');
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
         
        //     let file = event.target.files[0];
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //       console.log(reader.result)
        //       setBlogImage(reader.result)
        //     }
        //     reader.readAsDataURL(file)
        //   }
        
    }

  

    return(
        <Pressable style={[styles.container]} onPress={selectPhoto}>
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
            
            <FontAwesome name="photo" color={lilacColor} size={50}  />
        </Pressable>
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