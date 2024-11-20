import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  DarkTheme as DefaultDarkTheme,
  DefaultTheme as DefaultLightTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LightTheme, DarkTheme} from './src/theme';
const Stack = createNativeStackNavigator();

import HomeScreen from './src/screens/HomeScreen';


const LightThemeSet = {
  ...DefaultLightTheme,
  isDark:false,
  colors: {
    ...DefaultLightTheme.colors,
    ...LightTheme,
  },
};

const DarkThemeSet = {
  ...DefaultDarkTheme,
  isDark: true,
  colors: {
    ...DefaultDarkTheme.colors,
    ...DarkTheme,
  },
};

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer theme={isDark === true ? DarkThemeSet : LightThemeSet}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home">
          {props => (
            <HomeScreen {...props} isDark={isDark} setIsDark={setIsDark} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
