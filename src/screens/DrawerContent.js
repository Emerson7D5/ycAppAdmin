import React from 'react';
import {View, StyleSheet, Alert, Switch, RefreshControl} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {CommonActions,} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Right} from 'native-base';
import {Thumbnail, Spinner, Text, Button} from 'native-base';
import {webApi} from '../constants/utils';
import {EventRegister} from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      estadoTienda: 'Cerrado',
      dataStore: [],
      isLoading: true,
      isChanging: false,
      taskCreated: false,
      isRefreshing: false,
      user_id: null,
      user_name: '',
      user_store: null,
      user_img: '',
      user_account: '',
    };
  }

  componentDidMount() {
  
    this.getData();
  }

  onRefresh = (event) => {
    this.setState({
      isRefreshing: true,
    });

    this.recargar();
  };

  async recargar() {
    await this.getData();

    this.setState({isRefreshing: false});
  }

  submit(value) {
    let estado_a_enviar;

    if (value === 0) {
      estado_a_enviar = 1;
    } else {
      estado_a_enviar = 0;
    }

    let collection = {};
    collection.id_store = this.state.user_store;
    collection.state = estado_a_enviar;
    collection.user_name = this.state.user_account;

    const url = webApi + '/order_header/change_store_status';
    this.setState({
      isChanging: true,
    });

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(collection),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        this.setState({
          isChanging: false,
        });

        this.getData();
      });
  }

  async getData() {
    await AsyncStorage.getItem('user_name').then((value) =>
      this.setState({
        user_name: value,
      }),
    );

    await AsyncStorage.getItem('user_img').then((value) =>
      this.setState({
        user_img: value,
      }),
    );

    await AsyncStorage.getItem('user_account').then((value) =>
      this.setState({
        user_account: value,
      }),
    );

    await AsyncStorage.getItem('user_store').then((value) => {
      if (value != null) {
        this.setState({
          user_store: value,
        });

        this.getApiData(this.state.user_store);
      }
    });
  }

  getApiData(idStore) {
    return fetch(webApi + '/order_header/info_store/' + idStore)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataStore: responseJson,
        });

        if (this.state.dataStore[0].store_status == 1) {
          this.setState({switchValue: true, estadoTienda: 'Disponible'});
        } else {
          this.setState({switchValue: false, estadoTienda: 'No Disponible'});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  signOut = () => {
    Alert.alert(
      'Alerta',
      '¿Deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            AsyncStorage.clear();
           

            this.deleteToken();

            EventRegister.emit('logOut', true);
            
          },
        },
      ],
      {cancelable: false},
    );
  };

  async deleteToken() {
    let userToken = '';

    await messaging()
      .getToken()
      .then((token) => {
        userToken = token;
      });

    let collection = {};
    collection.id_store = this.state.user_store;
    collection.token = userToken;

    const url = webApi + '/manage_store_tokens/delete_token';

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(collection),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        console.log('Token deleted... ');
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner color="blue" />
          <Text>Cargando Menú...</Text>
        </View>
      );
    } else if (this.state.isChanging) {
      return (
        <View style={styles.container}>
          <Spinner color="blue" />
          <Text>Cambiando de estado...</Text>
        </View>
      );
    } else {
      const imageUri = this.state.user_img;
      //console.log(this.state.dataStore);

      return (
        <Animated.View style={{flex: 1}}>
          <DrawerContentScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            }>
            <View style={styles.drawerContent}>
              <View style={styles.userInfoSection}>
                <View style={{alignItems: 'center'}}>
                  <Thumbnail marginTop={30} large source={{uri: imageUri}} />
                </View>

                <View style={{alignItems: 'center'}}>
                  <Text style={styles.userName}>{this.state.user_name}</Text>

                  <Text style={styles.titleRestaurant}>
                    {this.state.dataStore[0].store_name}
                  </Text>
                </View>

                <View style={{}}>
                  <Button
                    rounded
                    danger
                    style={{width: 140, height: 25, marginBottom: 10}}
                    onPress={() => this.signOut()}>
                    <Text style={{fontSize: 10}}>Cerrar Sesión </Text>
                    <Icon name="sign-out" color={'#fff'} />
                  </Button>
                </View>
              </View>

              <View style={styles.bottomDrawerSection}>
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="user-circle" color={color} size={size} />
                  )}
                  label="Cuenta   "
                  onPress={() => {
                    this.props.navigation.navigate('Cuenta');
                  }}
                />

                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="list-alt" color={color} size={size} />
                  )}
                  label="Archivo Ordenes   "
                  onPress={() => {
                    this.props.navigation.navigate('Ordenes');
                    EventRegister.emit('changeTab', 3);
                  }}
                />

                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="dashboard" color={color} size={size} />
                  )}
                  label="Menú    "
                  onPress={() => {
                    this.props.navigation.navigate('Servicios');
                  }}
                />
              </View>
            </View>
          </DrawerContentScrollView>

          <View style={styles.statusSection}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.estado}> {this.state.estadoTienda} </Text>

              <Right>
                <Switch
                  marginRight={30}
                  trackColor={{false: 'lightgray', true: 'white'}}
                  thumbColor={true ? 'darkorange' : '#000'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() =>
                    this.submit(this.state.dataStore[0].store_status)
                  }
                  value={this.state.switchValue}
                />
              </Right>
            </View>
          </View>
        </Animated.View>
      );
    }
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: -10,
  },
  userInfoSection: {
    backgroundColor: '#0A0930',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  statusSection: {
    marginBottom: 0,
    backgroundColor: '#00B4AB',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  titleRestaurant: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'orange',
    marginBottom: 20,
  },
  block: {
    marginBottom: 20,
  },
  userName: {
    marginBottom: 5,
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  estado: {
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
  },
});
