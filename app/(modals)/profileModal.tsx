import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import ScreenWrapper from '@/components/ScreenWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { Image } from 'expo-image'
import { getProfileImage } from '@/services/imageService'
import * as Icons from 'phosphor-react-native'
import { UserDataType } from '@/types'
import Typo from '@/components/Typo'
import TextInputField from '@/components/TextInputField'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/authContext'
import { updateUser } from '@/services/userService'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
// import { Image as CachedImage } from "react-native-expo-image-cache";


const ProfileModal = () => {
    const {user ,updateUserData} =useAuth();
    const [userData,setUserData]=useState<UserDataType>({
        name:"",
        image:null,
    });
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    useEffect(()=>{
        setUserData({
            name:user?.name || "",
            image:user?.image || null,
        });
    },[user])
    const onPickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
          });
            
          if (!result.canceled) {
            setUserData({...userData,image:result.assets[0]});
          }
    }
    const onSubmit=async()=>{
        let {name,image}=userData;
        if(!name.trim()){
            Alert.alert("Kullanıcı","Lütfen tüm alanları doldurun.");
            return;
        }
        setLoading(true);
        const res =await updateUser(user?.uid as string,userData);
        setLoading(false);
        if(res.success){
            //kullanıcı güncelle
            updateUserData(user?.uid as string);
            router.back();
        }else{
            Alert.alert("Kullanıcı",res.msg);
        }
    }
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header 
        title='Profili Güncelle' 
        leftIcon={<BackButton />} 
        style={{marginBottom:spacingY._10}}
    />
    {/* form */}
    <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.avatarContainer}>
            {<Image 
               style={styles.avatar}
               source={getProfileImage(userData.image)}
               //source={{ uri: getProfileImage(userData.image).uri + `?t=${new Date().getTime()}` }} 
               //source={{ uri: getProfileImage(user?.image).uri + `?t=${Date.now()}` }}
               contentFit='cover'
               transition={100} 
             /> }
             {/* <CachedImage
             style={styles.avatar}
             uri={`${getProfileImage(userData.image)?.uri}?t=${Date.now()}`}
              tint='light'
             /> */}

             <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
                <Icons.Pencil
                size={verticalScale(20)}
                color={colors.black}
                />
             </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <Typo color={colors.black}>İsim</Typo>
            <TextInputField
            placeholder="İsim"
            value={userData.name}
            onChangeText={(value)=> setUserData({...userData,name:value})} />
        </View>
    </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading} style={{flex:1}}>
            <Typo color={colors.white} fontWeight={"700"}>Güncelle</Typo>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default ProfileModal

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        paddingHorizontal:spacingY._20,
        //paddingVertical:spacingY._30,
    },
    footer:{
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
        paddingHorizontal:spacingX._20,
        gap:scale(12),
        paddingTop:spacingY._15,
        borderTopColor:colors.neutral800,
        marginBottom:spacingY._5,
        borderTopWidth:1,
    },
    form:{
        gap:spacingY._30,
        marginTop:spacingY._15,
    },
    avatarContainer:{
        position:"relative",
        alignSelf:"center",
    },
    avatar:{
        alignSelf:"center",
        backgroundColor:colors.neutral300,
        height:verticalScale(135),
        width:verticalScale(135),
        borderRadius:200,
        borderWidth:1,
        borderColor:colors.neutral300,
        //overflow:"hidden",
        //position:"relative",
    },
    editIcon:{
        position:"absolute",
        bottom:spacingY._5,
        right:spacingY._7,
        borderRadius:100,
        backgroundColor:colors.neutral100,
        shadowColor:colors.black,
        shadowOffset:{width:0, height:0},
        shadowOpacity:0.25,
        shadowRadius:10,
        elevation:4,
        padding:spacingY._7,
    },
    inputContainer:{
        gap:spacingY._10,
    },
})