import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { SingIn } from './../screens/SingIn';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
  // const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SingIn} />
    </Navigator>
  );
};

export { AuthRoutes };
