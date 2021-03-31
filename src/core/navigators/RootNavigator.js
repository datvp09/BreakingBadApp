import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderBackButton,
} from '@react-navigation/stack';
import {HomeScreen, DetailScreen, CommentScreen} from '@screens';
import {Color} from '@theme';

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator
    screenOptions={{
      // headerShown: false,
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: {
        backgroundColor: Color.HeaderLight,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 18,
      },
    }}
    initialRouteName={'HomeScreen'}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={({route}) => ({
        title: 'List of characters',
      })}
    />
    <Stack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={({route}) => ({
        title: 'Character Details',
      })}
    />
    <Stack.Screen
      name="CommentScreen"
      component={CommentScreen}
      options={({route}) => ({
        title: 'Comments',
      })}
    />
  </Stack.Navigator>
);

export default Router;
