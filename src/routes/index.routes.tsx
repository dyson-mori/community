import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useContexts } from '@context';

import { Input } from './styles';

import Login from '../pages/login';
import Home from '../pages/home';
import Search from '../pages/search';

import { SearchNormal, RotateLeft } from '../assets/svg/linear';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
  const {  } = useContexts();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={Home}
        options={({ navigation }) => ({
          animation: 'none',
          headerTransparent: true,
          headerTintColor: '#FFF',
          headerRight: () => {
            return (
              <TouchableOpacity
                activeOpacity={.5}
                onPress={() => navigation.push('Search')}
              >
                <SearchNormal stroke="#fff" strokeWidth={1} />
              </TouchableOpacity>
            )
          }
        })}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={({ navigation }) => ({
          animation: 'none',
          headerShown: true,
          headerTintColor: '#555',
          headerLargeTitle: false,
          // headerSearchBarOptions: {
          //   inputType: 'text',
          //   onChangeText: (evt) => console.log(evt.nativeEvent.text),
          //   hideWhenScrolling: false
          // },
          // headerBackground: () => ,
          // headerStyle: {
          //   backgroundColor: '#fff',
          // },
          headerLeft: () => (
            <TouchableOpacity activeOpacity={.5} onPress={() => navigation.goBack()}>
              <RotateLeft stroke="#555" strokeWidth={1} />
            </TouchableOpacity>
          ),
          headerTitle: () => {
            return <Input returnKeyType='search' />
          },
          headerRight: () => (
            <TouchableOpacity activeOpacity={.5}>
              <SearchNormal stroke="#555" strokeWidth={1} />
            </TouchableOpacity>
          )
        })}
      />
    </Tab.Navigator>
  );
};
