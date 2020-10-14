import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
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
import TimeAgo from 'react-native-timeago';
import DateFormat from 'dateformat';
import moment from 'moment';

export default class TabNewOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;
    require('moment/locale/es');
    moment.locale('es');

    let content = this.props.dataOrder.map(function (dataContent, index) {
      let date = DateFormat(
        dataContent.order_creation_date,
        'h:MMTT dd-mm-yyyy',
      );

      if (dataContent.order_current_status === 'Order Placed') {
        let screen = 'NewOrder';
        let colorTiempo = '#2CAB12';

        return (
          <TouchableOpacity
            key={dataContent._id}
            onPress={() => navigate(screen, {dataContent})}>
            <Card style={{marginLeft: 5, marginRight: 5}}>
              <CardItem header bordered style={{backgroundColor: 'darkorange'}}>
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
                        time={dataContent.order_creation_date}
                      />
                    </Text>
                  </View>
                </Right>
              </CardItem>

              <CardItem bordered>
                <Body>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 20, marginBottom: 5}}>
                    {dataContent.name}
                  </Text>
                  
                </Body>

                <Right>
                  <Text note>{date}</Text>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>

          // <List key={dataContent._id} style={{backgroundColor: '#E6E6E6'}}>
          //   <ListItem
          //     keyExtractor={(dataContent) => dataContent._id}
          //     onPress={() => navigate(screen, {dataContent})}>
          //     <Body>

          //       <Grid>
          //         <Col style={{height: 50}}>
          //           <Text style={{marginBottom: 10, fontWeight: 'bold'}}>
          //             {' '}
          //             {dataContent.unique_order_id.slice(15)}{' '}
          //           </Text>
          //           <Text note>{fecha}</Text>
          //         </Col>

          //         <Col style={{height: 50}}>
          //           <Text
          //             style={{
          //               textAlign: 'center',
          //               marginBottom: 10,
          //               fontWeight: 'bold',
          //             }}>
          //             {dataContent.order_current_status}
          //           </Text>

          //           <Text
          //             note
          //             style={{
          //               backgroundColor: colorTiempo,
          //               borderRadius: 10,
          //               color: '#FFF',
          //               textAlign: 'center',
          //             }}>
          //             <TimeAgo time={dataContent.order_creation_date} />
          //           </Text>
          //         </Col>
          //       </Grid>
          //     </Body>
          //   </ListItem>
          // </List>
        );
      }
    });

    return <Content style={{backgroundColor: '#A3A5A5'}}>{content}</Content>;
  }
}
