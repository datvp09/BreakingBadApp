import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from '@redux/store';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@core/navigators/RootNavigator';
import {NotificationContainer, SpinnerContainer} from '@containers';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor={'transparent'}
            translucent={true}
          />
          <RootNavigator />
          <NotificationContainer />
          <SpinnerContainer />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
