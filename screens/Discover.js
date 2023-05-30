import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert,Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '../assets';
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { useContext } from 'react';




const Discover = () => {
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false);
    const {storedCredentials,setstoredCredentials}=useContext(CredentialsContext);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [] );

      const pressHandler = () => {
        Alert.alert('Sorry For Inconvenience!! We will update you soon');
      }

      const ClearLogin =()=>{
        AsyncStorage.removeItem('tripperCredentials')
        .then(()=>{
            setstoredCredentials("");
        })
        .catch(error =>console.log(error))
      }

      

  return (
    <SafeAreaView className="flex-1 mt-7 bg-white relative">
        <View className="flex-row items-center justify-between px-4">
            <View>
                <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
                <Text className="text-[#527283] text-[33px]">the beauty today</Text>
            </View>

            <View className="w-25 h-12 bg-gray-100 rounded-md items-center shadow-lg justify-center">
                {/* <Image
                    source={Avatar}
                    className="w-full h-full rounded-md object-cover"
                /> */}
                <Button title='Logout' onPress={ClearLogin}></Button>
            </View>
        </View>

        {isLoading ? <View className="flex-1 items-center justify-center">
            <ActivityIndicator size='large' color='#08646B' />
        </View>
        : 
        <ScrollView>
            <View>
                <View className="flex-row items-center justify-between px-4 mt-8">
                    <Text className="text-[#00BCC9] text-[35px] font-bold">Hot Spots</Text>
                    <TouchableOpacity className="flex-row items-center justify-center space-x-2" onPress={pressHandler}>
                        <Text className="text-[#2C7379] text-[28px] font-bold">Explore</Text>
                        <FontAwesome name='long-arrow-right' size={24} color='#A0C4C7'  />
                    </TouchableOpacity>
                </View>

                <View className="px-4 mt-8 flex-row items-center justify-around flex-wrap">
                    <ItemCardContainer 
                        key={"101"}
                        imageSrc={require('../assets/Veersouda.jpg')}
                        title="VeerSouda Park"
                        location="Belgaum"
                    />
                    <ItemCardContainer 
                        key={"102"}
                        imageSrc={require('../assets/Veersouda.jpg')}
                        title="VeerSouda Park"
                        location="Belgaum"
                    />
                    
                </View>
            </View>
        </ScrollView>
        }
    </SafeAreaView>
  )
}

export default Discover
