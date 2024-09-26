import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 

import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UmbrellaList from './screens/UmbrellaList';
import UmbrellaDetails from './screens/UmbrellaDetails';
import EditUmbrella from './screens/EditUmbrella';

import UmbrellaMap from './screens/UmbrellaMap';  // Importér den nye UmbrellaMap komponent

import Profile from './screens/Profile'; // Importér din nye profilskærm


// Firebase konfiguration
import { initializeApp, getApps } from "firebase/app"; 

const firebaseConfig = {
  apiKey: "AIzaSyBYHrAq66g1WuAaUA5kt9Au1JbwWO0Gkis",
  authDomain: "paratply-9d36d.firebaseapp.com",
  databaseURL: "https://paratply-9d36d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "paratply-9d36d",
  storageBucket: "paratply-9d36d.appspot.com",
  messagingSenderId: "591283644526",
  appId: "1:591283644526:web:2023a24ab908f360161e7f"
};

export default function App() {
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
  }

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={'Umbrella List'} component={UmbrellaList} options={{headerShown: null}} />
        <Stack.Screen name={'Umbrella Details'} component={UmbrellaDetails} options={{headerShown: null}} />
        <Stack.Screen name={'Edit Umbrella'} component={EditUmbrella} options={{headerShown: null}} />
      </Stack.Navigator>
    );
  }

  const BottomNavigation = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name={'List of Umbrellas'} 
            component={StackNavigation} 
            options={{ 
              tabBarIcon: () => (<Ionicons name="list" size={20} />) 
            }} 
          />
          <Tab.Screen 
            name={'Book'} 
            component={EditUmbrella} 
            options={{ tabBarIcon: () => (<Ionicons name="book" size={20} />) }} 
          />
          <Tab.Screen 
            name={'Map'} 
            component={UmbrellaMap} 
            options={{ tabBarIcon: () => (<Ionicons name="map" size={20} />) }} 
          />
          {/* Tilføj en ny Tab.Screen til profilen */}
          <Tab.Screen 
            name={'Profile'} 
            component={Profile} 
            options={{ tabBarIcon: () => (<Ionicons name="person" size={20} />) }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  return <BottomNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
