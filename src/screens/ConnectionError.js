import React from 'react';
import {View, Text, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

const ConnectionError = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animatable.View
        animation="pulse"
        easing="ease"
        iterationCount="infinite"
        style={{alignItems: 'center', marginBottom: 30}}>
        <Image
          source={require('../img/Wifi.png')}
          style={{width: 80, height: 80, borderRadius: 20}}
        />
      </Animatable.View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'red',
        }}>
        Opsssss...
      </Text>

      <Text style={{fontSize: 15, textAlign: 'center', color: 'darkblue'}}>
        Apparently, you have no internet connection ...
      </Text>
    </View>
  );
};

export default ConnectionError;
