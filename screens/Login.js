import {SafeAreaView, View, Text,ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import  { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Attractions } from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { useContext } from 'react';

import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    RightIcon,
    Colors,
    StyledTextInput,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from "../components/styles"

// icons
import { Octicons,Ionicons,Fontisto } from '@expo/vector-icons';

import KeyboardavoidingWrapper from '../components/KeyboardavoidingWrapper';

import axios from 'axios';


const {brand,darkLight,primary}=Colors;

const Login = ({navigation}) => {

  // const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [] );

  const handleLogin=(credentials,setSubmitting)=>{
  handleMessage(null);
      // console.log(credentials);192.168.42.53
    const url='https://backend-blb1.vercel.app/user/signin';
    axios
    .post(url, credentials)
    .then((response)=>{
      const result=response.data;
      const {message,status,data}=result;

      if(status !== 'SUCCESS'){
        handleMessage(message,status);
        // setSubmitting(true);
      }else{
        // navigation.navigate('Discover');
        persistlogin({...data[0]},message,status);
      }
      setSubmitting(false);
    })
    .catch((error)=>{
      console.error(error);
      setSubmitting(false);
      handleMessage("An error occured,Check your internet connection and try again");
    });
    
  }

  // const handleGooglelogin=()=>{
  //   const config=
  // }

  const [hidePassword,sethidePassword]=useState(true);
  const [message,setMessage]=useState();
  const [messageType,setmessageType]=useState();
  // context

  const {storedCredentials,setstoredCredentials}=useContext(CredentialsContext);



  const handleMessage=(message,type='FAILED')=>{
    setMessage(message);
    setmessageType(type);
  }


  const persistlogin=(credentials,message,status)=>{
    AsyncStorage.setItem('tripperCredentials',JSON.stringify(credentials))
    .then(()=>{
      handleMessage(message,status)
      setstoredCredentials(credentials);

    })
    .catch((error)=>{
      console.log(error);
      handleMessage('Persisting login failed');
    })

  }


  return (
    <KeyboardavoidingWrapper>
    <StyledContainer>
        <StatusBar style='dark' />
        <InnerContainer>
        <PageLogo resizemode="cover" source={Attractions}  />
        <PageTitle>Trippers</PageTitle>
        <Subtitle>Account Login</Subtitle>

        <Formik
            initialValues={{email:'',password:''}}
            onSubmit={(values,{setSubmitting})=>{
                if (values.email=='' || values.password=='') {
                  handleMessage('Please fill all the fields')
                  setSubmitting(false);
                }else{
                  handleLogin(values,setSubmitting);
                }
            }}
        >
          {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=>(
        <StyledFormArea>
          <MyTextInput
          label="Email address" 
          icon="mail" 
          placeholder="andy@gmail.com"
          placeholderTextColor={darkLight}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          keyboardType="email-address"
          />

          <MyTextInput
          label="Password" 
          icon="lock" 
          placeholder="* * * * * * * * * "
          placeholderTextColor={darkLight}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry={hidePassword}
          isPassword={true}
          hidePassword={hidePassword}
          sethidePassword={sethidePassword}
          />
          <MsgBox type={messageType} >{message}</MsgBox>
          {!isSubmitting && <StyledButton onPress={handleSubmit}>
            <ButtonText>
              Login
            </ButtonText>
          </StyledButton>}

          {isSubmitting && <StyledButton disabled={true} >
            <ActivityIndicator size="large" color={primary} />
          </StyledButton>}

          <Line />
          <StyledButton google={true} onPress={handleSubmit}>
            <Fontisto name="google" color={primary} size={25} />
            <ButtonText google={true}>
              Sign in with google
            </ButtonText>
          </StyledButton>
          <ExtraView>
            <ExtraText>Don't have an account already?</ExtraText>
            <TextLink onPress={()=>navigation.navigate('Signup')}>
              <TextLinkContent>SignUp</TextLinkContent>
            </TextLink>
          </ExtraView>
        </StyledFormArea>
        )}
        </Formik>
        </InnerContainer>
    </StyledContainer>
    </KeyboardavoidingWrapper>
  )
}
const MyTextInput=({label,icon,isPassword,hidePassword,sethidePassword,...props})=>{
    return (
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword && (
          <RightIcon onPress={()=>sethidePassword(!hidePassword)}>
            <Ionicons name={hidePassword?'md-eye-off':'md-eye'} size={30} color={darkLight} />
          </RightIcon>
        )}
      </View>
    )
}

export default Login