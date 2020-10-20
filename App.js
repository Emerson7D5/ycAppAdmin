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

import {webApi} from './src/constants/Utils';

import Splash from '@screens/Splash';
import Login from '@screens/Login';
import FetchLoginInfo from '@src/FetchLoginInfo';
import ConnectionError from './src/screens/ConnectionError';
import StackNavigator from '@src/StackNavigator';

// For async storage...
import AsyncStorage from '@react-native-community/async-storage';

//EvenRegister for update from other screen...
import {EventRegister} from 'react-native-event-listeners';

import messaging from '@react-native-firebase/messaging';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRoute: 'Ordenes',
      userValidation: false,
      stateLogin: false,
      userStatus: false,
      infoLogin: [],
      connection_Status: null,
      user_id: '',
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
      this.loginCorrectly();
    });

    EventRegister.addEventListener('logOut', (data) => {
      this.setState({
        stateLogin: true,
        userValidation: true,
      });
    });
  }

  async loginCorrectly() {
    await AsyncStorage.getItem('number_of_restaurants').then((value) => {
      if (value != null) {
        if (value > 1) this.setState({initialRoute: 'RestaurantsByUser'});
      }
    });

    await messaging()
      .getToken()
      .then((token) => {
        this.saveTokenToDatabase(token);
      });

    this.setState({
      stateLogin: false,
      userValidation: true,
    });
  }

  async saveTokenToDatabase(token) {
    await AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        this.setState({
          user_id: value,
        });
      }
    });

    let collection = {};
    collection.user_id = this.state.user_id;
    collection.token = token;

    const url = webApi + '/tokens/save_token';

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(collection),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => console.error('Error:', error))
      .then((response) => {});
  }

  // Mientras no funciona el login...
  async loginProcess() {
    //await AsyncStorage.clear();

    // await AsyncStorage.setItem('user_id', '4');
    // await AsyncStorage.setItem('user_name', 'Administrador');

    await AsyncStorage.getItem('number_of_restaurants').then((value) => {
      if (value != null) {
        if (value > 1) {
          this.setState({initialRoute: 'RestaurantsByUser'});
        }
      }
    });

    if (this.state.initialRoute === 'RestaurantsByUser'){
      await AsyncStorage.setItem('user_restaurant', '0');
    }
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
      await messaging()
        .getToken()
        .then((token) => {
          this.saveTokenToDatabase(token);
        });

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
      return <Login dataLogin={this.state.infoLogin} {...this.props} />;
    } else {
      return (
        <StackNavigator
          {...this.props}
          restaurants={{initialRoute: this.state.initialRoute}}
        />
      );
    }
  }
}
