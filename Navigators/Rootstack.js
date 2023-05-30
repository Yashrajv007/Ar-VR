import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import HomeScreen from '../screens/HomeScreen'
import Discover from '../screens/Discover';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { CredentialsContext } from '../components/CredentialsContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TailwindProvider } from 'tailwindcss-react-native';

const Stack = createNativeStackNavigator();

const Rootstack = () => {


  return (

    <CredentialsContext.Consumer>
  {({ storedCredentials }) =>
    storedCredentials ? (
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Discover' component={Discover} />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    ) : (
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    )
  }
</CredentialsContext.Consumer>







    
    //   <CredentialsContext.Consumer>
    //     {({ storedCredentials }) => {
    //       // {console.log(storedCredentials)}
    //       <TailwindProvider>
    //         <NavigationContainer>
    //           <Stack.Navigator>

    //             {storedCredentials ? (
    //               <Stack.Screen name='Discover' component={Discover} />
    //             ) : (
    //             <>
    //                 <Stack.Screen name='Home' component={HomeScreen} />
    //                 <Stack.Screen name='Login' component={Login} />
    //                 <Stack.Screen name='Signup' component={Signup} />
    //               </>
    //               )
    //             }
  

    //           </Stack.Navigator>
    //         </NavigationContainer>
    //       </TailwindProvider>
    //     }
    //     }
    //   </CredentialsContext.Consumer>
//     // <CredentialsContext.Consumer>
//     //     {({storedCredentials}) => {
            
//     <TailwindProvider>
//              <NavigationContainer>
//                <Stack.Navigator>
//                      <Stack.Screen name='Home' component={HomeScreen} />
//                     <Stack.Screen name='Login' component={Login} />
//                     <Stack.Screen name='Signup' component={Signup} />
//                     <Stack.Screen name='Discover' component={Discover} />
//                     </Stack.Navigator>
//             </NavigationContainer>
//     </TailwindProvider>
// //     }
// //  }
    // </CredentialsContext.Consumer>
    
  )
}

export default Rootstack