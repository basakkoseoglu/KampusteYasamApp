import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { useAuth } from '@/contexts/authContext'
import Typo from '@/components/Typo'
import {Image} from 'expo-image';
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import * as Icons from 'phosphor-react-native'
import Animated from 'react-native-reanimated'
import { FadeInDown } from 'react-native-reanimated'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'expo-router'

const Profile = () => {
  const {user} = useAuth();
  const router=useRouter();

  const accountOptions:accountOptionType[]=[
    {
      title:"Profili Düzenle",
      icon:<Icons.User size={26} color={colors.white} weight="fill"/>,
      routeName: '/(modals)/profileModal',
      bgColor:"#6366f1",
    },
    {
      title:"Ayarlar",
      icon:<Icons.GearSix size={26} color={colors.white} weight="fill"/>,
      //routeName: '/(modals)/profileModal',
      bgColor:"#059669",
    },
    {
      title:"Gizlilik Politikası",
      icon:<Icons.Lock size={26} color={colors.white} weight="fill"/>,
      //routeName: '/(modals)/profileModal',
      bgColor: colors.neutral400,
    },
    {
      title:"Çıkış Yap",
      icon:<Icons.Power size={26} color={colors.white} weight="fill"/>,
      //routeName: '/(modals)/profileModal',
      bgColor:"#e11d48",
    },
  ];
   const handleLogout=async()=>{
      await signOut(auth);
    }

  const showLogoutAlert=()=>{
    Alert.alert("Onay","Çıkış yapmak istediğinizden emin misiniz?",[
      {
        text:"İptal",
        onPress: () =>console.log("çıkış iptal edildi"),
        style:'cancel'
      },
      {
        text:"Çıkış Yap",
        onPress:()=>handleLogout(),
        style:"destructive"
      }
    ])
  }
  const handlePress= (item:accountOptionType)=>{
    if(item.title == 'Çıkış Yap'){
      showLogoutAlert();
    }
    if(item.routeName) router.push(item.routeName);
  };
  return (
    <ScreenWrapper>
     <View style={styles.container}>
      <Header title='Profil' style={{marginVertical:spacingY._10}}/>
      {/* kullanıcı bilgileri */}
      <View style={styles.userInfo}>
        {/*avatar */}
        <View>
          {/* kullanıcı resmi */}
          <Image 
            source={getProfileImage(user?.image)}
            style={styles.avatar} 
            contentFit='cover' 
            transition={100} 
          />
        </View>
        {/* name & email & üniversite & bölüm & cinsiyet */}
        <View style={styles.nameContainer}>
          <Typo size={24} fontWeight={"600"} color={colors.black}> {user?.name}</Typo>
          <Typo size={15}  color={colors.neutral400}> {user?.email}</Typo>
        </View>
      </View>
      {/* hesap seçenekleri*/}
      <View style={styles.accountOptions}>
        {
          accountOptions.map((item,index)=>{
            return(
              <View key={index.toString()} 
              // entering={FadeInDown.delay(index*50)
              //  .springify()
              //  .damping(14)} 
              style={styles.listItem}>
                <TouchableOpacity style={styles.flexRow} 
                 onPress={()=>handlePress(item)}>
                     {/* icon */}
                     <View style={[styles.listIcon,{
                      backgroundColor:item?.bgColor
                     }]}>
                      {item.icon && item.icon}
                     </View>
                     <Typo size={16} style={{flex:1}} fontWeight={"500"}>
                      {item.title}
                     </Typo>
                     <Icons.CaretRight
                     size={verticalScale(20)}
                     weight='bold'
                     color={colors.black} 
                     />
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
     </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:spacingX._20,
  },
  userInfo:{
    marginTop:verticalScale(30),
    alignItems:"center",
    gap:spacingY._15,
  },
  avatarContainer:{
    position:"relative",
    alignSelf:"center",
  },
  avatar:{
    alignSelf:"center",
    backgroundColor: colors.neutral300,
    height:verticalScale(135),
    width:verticalScale(135),
    borderRadius:200,
    //overflow:"hidden",
    //position:"relative",
  },
  editIcon:{
    position:"absolute",
    bottom:5,
    right:8,
    borderRadius:50,
    backgroundColor:colors.neutral100,
    shadowColor:colors.black,
    shadowOffset:{width:0,height:0},
    shadowOpacity:0.25,
    shadowRadius:10,
    elevation:4,
    padding:5,
  },
  nameContainer:{
    gap:verticalScale(4),
    alignItems:"center",
  },
  listIcon:{
    height:verticalScale(44),
    width:verticalScale(44),
    backgroundColor:colors.neutral400,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:radius._15,
    borderCurve:"continuous",
  },
  listItem:{
    marginBottom:verticalScale(17),
  },
  accountOptions:{
    marginTop:spacingY._35,
  },
  flexRow:{
    flexDirection:"row",
    alignItems:"center",
    gap:spacingX._10,
  },
});