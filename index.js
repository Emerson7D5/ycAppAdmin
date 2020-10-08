<<<<<<< HEAD
=======
import 'react-native-gesture-handler';

>>>>>>> 423e92746de6dd702de111b871726560243b6176
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
<<<<<<< HEAD
=======
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background on index.js!', remoteMessage);
    
  });

  function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }
  
  
  
>>>>>>> 423e92746de6dd702de111b871726560243b6176

AppRegistry.registerComponent(appName, () => App);
