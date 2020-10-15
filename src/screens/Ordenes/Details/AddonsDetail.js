import React from 'react';
import {Dimensions} from 'react-native';
import {ListItem, Text, Body, Left, Right} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('screen');
const win = Dimensions.get('window');


const DetalleAddons = (element) => {
  let precio = element.addon_price.toFixed(2);
  return (
    <ListItem key={element._id}>
      <Left>
        <Icon
          name="check"
          style={{fontSize: 15, marginLeft: 10, color: 'darkred'}}></Icon>
      </Left>
      <Body style={{width: 200}}>
        <Text style={{textAlign: 'center'}}>{element.addon_name}</Text>
      </Body>

      <Right>
          <Text>${precio} </Text>
      </Right>
    </ListItem>
  );
};

export default DetalleAddons;
