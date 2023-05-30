import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Attractions } from '../assets';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { useContext } from 'react';

import {
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
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// keyboard avoiding rapper
import KeyboardavoidingWrapper from '../components/KeyboardavoidingWrapper';




import axios from 'axios';

const { brand, darkLight, primary } = Colors;

const Signup = ({ navigation }) => {

    // const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const [hidePassword, sethidePassword] = useState(true);
    const [show, setshow] = useState(false);
    const [date, setdate] = useState(new Date(2000, 0, 1));
    const [dob, setdob] = useState();
    const [message, setMessage] = useState();
    const [messageType, setmessageType] = useState();

    const {storedCredentials,setstoredCredentials}=useContext(CredentialsContext);


    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setmessageType(type);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshow(false);
        setdate(currentDate);
        setdob(currentDate);

    }

    const showDatePicker = () => {
        setshow(true);

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

    const handleSignup =(credentials, setSubmitting) => {
        handleMessage(null);
        // console.log(credentials);192.168.42.53
        const url = 'https://backend-blb1.vercel.app/user/signup';
        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    // navigation.navigate('Discover', );
                    persistlogin({ ...data },message,status);
                }
                setSubmitting(false);
            })
            .catch((error) => {
                console.error(error);
                setSubmitting(false);
                handleMessage("An error occured,Check your internet connection and try again");
            });
    }


    return (
        <KeyboardavoidingWrapper>
            <StyledContainer>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageLogo resizemode="cover" source={Attractions} />
                    <PageTitle>Trippers</PageTitle>
                    <Subtitle>Account Signup</Subtitle>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}

                    <Formik
                        initialValues={{ name: '', dateOfBirth: '', confirmPassword: '', email: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            values={...values,dateOfBirth:dob};
                            if (values.name == '' || values.email == '' || values.password == '' || values.dateOfBirth == '' || values.confirmPassword == '') {
                                handleMessage('Please fill all the fields')
                                setSubmitting(false);
                            } else if (values.password !== values.confirmPassword) {
                                handleMessage('Passwords do not match')
                                setSubmitting(false);
                            }
                            else {
                                handleSignup(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values,isSubmitting }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Full Name"
                                    icon="person"
                                    placeholder="Peter Griffin"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}

                                />

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
                                    label="Date of Birth"
                                    icon="calendar"
                                    placeholder="yyyy-mm-dd"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob ? dob.toDateString() : ''}
                                    isDate={true}
                                    editable={false}
                                    showDatePicker={showDatePicker}
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

                                <MyTextInput
                                    label="Confirm password"
                                    icon="lock"
                                    placeholder="* * * * * * * * * "
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    sethidePassword={sethidePassword}
                                />
                                <MsgBox type={messageType} >{message}</MsgBox>
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Signup
                                    </ButtonText>
                                </StyledButton>}

                                {isSubmitting && <StyledButton disabled={true} >
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>}
                                <Line />
                                <ExtraView>
                                    <ExtraText>Already have an account?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Login')}>
                                        <TextLinkContent>Login</TextLinkContent>
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
const MyTextInput = ({ label, icon, isPassword, hidePassword, sethidePassword, isDate, showDatePicker, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props} />
            </TouchableOpacity>}
            {isPassword && (
                <RightIcon onPress={() => sethidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup