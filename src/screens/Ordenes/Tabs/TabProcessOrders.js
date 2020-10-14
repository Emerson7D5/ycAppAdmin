import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
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
  Row,
  Button,
} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import TimeAgo from 'react-native-timeago';
import DateFormat from 'dateformat';
import moment from 'moment';
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('screen');
const win = Dimensions.get('window');

export default class TabProcessOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {navigate} = this.props.navigation;
    require('moment/locale/es');
    moment.locale('es');

    let content = this.props.dataOrder.map(function (dataContent, index) {
      let fecha = DateFormat(
        dataContent.order_creation_date,
        'h:MMTT dd-mm-yyyy',
      );

      let deliveryTime = dataContent.delivery_time;
      let progressBar = 0;
      let colorProgressBar = 'red';

      let acceptationDate = new Date(dataContent.order_acceptation_date);
      let now = new Date();
      let substraction = now - acceptationDate;

      let timeAgo = Math.round(substraction / 60000);

      let availableTime = deliveryTime - timeAgo;

      if (availableTime < 0) {
        availableTime = 0;
        progressBar = 1;
      } else {
        progressBar = (availableTime * 1.0) / deliveryTime;
        progressBar = 1 - progressBar;
        console.log('este es el... ', progressBar);
        colorProgressBar = 'green';
      }

      //   if (availableTime > 0) {
      //     let availableMilis = availableTime * 60000;

      //     test(10);
      //   }

      // testing...

      //   let calc = dateTesting.getTime();

      //   let newCalculo = Math.round(testing / (1000 * 60 * 60 * 24));

      //   console.log('Calculo ', calc, ' ahorita ', now, ' creada ', dateTesting, ' resta', testing);
      //   console.log('new calculo... ', newCalculo);
      console.log(
        'ahora siiiiiiiiiiiii.... ',
        timeAgo,
        ' ',
        deliveryTime,
        ' and... ',
        availableTime,
      );

      if (
        dataContent.order_current_status === 'Order Accepted' ||
        dataContent.order_current_status === 'Delivery Assigned'
      ) {
        let screen = 'AcceptedOrder';
        let colorTime = 'darkgreen';
        let date = dataContent.order_acceptation_date;

        if (dataContent.order_current_status === 'Delivery Assigned') {
          colorTime = 'purple';
          screen = 'DeliveryAssigned';
          date = dataContent.delivery_assigned_date;
        }

        return (
          <TouchableOpacity
            key={dataContent._id}
            onPress={() => navigate(screen, {dataContent})}>
            <Card style={{marginLeft: 5, marginRight: 5}}>
              <CardItem header bordered style={{backgroundColor: colorTime}}>
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
                      minWidth: 140,
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
                      <TimeAgo style={{justifyContent: 'center'}} time={date} />
                    </Text>
                  </View>
                </Right>
              </CardItem>

              <CardItem bordered>
                <Body style={{justifyContent: 'center'}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: win.width - 30,
                    }}>
                    <Grid>
                      <Col></Col>
                      <Col style={{width: 270}}>
                        <Row>
                          <Left>
                            <Text
                              note
                              style={{fontWeight: 'bold', fontSize: 15}}>
                              0 min
                            </Text>
                          </Left>
                          <Right>
                            <Text
                              note
                              style={{fontWeight: 'bold', fontSize: 15}}>
                              {deliveryTime}min
                            </Text>
                          </Right>
                        </Row>
                      </Col>
                      <Col></Col>
                    </Grid>
                    <Progress.Bar
                      progress={progressBar}
                      width={200}
                      height={10}
                      color={colorProgressBar}
                    />
                    <Text
                      note
                      style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginBottom: 15,
                        marginTop: 10,
                      }}>
                      Tiempo Disponible: {availableTime} min
                    </Text>

                    <Grid>
                      <Left></Left>
                      <Body>
                        <Button
                          warning
                          rounded
                          style={{alignItems: 'center', width: 140, alignItems: 'center'}}
                          onPress={() => navigate(screen, {dataContent})}>
                          <Text style={{fontWeight: 'bold'}}>Ver detalle...</Text>
                        </Button>
                      </Body>
                      <Right></Right>
                    </Grid>

                  </View>

                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>

          //   <List key={dataContent._id} style={{backgroundColor: '#E6E6E6'}}>
          //     <ListItem
          //       keyExtractor={(dataContent) => dataContent._id}
          //       onPress={() => navigate(screen, {dataContent})}>
          //       <Body>
          //         <Grid>
          //           <Col style={{height: 50}}>
          //             <Text style={{marginBottom: 10, fontWeight: 'bold'}}>
          //               {' '}
          //               {dataContent.unique_order_id.slice(15)}{' '}
          //             </Text>
          //             <Text note>{fecha}</Text>
          //           </Col>

          //           <Col style={{height: 50}}>
          //             <Text
          //               style={{
          //                 textAlign: 'center',
          //                 marginBottom: 10,
          //                 fontWeight: 'bold',
          //               }}>
          //               {dataContent.order_current_status}
          //             </Text>

          //             <Text
          //               note
          //               style={{
          //                 backgroundColor: colorTiempo,
          //                 borderRadius: 10,
          //                 color: '#FFF',
          //                 textAlign: 'center',
          //               }}>
          //               <TimeAgo time={dataContent.order_acceptation_date} />
          //             </Text>
          //           </Col>
          //         </Grid>
          //       </Body>
          //     </ListItem>
          //   </List>
        );
      }
    });

    return (
      // other color option for header backgroundcolor FE8B1F
      <Content style={{backgroundColor: '#A3A5A5'}}>{content}</Content>
    );
  }
}

const test = (time, isActive) => {
  let interval = null;
  let remainingSeconds = time;

  React.useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        remainingSeconds = remainingSeconds + 1;
      });
    }
  }, [active, remainingSeconds]);
};

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins;
  return {mins, secs};
};
