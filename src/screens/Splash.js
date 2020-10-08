import React from 'react';
import { View,} from 'react-native';

// To do animatable elements....
import * as Animatable from 'react-native-animatable';

const SplashScreen = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{
          textAlign: 'center',
          fontSize: 40,
          color: '#000941',
          fontWeight: 'bold',
        }}>
        YoComproAdmin &nbsp;
      </Animatable.Text>

    </View>
  );
};
export default SplashScreen;
