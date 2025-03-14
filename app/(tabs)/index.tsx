import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useAuth } from '@/contexts/authContext'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors } from '@/constants/theme'

const Home = () => {
  const{user}=useAuth();
  // console.log("kullanıcı: ",user);
  // const handleLogout=async()=>{
  //   await signOut(auth);
  // }
  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      {/* <Button onPress={handleLogout}>
        <Typo color={colors.white}>
            çıkış yap
        </Typo>
      </Button> */}
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})