import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';


//Some elements from react-native.
import {StyleSheet, View, Platform, Alert, Linking, Text} from 'react-native';

import Splash from '@screens/Splash';
import Login from '@screens/Login';
import FetchLoginInfo from '@src/FetchLoginInfo';

// For async storage...
import AsyncStorage from '@react-native-community/async-storage';


const verifyingUser = () => {
  let returning = false;

  AsyncStorage.getItem('user_id').then((value) => {
    if (value === null) {
      // setStateLogin(true);

    } else {
      returning = true;
    }
  });

  return returning;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialRoute: 'Cuenta', 
      userValidation: false, 
      stateLogin: false,
      userStatus: false,
      infoLogin: []
    };
  }

  
  async componentDidMount(){
    await setTimeout(() => {
      this.verifyingUserIdentity();  
    }, 2000, this);
    
    
  }

  async verifyingUserIdentity(){
    let result = verifyingUser();

    let inf = await FetchLoginInfo();
    
    this.setState({ infoLogin: inf });

    if (result === false) {
      this.setState({
        stateLogin: true, 
        userValidation: true
      });
    }

  }

  render() {
    if (this.state.userValidation === false) {
      return ( <Splash />);
    }
    else if (this.state.stateLogin === true){
      return (
        <Login dataLogin={this.state.infoLogin} {...this.props}/>
      );
    }
    else {
      
      return ( <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Aqui va el react navigation</Text></View>);
      
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
