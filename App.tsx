import { NavigationContainer } from '@react-navigation/native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ContextProvider } from '@context';

import Routes from 'src/routes/index.routes';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <NavigationContainer>
        <ContextProvider>
            <Routes />
        </ContextProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
