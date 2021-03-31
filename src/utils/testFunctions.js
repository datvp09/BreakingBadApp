import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {render as renderComponent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import createMockStore from 'redux-mock-store';

const Stack = createStackNavigator();

const MockRootNavigator = ({component}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Public'}>{props => component}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const renderForTest = (Component, {initialState} = defaultOptions) => {
  const mockStore = createMockStore(initialState);
  return renderComponent(
    <Provider store={mockStore}>
      <MockRootNavigator component={Component} />
    </Provider>,
  );
};
