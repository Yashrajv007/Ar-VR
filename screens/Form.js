import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';

const Form = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [] );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [agree, setAgree] = useState(false);
    const submit = () =>{
        if(!name || !email || !phone){
            Alert.alert("Please Fill all the fields");
        }else{
            Alert.alert(`Registered Successfully, ${name} !!!`);
            navigation.navigate("Discover");
        }
    };

    return (
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
          <Text style={styles.mainHeader}>Login Form</Text>
          <Text style={styles.description}>You can reach us anytime via trippers@info.com</Text>

          {/* Form */}
          <View style={styles.inputContainer}>
              <Text style={styles.labels} >Enter your name</Text>
              <TextInput
                  value={name}
                  onChangeText={(values) => setName(values)}
                  placeholder='Enter name'
                  autoCapitalize='none'
                  autoCorrect={false}
                  style={styles.inputStyle}
              />
          </View>

          <View style={styles.inputContainer}>
              <Text style={styles.labels} >Enter your email</Text>
              <TextInput
                  value={email}
                  onChangeText={(values) => setEmail(values)}
                  placeholder='Enter email'
                  autoCapitalize='none'
                  autoCorrect={false}
                  style={styles.inputStyle}
              />
          </View>

          <View style={styles.inputContainer}>
              <Text style={styles.labels} >Enter your Phone</Text>
              <TextInput
                  value={phone}
                  onChangeText={(values) => setPhone(values)}
                  placeholder='Enter phone'
                  autoCapitalize='none'
                  autoCorrect={false}
                  style={styles.inputStyle}
                  keyboardType='numeric'
              />
          </View>

          <View style={styles.wrapper}>
              <Checkbox 
                  value={agree}
                  onValueChange={() => setAgree(!agree) }
                  color={agree ? 'skyblue' : undefined}
                  />
                  <Text style={styles.wrapperText} >
                      I have read and agreed with the TC
                  </Text>
          </View>

          <TouchableOpacity style={[styles.buttonStyle, {
              backgroundColor: agree ? 'skyblue' : "grey"
          },]}
              disabled={!agree}
              onPress={submit}
          >
              <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      paddingHorizontal: 30,
      paddingTop: 30,
      backgroundColor: '#fff'
    },
    mainHeader: {
      fontSize: 25,
      color: '#344055',
      fontWeight: '500',
      paddingTop: 20,
      paddingBottom: 15,
      textTransform: 'capitalize',
    },
  description: {
      fontSize: 20,
      color: '#7d7d7d',
      paddingBottom: 20,
      lineHeight: 25,
    },
    inputContainer: {
      marginTop: 20,
    },
  labels: {
      fontSize: 18,
      color: '#7d7d7d',
      marginTop: 10,
      marginBottom: 5,
      lineHeight: 25,
    },
    inputStyle: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.3)',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 1,
      fontSize: 18
    },
  wrapper: {
      paddingVertical: 15,
      flexDirection:"row",
      alignItems:"center",
      marginTop: 15,
      marginBottom: 360,
    },
    wrapperText: {
      paddingLeft: 5,
      marginTop: 0,
    },
  buttonStyle: {
      marginTop: -330,
      borderRadius: 40,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      justifyContent: 'center',
      alignContent: 'center',
      fontWeight: '600'
    },
  });

export default Form;