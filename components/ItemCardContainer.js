import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native';

const ItemCardContainer = ({imageSrc, title, location}) => {

    const navigation = useNavigation();

    const handleLinkPress = async () => {
        // Open the link in the default browser
        console.log('pressed');
        await Linking.openURL('https://abhisalunkhe.github.io/veersouda_park/');
      };

  return (
    <TouchableOpacity onPress={handleLinkPress}

        // Here Enter the link of the tour


        // onPress={() => }
    className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[400px] my-2">
        <Image
            source={imageSrc}
            className="w-full h-40 rounded-md object-cover"
        />
        <Text className="text-[#428288] text-[18px] font-bold">
            {title.length > 14 ? `${title.slice(0,14)}..` : title}
        </Text>

        <View className="flex-row items-center space-x-1">
            <FontAwesome name='map-marker' size={24} color='#8597A2' /> 
            <Text className="text-[#428288] text-[14px] font-bold">
                {location.length > 18 ? `${title.slice(0,18)}..` : location}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ItemCardContainer
