import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { useRouter } from 'expo-router'
const SearchBar = ({placeholder,onPress}:{placeholder:string,onPress:()=> void}) => {
    const router = useRouter();
  return (
     <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={"#AB8BFF"}/>
      <TextInput onPress={onPress}
        placeholder={placeholder}
        value=''
        onChangeText={()=>{}}
        placeholderTextColor={"#a8b5db"}
        className='flex-1 ml-2 text-white'/>
    </View>
  )
}

export default SearchBar