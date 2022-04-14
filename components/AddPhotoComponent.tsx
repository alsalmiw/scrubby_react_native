import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {ThemeContext} from "../context/ThemeContext"
import * as ImagePicker from 'expo-image-picker';



const AddPhotoComponent: FC =() => {
    const {lilacColor} = useContext(ThemeContext)
    const [image, setImage] = useState({});
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
            quality: 0,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri)

          }

          if(hasGalleryPermission==false){
              return <Text>No Access to Internal Storage</Text>
          }

          const SavePhoto = async () => {
              const form = new FormData();
              form.append('profile', JSON.stringify( {
                  name: new Date() + "profile",
                  uri: image,
                  type: 'image'

                }))

                let res = await fetch('',{
                    method: "POST",
                    body: form,
                    headers:{
                    "Content-Type": "multipart/form-data",
                    }
                    
                })
                let response = await res.json()
                console.log(response)
          }
        //   const handleImage = (event) => {
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
        <Pressable style={[styles.container]} onPress={() =>{
            selectPhoto();
        }}>
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

export default AddPhotoComponent