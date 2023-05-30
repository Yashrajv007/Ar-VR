
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';

// import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';
import Rootstack from './Navigators/Rootstack';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setappReady] = useState(false);
  const [storedCredentials, setstoredCredentials] = useState("");

  useEffect(() => {
    const checkLoginCredentials =async  () => {
      // console.log("hey there")
      
      await AsyncStorage.getItem('tripperCredentials')
        .then((result) => {
          if (result !== null) {
            // console.log("hey there");
            setstoredCredentials(JSON.parse(result));
            setappReady(true);
            
            
          } else {
            // console.log("hey there");
            // console.log(result);
            setstoredCredentials(null);
            
          }
        })
        .catch(error => console.log(error))
    }
  
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
       
        
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setappReady(true);
      }
    }
    checkLoginCredentials();
    prepare();
    console.log(appReady);
    onLayoutRootView({appReady});
  }, []);


  
  // useEffect(() => {
  //   checkLoginCredentials();
  // }, []);

  const onLayoutRootView = async (appReady) => {
    if (appReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      console.log('hey');
      await SplashScreen.hideAsync();
    }
  }

  // if (!appReady) {
  //   return null;
  // }





  // if (!appReady) {
  //   return (
  //     <AppLoading
  //       startAsync={checkLoginCredentials}
  //       onFinish={() => setappReady(true)}
  //       onError={console.warn}
  //     />
  //   )
  // }



  return (<>
    {/* flex: 1, alignItems: 'center', justifyContent: 'center' */}
    <CredentialsContext.Provider value={{ storedCredentials, setstoredCredentials }} >
      <Rootstack />
    </CredentialsContext.Provider>
      </>
  );
}

