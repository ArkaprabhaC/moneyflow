import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './store';
import EditTransactionScreen from './src/screens/EditTransactionScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect( () => {
    const clearDb = async () => {
      await AsyncStorage.removeItem('4/2023');
    };
    clearDb();
  }, []);

  return (
    <>
      <Provider store={store}>
        <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EditTransactionScreen" component={EditTransactionScreen} 
              initialParams={{"editAmount": 0, "editDescription": "", "editId": ""}} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  )
}

export default App