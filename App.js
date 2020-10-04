/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
/**Screens */
import Home from './app/screens/Home';
import Kategori from './app/screens/Kategori';
import Kasir from './app/screens/Kasir';
import Checkout from './app/screens/Checkout';
import InputBarang from './app/screens/InputBarang';
import InputPelanggan from './app/screens/InputPelanggan';
import SuccessScreen from './app/screens/SuccessScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Kasir"
            component={Kasir}
            options={{title: 'Keranjang Belanja'}}
          />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen
            name="InputBarang"
            component={InputBarang}
            options={{title: 'Input Barang'}}
          />
          <Stack.Screen name="Kategori" component={Kategori} />
          <Stack.Screen
            name="InputPelanggan"
            component={InputPelanggan}
            options={{title: 'Input Pelanggan'}}
          />
          <Stack.Screen
            name="SucceesScreen"
            component={SuccessScreen}
            options={{title: 'Success'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
});

export default App;
