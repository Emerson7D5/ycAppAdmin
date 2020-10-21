import React, {Component} from 'react';
import {View, Switch, Image, Dimensions} from 'react-native';
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
  List,
  ListItem,
} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';

import {EventRegister} from 'react-native-event-listeners';

import {domain} from '../../constants/Utils';

import Icon from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('screen');
const win = Dimensions.get('window');

export default class ActiveItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;

    let currentCategory;
    let previousCategory;

    let content = this.props.route.params.data.map(function (
      dataContent,
      index,
    ) {
      let uriImage = domain + dataContent.item_image;
      let newCategory = true;
      let statusItem = true;
      let status = 'Activo';

      let itemPrice = dataContent.item_price.toFixed(2);

      if (dataContent.item_is_active === 1) {
        currentCategory = dataContent.category_name;

        // if (dataContent.item_is_active === 0) {
        //   statusItem = false;
        //   status = 'Inactivo';
        // }

        if (currentCategory != previousCategory) {
          previousCategory = currentCategory;
        } else {
          newCategory = false;
        }
        // if is a new category, add a list item...
        if (newCategory) {
          return (
            <List key={dataContent.item_id}>
              <ListItem
                itemDivider
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'gray',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    color: '#fff',
                  }}>
                  {previousCategory}
                </Text>
              </ListItem>
              <Card
                key={dataContent.item_id}
                style={{marginLeft: 5, marginRight: 5}}>
                <CardItem
                  bordered
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#021136',
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
                  header
                  bordered
                  style={{backgroundColor: 'transparent'}}>
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
                        }}>
                        {dataContent.item_name}
                      </Text>

                      <Text note style={{maxWidth: 250}}>
                        {/* {dataContent.restaurant_address} */}
                      </Text>
                    </View>
                  </Body>
                  <Right style={{borderColor: 'white'}}>
                    <View
                      style={{
                        minWidth: 40,
                        minHeight: 30,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Icon
                        name="money-bill-wave"
                        style={{
                          fontSize: 18,
                          marginRight: 20,
                          color: 'darkgreen',
                        }}
                      />
                      <Text
                        note
                        style={{
                          textAlign: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: 'darkgreen',
                        }}>
                        ${itemPrice}
                      </Text>
                    </View>
                  </Right>
                </CardItem>

                <CardItem
                  bordered
                  style={{
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <Body>
                    <Text style={{fontStyle: 'italic'}}>{status}</Text>
                  </Body>

                  <Right>
                    <Switch
                      trackColor={{false: '#B6B4B4', true: '#B6B4B4'}}
                      thumbColor={true ? '#C60606' : '#00B4AB'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() =>
                        EventRegister.emit('changeStatusItem', {
                          item_id: dataContent.item_id,
                          item_status: dataContent.item_is_active,
                        })
                      }
                      value={statusItem}
                    />
                  </Right>
                </CardItem>
              </Card>
            </List>
          );
        } else {
          return (
            <Card
              key={dataContent.item_id}
              style={{marginLeft: 5, marginRight: 5}}>
              <CardItem
                bordered
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#021136',
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
                header
                bordered
                style={{backgroundColor: 'transparent'}}>
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
                      }}>
                      {dataContent.item_name}
                    </Text>

                    <Text note style={{maxWidth: 250}}>
                      {/* {dataContent.restaurant_address} */}
                    </Text>
                  </View>
                </Body>
                <Right style={{borderColor: 'white'}}>
                  <View
                    style={{
                      minWidth: 40,
                      minHeight: 30,
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name="money-bill-wave"
                      style={{
                        fontSize: 18,
                        marginRight: 20,
                        color: 'darkgreen',
                      }}
                    />
                    <Text
                      note
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: 'darkgreen',
                      }}>
                      ${itemPrice}
                    </Text>
                  </View>
                </Right>
              </CardItem>

              <CardItem
                bordered
                style={{
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                }}>
                <Body>
                  <Text style={{fontStyle: 'italic'}}>{status}</Text>
                </Body>

                <Right>
                  <Switch
                    trackColor={{false: '#B6B4B4', true: '#B6B4B4'}}
                    thumbColor={true ? '#C60606' : '#00B4AB'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      EventRegister.emit('changeStatusItem', {
                        item_id: dataContent.item_id,
                        item_status: dataContent.item_is_active,
                      })
                    }
                    value={statusItem}
                  />
                </Right>
              </CardItem>
            </Card>
          );
        }
      }
    });

    return <Content style={{backgroundColor: '#C3C5C5'}}>{content}</Content>;
  }
}
