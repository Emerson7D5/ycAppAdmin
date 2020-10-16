import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {
  Content,
  List,
  ListItem,
  Body,
  Text,
  Card,
  CardItem,
  Right,
  Left,
} from 'native-base';
import {Col, Grid, Row} from 'react-native-easy-grid';
import TimeAgo from 'react-native-timeago';
import DateFormat from 'dateformat';
import moment from 'moment';

const {width, height} = Dimensions.get('screen');
const win = Dimensions.get('window');

export default class TabRecordOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {navigate} = this.props.navigation;
    require('moment/locale/es');
    moment.locale('es');

    let content = this.props.dataOrder.map(function (dataContent, index) {
      let cont = null;

      let screen = 'RecordOrder';
      let colorTiempo = '';
      let tiempoTranscurrido;
      let driverWord = '';

      if (dataContent.order_current_status === 'Picked Up') {
        colorTiempo = 'darkred';
        tiempoTranscurrido = dataContent.picked_up_date;
        cont = dataContent.delivery_guy;
        driverWord = 'Driver: ';
      }
      if (dataContent.order_current_status === 'Completed') {
        colorTiempo = '#0976B2';
        tiempoTranscurrido = dataContent.completed_date;
        cont = DateFormat(dataContent.completed_date, 'h:MMTT dd-mm-yyyy');
      }

      let totalOrder = dataContent.total_order.toFixed(2);

      return (
        <TouchableOpacity
          key={dataContent._id}
          onPress={() => navigate(screen, {dataContent})}>
          <Card style={{marginLeft: 5, marginRight: 5}}>
            <CardItem header bordered style={{backgroundColor: colorTiempo}}>
              <Body>
                <View style={{justifyContent: 'center', minHeight: 30}}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    #{dataContent.unique_order_id.slice(15)}
                  </Text>
                </View>
              </Body>
              <Right style={{borderColor: 'white'}}>
                <View
                  style={{
                    borderColor: 'white',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    minWidth: 130,
                    minHeight: 30,
                    justifyContent: 'center',
                  }}>
                  <Text
                    note
                    style={{
                      color: '#FFF',
                      textAlign: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}>
                    <TimeAgo
                      style={{justifyContent: 'center'}}
                      time={tiempoTranscurrido}
                    />
                  </Text>
                </View>
              </Right>
            </CardItem>

            <CardItem bordered>
              <Body>
                <Text
                  style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>
                  {dataContent.name}
                </Text>
                <Row>
                  <Text style={{color: 'gray'}}>{driverWord}</Text>
                  <Text style={{fontWeight: 'bold'}}>{cont}</Text>
                </Row>
              </Body>

              <Right>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 100,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    fontSize: 20,
                  }}>
                  ${totalOrder}
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    width: 100,
                    backgroundColor: 'gray',
                    borderRadius: 10,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {dataContent.order_current_status}
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
