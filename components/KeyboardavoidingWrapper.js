import { View, Text,KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Keyboard } from 'react-native'
import React, { Children } from 'react'


const KeyboardavoidingWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView style={{flex:1}}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard
            .dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
   
  )
}

export default KeyboardavoidingWrapper