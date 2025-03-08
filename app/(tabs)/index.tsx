import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useAuth } from '@/contexts/authContext'

const Home = () => {
  const{user}=useAuth();
  console.log("kullanıcı: ",user);
  const handleLogout=async()=>{
    await signOut(auth);
  }
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={handleLogout}>
        <Typo color='#fff'>
            çıkış yap
        </Typo>
      </Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})