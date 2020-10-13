import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Ordenes from '@Ordenes/Ordenes';
import NuevaOrden from '@Details/NewOrder';
import Cuenta from '@Cuenta/Cuenta';
import DrawerContent from './DrawerContent';

import Icon from 'react-native-vector-icons/FontAwesome';

const OrdenesStack = createStackNavigator();
const CuentaStack = createStackNavigator();
// const NuevaOrdenStack = createStackNavigator();
// const OrdenCreadaStack = createStackNavigator();
// const ServiciosStack = createStackNavigator();

const Drawer = createDrawerNavigator();


const CuentaStackScreen = ({navigation}) => (
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

const OrdenesStackScreen = ({navigation}) => (
    <OrdenesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#021136',
        },
        headerTransparent: true,
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
              backgroundColor={null}
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
                EventRegister.emit('reloadData', true),
                  EventRegister.emit('changeTab', 3);
              }}></Icon.Button>
          ),
        }}
      />
  
      <OrdenesStack.Screen
        name="NuevaOrden"
        component={NuevaOrden}
        options={{
          title: 'Orden Creada',
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
  
      {/*<OrdenesStack.Screen
        name="EnProcesoOrden"
        component={EnProcesoOrden}
        options={{
          title: 'En Proceso',
          headerLeft: () => (
            <Icon.Button
              name="bars"
              size={25}
              backgroundColor="#0D1D41"
              color="#fff"
              onPress={() => {
                navigation.openDrawer();
              }}></Icon.Button>
          ),
        }}
      />
  
      <OrdenesStack.Screen
        name="HistorialOrden"
        component={HistorialOrden}
        options={{
          title: 'Historial',
          headerLeft: () => (
            <Icon.Button
              name="bars"
              size={25}
              backgroundColor="#0D1D41"
              color="#fff"
              onPress={() => {
                navigation.openDrawer();
              }}></Icon.Button>
          ),
        }}
      /> */}
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
            initialRouteName={'Cuenta'}
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
            {/*<Drawer.Screen name="NuevaOrden" component={NuevaOrdenStackScreen} />
            <Drawer.Screen
              name="OrdenCreada"
              component={OrdenCreadaStackScreen}
            />
            <Drawer.Screen name="Servicios" component={ServiciosStackScreen} /> */}
          </Drawer.Navigator>
        </NavigationContainer>
      );
};

export default StackNavigator;