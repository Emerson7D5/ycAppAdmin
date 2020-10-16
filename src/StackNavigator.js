import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Restaurants from './screens/RestaurantsByUser';
import Ordenes from '@Ordenes/Ordenes';
import NewOrder from '@Details/NewOrder';
import AcceptedOrder from '@Details/AcceptedOrder';
import DeliveryAssigned from '@Details/DeliveryAssigned';
import RecordOrder from '@Details/RecordOrder';
import Cuenta from '@Cuenta/Cuenta';
import DrawerContent from './DrawerContent';

import { EventRegister } from 'react-native-event-listeners';

import Icon from 'react-native-vector-icons/FontAwesome';
import RestaurantsByUser from './screens/RestaurantsByUser';



const OrdenesStack = createStackNavigator();
const RestaurantsByUserStack = createStackNavigator();
const CuentaStack = createStackNavigator();
// const NuevaOrdenStack = createStackNavigator();
// const OrdenCreadaStack = createStackNavigator();
// const ServiciosStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const RestaurantsByUserStackScreen = ({ navigation }) => (
  <RestaurantsByUserStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#021136',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <RestaurantsByUserStack.Screen
      name="RestaurantsByUser"
      component={RestaurantsByUser}
      options={{
        title: 'Restaurantes',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="transparent"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </RestaurantsByUserStack.Navigator>
);

const CuentaStackScreen = ({ navigation }) => (
  <CuentaStack.Navigator
    screenOptions={{
      headerStyle: {

      },

      headerTransparent: true,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <CuentaStack.Screen
      name="Cuenta"
      component={Cuenta}
      options={{
        title: 'Cuenta',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="transparent"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </CuentaStack.Navigator>
);

const OrdenesStackScreen = ({ navigation }) => (
  <OrdenesStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#021136',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <OrdenesStack.Screen
      name="Ordenes"
      component={Ordenes}
      options={{
        title: 'Ordenes',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor={'#021136'}
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
        headerRight: () => (
          <Icon.Button
            name="refresh"
            size={25}
            backgroundColor={null}
            color="#fff"
            onPress={() => {
              EventRegister.emit('reloadTabsData');
            }}></Icon.Button>
        )
      }}
    />

    <OrdenesStack.Screen
      name="NewOrder"
      component={NewOrder}
      options={{
        title: 'New Order',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="transparent"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />

    <OrdenesStack.Screen
      name="AcceptedOrder"
      component={AcceptedOrder}
      options={{
        title: 'Accepted Order',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="transparent"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />

    <OrdenesStack.Screen
      name="DeliveryAssigned"
      component={DeliveryAssigned}
      options={{
        title: 'Delivery Assigned',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="transparent"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />

    <OrdenesStack.Screen
      name="RecordOrder"
      component={RecordOrder}
      options={{
        title: 'Detalle Orden',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="transparent"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />

  </OrdenesStack.Navigator>
);


const StackNavigator = (props) => {
  return (
    <NavigationContainer
    // linking={deepLinking}
    >
      <Drawer.Navigator
        activeBackgroundColor={'#000'}
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName={'Ordenes'}
        drawerContentOptions={{
          activeTintColor: '#000',
          activeBackgroundColor: '#000',
        }}>
        <Drawer.Screen
          name="Cuenta"
          component={CuentaStackScreen}
          {...props}
        />
        <Drawer.Screen name="Ordenes" component={OrdenesStackScreen} />
        <Drawer.Screen name="RestaurantsByUser" component={RestaurantsByUserStackScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;