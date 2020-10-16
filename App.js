import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Some elements from react-native.
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  Linking,
  Text,
  Image,
} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import * as Animatable from 'react-native-animatable';

import {Button} from 'native-base';

import Splash from '@screens/Splash';
import Login from '@screens/Login';
import FetchLoginInfo from '@src/FetchLoginInfo';
import ConnectionError from './src/screens/ConnectionError';
import StackNavigator from '@src/StackNavigator';

// For async storage...
import AsyncStorage from '@react-native-community/async-storage';

//EvenRegister for update from other screen...
import {EventRegister} from 'react-native-event-listeners';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRoute: 'Cuenta',
      userValidation: false,
      stateLogin: false,
      userStatus: false,
      infoLogin: [],
      connection_Status: null,
    };
  }

  async componentDidMount() {
    await setTimeout(
      () => {
        // Comentada mientras el login no sirve
        //NetInfo.addEventListener(this.handleConnectivityChange);
        this.loginProcess();
      },
      2000,
      this,
    );

    // loginCorrectly
  EventRegister.addEventListener('loginCorrectly', (data) => {
    this.setState({
      stateLogin: false,
      userValidation: true,
    });
  });

  EventRegister.addEventListener('logOut', (data) => {
    this.setState({
      stateLogin: true,
      userValidation: false,
    });
  });
  }


  // Mientras no funciona el login...
  async loginProcess() {
    await AsyncStorage.clear();

    // await AsyncStorage.setItem('user_id', '4');
    // await AsyncStorage.setItem('user_name', 'Administrador');
    
    //PENDIENTE
    //await AsyncStorage.setItem('user_restaurant', '0');
    
    // await AsyncStorage.setItem('user_img', 'image');
    // await AsyncStorage.setItem('user_email', 'admin_tiendas@yocomproencande.com');


    //EventRegister.emit('loginCorrectly', true);

    NetInfo.addEventListener(this.handleConnectivityChange);
    await this.verifyingUserIdentity();

    
  }

  handleConnectivityChange = async (state) => {
    if (state.isConnected) {
      this.setState({userValidation: false, connection_Status: true});
      // await this.verifyingUserIdentity();
    } else {
      this.setState({connection_Status: false});
      this.setState({userValidation: true});
    }
  };

  async verifyingUserIdentity() {
    let result = false;
  
    await AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        result = true;
      }
    });
  
    if (result === false) {
      let inf = await FetchLoginInfo();

      this.setState({infoLogin: inf});

      this.setState({
        stateLogin: true,
        userValidation: true,
      });
    } else {
      this.setState({
        stateLogin: false,
        userValidation: true,
      });
    }
  }

  

  render() {
    if (this.state.userValidation === false) {
      return <Splash />;
    } else if (this.state.connection_Status === false) {
      return <ConnectionError />;
    } else if (this.state.stateLogin === true) {
      return (
        <Login
          dataLogin={this.state.infoLogin}
          {...this.props}
        />
      );
    } else {
      return (
        <StackNavigator {...this.props}/>
      );
    }
  }
}

// const App = (props) => {

//   const [initialRoute, setInitialRoute] = React.useState('Cuenta');
//   const [userValidation, setUserValidation] = React.useState(false);
//   const [stateLogin, setStateLogin] = React.useState(false);

//   let variable = verifyingUser();

//   console.log('esta es la verifying... ', variable);

//   if (variable === false) {setStateLogin(true); setUserValidation(true);}

//   if (userValidation === false) {
//     return ( <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Aqui va el splash</Text></View>);
//   }
//   else if (stateLogin === true){
//     return (
//       <Login {...props}/>
//     );
//   }
//   else {

//     return ( <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Aqui va el react navigation</Text></View>);

//   }
// };

//export default App;
