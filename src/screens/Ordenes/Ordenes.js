import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  Content,
  Text,
  Tab,
  Tabs,
  Spinner,
  Button,
  TabHeading,
  Right,
  Body,
  Left,
  Card,
  CardItem,
  Row,
} from 'native-base';

// Importing documents for tabs.
import TabNewOrders from '@Tabs/TabNewOrders';
import TabProcessOrders from '@Tabs/TabProcessOrders';
import TabRecordOrders from '@Tabs/TabRecordOrders';

import {webApi} from '../../constants/Utils';
import {EventRegister} from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import {Bar} from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col} from 'react-native-easy-grid';

import TimeAgo from 'react-native-timeago';
import DateFormat from 'dateformat';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import {timing} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');
const win = Dimensions.get('window');

export default class Ordenes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordDataOrder: [],
      openDataOrder: [],
      isRefreshing: true,
      didUpdate: false,
      is_updated: false,
      initialPageTab: 0,
      user_store: null,
      mounted: false,
      count: 0,
      isCounting: true,
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem('user_restaurant').then((value) => {
      if (value != null) {
        this.setState({
          user_store: value,
        });
      }
    });

    await this.getOpenDataOrders();
    await this.getRecordDataOrders();

    this.setState({mounted: true});

    this.listener = EventRegister.addEventListener('reloadTabsData', () => {
      if (this.state.mounted === true) {
        this.setState({
          isRefreshing: true,
        });

        this.refreshData();
      }
    });

    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
      
    }, 60000);
  }

  onRefresh = (event) => {
    this.setState({
      isRefreshing: true,
    });

    this.refreshData();
  };

  async refreshData() {
    await this.getOpenDataOrders();
    await this.getRecordDataOrders();

    this.setState({
      isRefreshing: false,
    });
  }

  getOpenDataOrders = () => {
    return fetch(webApi + '/order_header/open_orders/' + this.state.user_store)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          openDataOrder: responseJson[0],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getRecordDataOrders = () => {
    return fetch(
      webApi + '/order_header/record_orders/' + this.state.user_store,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          recordDataOrder: responseJson[0],
          isRefreshing: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fillingProcessTab = (data) => {
    return data.map(function (dataContent, index) {
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

      let condition = true;

      if (availableTime < 0) {
        availableTime = 0;
        progressBar = 1;
        condition = false;
      } else {
        progressBar = (availableTime * 1.0) / deliveryTime;
        progressBar = 1 - progressBar;
        //console.log('este es el progressBar... ', progressBar);
        colorProgressBar = 'green';
      }

      // console.log(
      //   'ahora siiiiiiiiiiiii.... ',
      //   timeAgo,
      //   ' ',
      //   deliveryTime,
      //   ' and... ',
      //   availableTime,
      // );

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
                  <View
                    style={{
                      justifyContent: 'center',
                      minHeight: 30,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
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
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                              }}>
                              0 min
                            </Text>
                          </Left>
                          <Right>
                            <Text
                              note
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                              }}>
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
                          style={{
                            alignItems: 'center',
                            width: 140,
                            alignItems: 'center',
                          }}
                          onPress={() => navigate(screen, {dataContent})}>
                          <Text style={{fontWeight: 'bold'}}>
                            Ver detalle...
                          </Text>
                        </Button>
                      </Body>
                      <Right></Right>
                    </Grid>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      }
    });
  };

  render() {
    const {navigate} = this.props.navigation;
    require('moment/locale/es');
    moment.locale('es');

    // Ordenamos los array...
    this.state.openDataOrder.sort(function (a, b) {
      return a.order_creation_date > b.order_creation_date;
    });

    // this.state.dataOrderNew.sort(function (a, b) {
    //   return a.order_creation_date > b.order_creation_date;
    // });

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <Content style={{backgroundColor: '#021136'}}>
            <Tabs
              style={{backgroundColor: '#021136'}}
              tabBarInactiveTextColor={'#fff'}
              initialPage={this.state.initialPageTab}
              onChangeTab={this.changingTab}>
              <Tab
                heading={
                  <TabHeading style={{backgroundColor: '#021136'}}>
                    <Icon name="bell" color={'white'} />
                    <Text>Nuevas</Text>
                  </TabHeading>
                }>
                <TabNewOrders
                  dataOrder={this.state.openDataOrder}
                  {...this.props}
                />
              </Tab>

              <Tab
                heading={
                  <TabHeading style={{backgroundColor: '#021136'}}>
                    <Icon name="tasks" color={'white'} />
                    <Text>En Proceso</Text>
                  </TabHeading>
                }>
                <TabProcessOrders
                  dataOrder={this.state.openDataOrder}
                  {...this.props}
                />
              </Tab>

              <Tab
                heading={
                  <TabHeading style={{backgroundColor: '#021136'}}>
                    <Icon name="book" color={'white'} />
                    <Text>Historial</Text>
                  </TabHeading>
                }>
                <TabRecordOrders
                  dataOrder={this.state.recordDataOrder}
                  {...this.props}
                />
              </Tab>
            </Tabs>
          </Content>
        </ScrollView>
      </SafeAreaView>
    );
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
