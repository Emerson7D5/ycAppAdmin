import React, {Component} from 'react';

import {Content, List, ListItem, Body, Text} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import TimeAgo from 'react-native-timeago';
import DateFormat from 'dateformat';
import moment from 'moment';

export default class OrdenesHistorial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {navigate} = this.props.navigation;
    require('moment/locale/es');
    moment.locale('es');

    let content = this.props.dataOrder.map(function (dataContent, index) {
      let fecha = null;

      let screen = 'HistorialOrden';
      let colorTiempo = '';
      let tiempoTranscurrido;

      if (dataContent.order_current_status === 'Delivery Assigned') {
        colorTiempo = '#920B0B';
        tiempoTranscurrido = dataContent.order_delivery_assigned_date;
        fecha = DateFormat(
            dataContent.order_delivery_assigned_date,
            'h:MMTT dd-mm-yyyy',
          );
      }
      if (dataContent.order_current_status === 'Picked Up') {
        colorTiempo = '#0976B2';
        tiempoTranscurrido = dataContent.picked_up_date;
        fecha = DateFormat(
            dataContent.picked_up_date,
            'h:MMTT dd-mm-yyyy',
          );
      }
      if (dataContent.order_current_status === 'Completed') {
        colorTiempo = '#86139A';
        tiempoTranscurrido = dataContent.completed_date;
        fecha = DateFormat(
            dataContent.completed_date,
            'h:MMTT dd-mm-yyyy',
          );
      }

      return (
        <List key={dataContent._id} style={{backgroundColor: '#E6E6E6'}}>
          <ListItem
            keyExtractor={(dataContent) => dataContent._id}
            onPress={() => navigate(screen, {dataContent})}>
            <Body>
              <Grid>
                <Col style={{height: 50}}>
                  <Text style={{marginBottom: 10, fontWeight: 'bold'}}>
                    {' '}
                    {dataContent.user_fullname}{' '}
                  </Text>
                  <Text note>{fecha}</Text>
                </Col>

                <Col style={{height: 50}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 10,
                      fontWeight: 'bold',
                    }}>
                    {dataContent.order_current_status}
                  </Text>

                  <Text
                    note
                    style={{
                      backgroundColor: colorTiempo,
                      borderRadius: 10,
                      color: '#FFF',
                      textAlign: 'center',
                    }}>
                    <TimeAgo time={tiempoTranscurrido} />
                  </Text>
                </Col>
              </Grid>
            </Body>
          </ListItem>
        </List>
      );
    });

    return <Content style={{backgroundColor: '#A3A5A5'}}>{content}</Content>;
  }
}
