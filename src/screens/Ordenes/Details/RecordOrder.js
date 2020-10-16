import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import {
  Container,
  Content,
  Text,
  Button,
  Spinner,
  Footer,
  Picker,
} from 'native-base';
import DateFormat from 'dateformat';
import {Block} from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import {webApi} from '../../../constants/Utils';
import ItemsDetailNewOrder from './ItemsDetailNewOrder';
import {EventRegister} from 'react-native-event-listeners';

import {Bar} from 'react-native-progress';

export default class RecordOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contenidoOrder: this.props.route.params,
      show: false,
      showAccept: false,
      isLoading: false,
      isRejecting: false,
      isFetching: true,
      dataOrder: [],
      user_id: null,
      deliveryData: [],
      selectedDelivery: '0',
      idOrder: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const {dataContent} = await this.props.route.params;

    await this.setState({idOrder: dataContent._id});

    return fetch(webApi + '/order_header/detail_order/' + this.state.idOrder)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataOrder: responseJson,
          isFetching: false,
        });

        console.log('the response json... ', responseJson);
        console.log('');

        this.setState({
          deliveryData: this.state.dataOrder.delivery_data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  lastDate(element) {
    let date = DateFormat(this.state.dataOrder.last_date, 'h:MMTT dd-mm-yyyy');

    let status = 'Completed';

    if (element.current_status === 'Picked Up') {
      status = 'Picked Up';
    }

    return (
      <Text
        style={{
          marginTop: 10,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          color: '#9BDCF0',
        }}>
        <Icon
          name="check"
          style={{
            fontSize: 18,
            marginLeft: 10,
            color: '#9BDCF0',
          }}></Icon>
        &nbsp; {status}: {date}
      </Text>
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    if (this.state.isFetching) {
      return (
        <View style={styles.container}>
          <Bar indeterminate={true} width={150} color={'#60D360'} />
          <Text style={{fontSize: 20, marginTop: 20}}>Cargando...</Text>
        </View>
      );
    } else {
      let creationDate = DateFormat(
        this.state.dataOrder.order_creation_date,
        'h:MMTT dd-mm-yyyy',
      );

      let acceptationDate = DateFormat(
        this.state.dataOrder.order_acceptation_date,
        'h:MMTT dd-mm-yyyy',
      );

      let deliveryAssigned = DateFormat(
        this.state.dataOrder.delivery_assigned_date,
        'h:MMTT dd-mm-yyyy',
      );

      let total = this.state.dataOrder.total_order.toFixed(2);

      require('moment/locale/es');
      moment.locale('es');

      return (
        <Container>
          <Content>
            <View style={{backgroundColor: '#021136'}}>
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#CC5050',
                }}>
                #{this.state.dataOrder.order_code.slice(15)}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {this.state.dataOrder.user_fullname}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'lightblue',
                }}>
                {this.state.dataOrder.address_name}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'orange',
                }}>
                <Icon
                  name="pencil"
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    color: 'orange',
                  }}></Icon>
                &nbsp; Created: {creationDate}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'lightgreen',
                }}>
                <Icon
                  name="tasks"
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    color: 'lightgreen',
                  }}></Icon>
                &nbsp; Accepted: {acceptationDate}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#C2A5F2',
                }}>
                <Icon
                  name="motorcycle"
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    color: '#C2A5F2',
                  }}></Icon>
                &nbsp; Delivery Assigned: {deliveryAssigned}
              </Text>

              {this.lastDate(this.state.dataOrder)}

              <Block middle row>
                <Text
                  style={{
                    marginTop: 15,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Tiempo de la Orden: &nbsp;
                </Text>
                <Text
                  style={{
                    marginTop: 15,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    borderRadius: 20,
                    backgroundColor: 'darkgreen',
                    width: 150,
                  }}>
                  <TimeAgo
                    style={{color: '#fff', marginLeft: 50}}
                    time={this.state.dataOrder.last_date}
                  />
                </Text>
              </Block>

              <Block middle row>
                <Text
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    borderRadius: 20,
                    color: 'white',
                  }}>
                  Estado:{'    '}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    borderRadius: 20,
                    backgroundColor: 'lightgray',
                    width: 150,
                  }}>
                  {this.state.dataOrder.current_status}
                </Text>
              </Block>

              <Block middle row>
                <Text
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    borderRadius: 20,
                    color: 'white',
                    width: 150,
                  }}>
                  Total ${total}
                </Text>
              </Block>

              <Block middle row>
                <Text
                  style={{
                    marginTop: 15,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: 35,
                  }}>
                  Repartidor: {this.state.dataOrder.delivery_guy}
                </Text>
              </Block>

              <ItemsDetailNewOrder
                dataOrder={this.state.dataOrder.items_detail}
                {...this.props}
              />
            </View>
          </Content>

          <Footer transparent style={styles.footer}>
            <Button
              warning
              rounded
              onPress={() => this.props.navigation.goBack()}
              style={styles.buttonFooter}>
              <Icon
                name="arrow-left"
                style={{color: '#FFF', fontSize: 20, marginLeft: 15}}
              />
              <Text style={{marginRight: 10}}>Regresar</Text>
            </Button>
          </Footer>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonFooter: {
    textAlign: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
