import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Right,
  Left,
} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';

import {EventRegister} from 'react-native-event-listeners';

import {domain} from '../constants/Utils';

import Icon from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('screen');
const win = Dimensions.get('window');

export default class DetailRestaurantsByUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;

    let content = this.props.dataRest.map(function (dataContent, index) {
      let uriImage = domain + dataContent.restaurant_img;

      return (
        <TouchableOpacity
          key={dataContent.restaurant_id}
          onPress={() => {
            EventRegister.emit('goToOrders', dataContent.restaurant_id);
          }}>
          <Card style={{marginLeft: 5, marginRight: 5}}>
            <CardItem header bordered>
              <Body style={{alignItems: 'flex-start'}}>
                <View
                  style={{
                    minHeight: 50,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: 'orange',
                      fontWeight: 'bold',
                      fontSize: 20,
                      minWidth: 50,
                      marginRight: 10,
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    {dataContent.restaurant_name}
                  </Text>

                  <Text note style={{maxWidth: 250}}>
                    {dataContent.restaurant_address}
                  </Text>
                </View>
              </Body>
              <Right style={{borderColor: 'white'}}>
                <View
                  style={{
                    minWidth: 40,
                    minHeight: 30,
                    justifyContent: 'center',
                  }}>
                  <Text
                    note
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: 'darkgreen',
                    }}>
                    {dataContent.restaurant_rating}{' '}
                    <Icon
                      name="star"
                      style={{
                        fontSize: 18,
                        marginLeft: 10,
                        color: 'darkgreen',
                      }}></Icon>
                  </Text>
                </View>
              </Right>
            </CardItem>

            <CardItem
              bordered
              style={{
                justifyContent: 'center',
                backgroundColor: 'transparent',
                height: 200,
              }}>
              <Image
                style={{width: win.width - 10, height: 200}}
                source={{
                  uri: uriImage,
                }}
              />
            </CardItem>

            <CardItem
              bordered
              style={{
                justifyContent: 'center',
                backgroundColor: 'transparent',
              }}>
              <Body>
                <Text style={{fontStyle: 'italic'}}>
                  {dataContent.restaurant_description}
                </Text>
              </Body>

              <Right>
                <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold'}}>
                  {dataContent.delivery_time}{' '}
                  <Icon
                    name="clock"
                    style={{
                      fontSize: 18,
                      marginLeft: 10,
                      color: 'red',
                    }}></Icon>
                </Text>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
    });

    return <Content style={{backgroundColor: '#A3A5A5'}}>{content}</Content>;
  }
}
