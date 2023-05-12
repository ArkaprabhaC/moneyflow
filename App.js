import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import EditTransactionScreen from './src/screens/EditTransactionScreen';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

const App = () => {
  
  // // TODO: Delete the following useEffect before shipping off to production!!
  // useEffect( () => {
  //   const clearDb = async () => {
  //     await persistor.purge();
  //   };
  //   clearDb();
  // }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="HomeScreen" component={HomeScreen}/>
              <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="EditTransactionScreen" component={EditTransactionScreen} 
                initialParams={{"editAmount": 0, "editDescription": "", "editId": ""}} options={{ headerShown: false }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App