import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';

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
import AsyncStorage from '@react-native-community/async-storage';

import {Bar} from 'react-native-progress';

const {width, height} = Dimensions.get('screen');
const win = Dimensions.get('window');

export default class DeliveryAssigned extends Component {
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

  onValueChange(value) {
    this.setState({
      selectedDelivery: value,
    });
  }

  async getData() {
    const {dataContent} = await this.props.route.params;
    
    await this.setState({idOrder: dataContent._id});

    return fetch(
      webApi + '/order_header/detail_new_order/' + this.state.idOrder,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataOrder: responseJson,
          isFetching: false,
        });

        this.setState({
          deliveryData: this.state.dataOrder.delivery_data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async submit() {
    Alert.alert(
      'Alerta',
      '¿Desea aceptar el pedido?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Aceptar', onPress: () => this.acceptingOrder()},
      ],
      {cancelable: false},
    );
  }

  acceptingOrder() {
    let collection = {};
    let url = '';

    collection.id_order = this.state.idOrder;

    if (this.state.selectedDelivery != 0) {
      collection.id_delivery = this.state.selectedDelivery;
      url = webApi + '/order_header/change_to_delivery_assigned';
    } else {
      url = webApi + '/order_header/change_to_accepted';
    }

    this.setState({
      isLoading: true,
    });

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(collection),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
        Alert.alert(
          'Hubo un error... Verifica tu conexión a internet. Y si no, contacta al administrador.',
        );
      })
      .then((response) => {
        this.setState({
          isLoading: false,
        });

        this.props.navigation.goBack();
        // EventRegister.emit('changeTab', 0);
        EventRegister.emit('reloadTabsData');
      });
  }


  deliveryPicker(value) {
    if (Object.keys(value).length != 0) {
      return value.map((item, index) => {
        let name = item.delivery_name;

        return (
          <Picker.Item
            label={name.toString()}
            value={item.delivery_id.toString()}
            key={index}
          />
        );
      });
    }
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
    } else if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner color="green" />
          <Text>Aceptando Pedido...</Text>
        </View>
      );
    } else if (this.state.isRejecting) {
      return (
        <View style={styles.container}>
          <Spinner color="red" />
          <Text>Cancelando Pedido...</Text>
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
                {this.state.dataOrder.order_code.slice(15)}
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
                  style={{fontSize: 18, marginLeft: 10, color: 'orange'}}></Icon>
                &nbsp; Creación: {creationDate}
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
                  name="check"
                  style={{fontSize: 18, marginLeft: 10, color: 'lightgreen'}}></Icon>
                &nbsp; Aceptada: {acceptationDate}
              </Text>

              

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
                    time={this.state.dataOrder.order_acceptation_date}
                  />
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
