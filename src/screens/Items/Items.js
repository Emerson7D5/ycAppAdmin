import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {Text, Spinner, Container, Content, Tabs} from 'native-base';
import {webApi} from '../../constants/Utils';
import {EventRegister} from 'react-native-event-listeners';
//import ItemsData from './servicios/ItemsData';
import AsyncStorage from '@react-native-community/async-storage';

import All_Items from './All_Items';
import ActiveItems from './ActiveItems';
import InactiveItems from './InactiveItems';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {Bar} from 'react-native-progress';

const win = Dimensions.get('window');

const Tab = createBottomTabNavigator();

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      is_changing: false,
      idRestaurant: '',
      dataItems: [],
      dataCategories: [],
    };
  }

  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;

    await this.getCategoriesData();
    await this.getData();

    if (this._isMounted) {
      this.listener = EventRegister.addEventListener(
        'changeStatusItem',
        (data) => {
          if (data.item_status === 1) {
            this.changeItemStatus(data.item_id, 0);
          } else {
            this.changeItemStatus(data.item_id, 1);
          }
        },
      );

      this.listener = EventRegister.addEventListener('refreshItems', () => {
        this.setState({
          isChanging: false,
          isLoading: true,
        });

        this.refreshData();
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getCategoriesData() {
    return fetch(webApi + '/restaurant/item_categories/1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataCategories: responseJson[0],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getData() {
    await AsyncStorage.getItem('user_restaurant').then((value) => {
      this.setState({
        idRestaurant: value,
      });
    });

    return fetch(
      webApi + '/restaurant/items_by_restaurant/' + this.state.idRestaurant,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataItems: responseJson[0],
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // This change the item status...
  async changeItemStatus(itemId, newStatus) {
    //id_item, status
    let collection = {};
    collection.id_item = itemId;
    collection.status = newStatus;

    const url = webApi + '/restaurant/change_item_status';
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
          isLoading: true,
        });

        this.refreshData();
      });
  }

  async refreshData() {
    await this.getCategoriesData();
    await this.getData();

    this.setState({
      isChanging: false,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Bar indeterminate={true} width={150} color={'#60D360'} />
          <Text style={{fontSize: 20, marginTop: 30}}>Cargando Items...</Text>
        </View>
      );
    }
    if (this.state.isChanging) {
      return (
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Spinner color="red" />
          <Text style={{fontSize: 20, marginTop: 30}}>
            Cambiando el estado del Item...
          </Text>
        </View>
      );
    } else {
      return (
        <Container>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Todos') {
                  iconName = focused ? 'list-outline' : 'list-outline';
                }
                if (route.name === 'Activos') {
                  iconName = focused
                    ? 'checkmark-outline'
                    : 'checkmark-outline';
                }
                if (route.name === 'Inactivos') {
                  iconName = focused
                    ? 'alert-circle-outline'
                    : 'alert-circle-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'green',
              inactiveTintColor: 'darkblue',
            }}>
            <Tab.Screen
              name="Todos"
              component={All_Items}
              initialParams={{
                data: this.state.dataItems,
                categories: this.state.dataCategories,
              }}
              {...this.props}
            />
            <Tab.Screen
              name="Activos"
              component={ActiveItems}
              initialParams={{
                data: this.state.dataItems,
                categories: this.state.dataCategories,
              }}
              {...this.props}
            />
            <Tab.Screen
              name="Inactivos"
              component={InactiveItems}
              initialParams={{
                data: this.state.dataItems,
                categories: this.state.dataCategories,
              }}
              {...this.props}
            />
          </Tab.Navigator>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A3A5A5',
  },
  scrollView: {},
});
