import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Right,
} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';

import {Bar} from 'react-native-progress';

import {webApi} from '../constants/Utils';

import AsyncStorage from '@react-native-community/async-storage';
import DetailRestaurantsByUser from './DetailRestaurantsByUser';

import {EventRegister} from 'react-native-event-listeners';


const win = Dimensions.get('window');

export default class RestaurantsByUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      user_id: null,
      dataRestaurants: [],
      countingTimes: 0
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem('user_id').then((value) => {
      this.setState({
        user_id: value,
      });
    });

    await this.getData();

    
    // This is called from DetailRestaurantByUser, helping to go to Orders.
    this.listener = EventRegister.addEventListener(
      'goToOrders',
      (restaurantId) => {
        if(this.state.countingTimes === 0){
            this.goToOrders(restaurantId);
            console.log('paso por event register en restaurantsbyuser.js');
            this.setState({countingTimes: this.state.countingTimes + 1});
        }
        else {
            EventRegister.emit('reloadDataDrawerContent', true);
            EventRegister.emit('newOrder_Orders', restaurantId);
            
            this.goToOrders(restaurantId);
        }
      },
    );

    
  }

  async goToOrders(restaurantId) {
      
    await AsyncStorage.setItem('user_restaurant', JSON.stringify(restaurantId));
    //console.log()
    this.props.navigation.navigate('Ordenes', {parameter: 2020});
  }

  async getData() {
    return fetch(
      webApi + '/restaurant/all_stores_by_user/' + this.state.user_id,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataRestaurants: responseJson[0],
        });
        this.restaurantProcess(responseJson[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async restaurantProcess(elements) {
    let count = 0;
    await elements.forEach((element) => {
      count++;
    });

    console.log(JSON.stringify(elements));

    // if (count === 1) {
    //   await this.goToOrders(elements[0].restaurant_id);
    // }

    this.setState({
      isFetching: false,
    });
  }

  render() {
    const {navigate} = this.props.navigation;

    if (this.state.isFetching) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: win.width -20}}>
          <Bar indeterminate={true} width={150} color={'#60D360'} />
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              marginRight: 20,
              marginLeft: 20,
              textAlign: 'center'
            }}>
            Verificando información de Restaurantes...
          </Text>
        </View>
      );
    } else {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#A3A5A5',
          }}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            }>
            <Content style={{backgroundColor: '#021136'}}>
              <DetailRestaurantsByUser
                dataRest={this.state.dataRestaurants}
                {...this.props}
              />
            </Content>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3A5A5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     button: {
//         alignItems: 'center',
//         backgroundColor: '#DDDDDD',
//         padding: 10,
//     },
//     footer: {
//         alignItems: 'center',
//         backgroundColor: 'transparent',
//     },
//     buttonFooter: {
//         textAlign: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         flex: 1,
//         resizeMode: 'cover',
//         justifyContent: 'center',
//     },
// });
