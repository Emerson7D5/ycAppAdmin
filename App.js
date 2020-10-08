<<<<<<< HEAD
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>YoComproAdmin</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
=======
import 'react-native-gesture-handler';

//Some elements from react...
import React, {useEffect, useState} from 'react';

// React navigation y navigation drawer
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';

//EvenRegister for update from other screen...
import {EventRegister} from 'react-native-event-listeners';

//Some elements from react-native.
import {StyleSheet, View, Platform, Alert, Linking, Text} from 'react-native';

// Documents...
import DrawerContent from './src/screens/DrawerContent';
import Ordenes from './src/screens/Ordenes';
import NuevaOrden from './src/screens/ordenes/NuevaOrden';
import EnProcesoOrden from './src/screens/ordenes/EnProcesoOrden';
import HistorialOrden from './src/screens/ordenes/HistorialOrden';
import Cuenta from './src/screens/Cuenta';
import Servicios from './src/screens/Servicios';
import OrdenCreada from './src/screens/ordenes/OrdenCreada';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';

// For notifications...
import messaging from '@react-native-firebase/messaging';

// Necessary variables... from other document.
import {webApi, idStore} from './src/constants/utils';

// For async storage...
import AsyncStorage from '@react-native-community/async-storage';

const OrdenesStack = createStackNavigator();
const CuentaStack = createStackNavigator();
const NuevaOrdenStack = createStackNavigator();
const OrdenCreadaStack = createStackNavigator();
const ServiciosStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const OrdenesStackScreen = ({navigation}) => (
  <OrdenesStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#00B4AB',
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
            backgroundColor="#00B4AB"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />

    <OrdenesStack.Screen
      name="EnProcesoOrden"
      component={EnProcesoOrden}
      options={{
        title: 'En Proceso',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="#00B4AB"
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
            backgroundColor="#00B4AB"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </OrdenesStack.Navigator>
);

const NuevaOrdenStackScreen = ({navigation}) => (
  <NuevaOrdenStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#00B4AB',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <NuevaOrdenStack.Screen
      name="NuevaOrden"
      component={NuevaOrden}
      options={{
        title: 'Nueva Orden',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="#00B4AB"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </NuevaOrdenStack.Navigator>
);

const OrdenCreadaStackScreen = ({navigation}) => (
  <OrdenCreadaStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#00B4AB',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <OrdenCreadaStack.Screen
      name="OrdenCreada"
      component={OrdenCreada}
      variable={{varrrr: 'variable dentro...'}}
      options={{
        title: 'Orden Creada',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="#00B4AB"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </OrdenCreadaStack.Navigator>
);

const CuentaStackScreen = ({navigation}) => (
  <CuentaStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#00B4AB',
      },
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
            backgroundColor="#00B4AB"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </CuentaStack.Navigator>
);

const ServiciosStackScreen = ({navigation}) => (
  <ServiciosStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#00B4AB',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ServiciosStack.Screen
      name="Servicios"
      component={Servicios}
      options={{
        title: 'Menú',
        headerLeft: () => (
          <Icon.Button
            name="bars"
            size={25}
            backgroundColor="#00B4AB"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </ServiciosStack.Navigator>
);


async function openNewOrder(url, envio) {
  
  await Linking.openURL(url)
    .catch((err) => console.error(err))
    .then(Linking.openURL(url).catch((err) => console.error(err)));

    await Linking.openURL(url)
    .catch((err) => console.error(err))
    .then(Linking.openURL(url).catch((err) => console.error(err)));

  await EventRegister.emit('reloadOrdenCreada', envio);
}

const App = (props) => {
  const deepLinking = {
    prefixes: ['https://tmproject.com', 'tmproject://'],
    config: {
      OrdenCreada: {
        path: 'OrdenCreada/:envio',
        params: {
          envio: null,
        },
      },
    },
  };

  const [initialRoute, setInitialRoute] = useState('Cuenta');
  const [userValidation, setUserValidation] = useState(false);
  const [stateLogin, setStateLogin] = useState(false);

  // loginCorrectly
  EventRegister.addEventListener('loginCorrectly', (data) => {
    setStateLogin(false);
    setInitialRoute('Cuenta');
  });

  EventRegister.addEventListener('logOut', (data) => {
    setStateLogin(true);
  });

  useEffect(() => {
    setTimeout(
      () => {
        AsyncStorage.getItem('user_id').then((value) => {
          if (value === null) {
            setStateLogin(true);
          } else {
            setInitialRoute('Cuenta');
          }
        });

        setUserValidation(true);
      },
      5000,
      this,
    );

    messaging().onNotificationOpenedApp((remoteMessage) => {
      let conversion = JSON.parse(remoteMessage.data.contenido);
      let envio = remoteMessage.data.contenido;

      const {data} = remoteMessage;
      const prefix =
        Platform.OS === 'android' ? 'tmproject://' : 'tmproject://';
      const url = `${prefix}${data.path}/${conversion}`;

      setInitialRoute('Cuenta');

      EventRegister.emit('reloadOrdenCreada', envio);

      if (remoteMessage.data.path) {
        Linking.openURL(url).catch((err) => console.error(err));
      }

      Linking.openURL(url)
        .catch((err) => console.error(err))
        .then(Linking.openURL(url).catch((err) => console.error(err)));
    });

    // Cuando la aplicacion esta abierta, y el dispositivo se bloquea o suspende...
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (remoteMessage) {
        let conversion = JSON.parse(remoteMessage.data.contenido);
        let envio = remoteMessage.data.contenido;

        const {data} = remoteMessage;
        const prefix =
          Platform.OS === 'android' ? 'tmproject://' : 'tmproject://';
        const url = `${prefix}${data.path}/${conversion}`;

        setInitialRoute('Cuenta');

        EventRegister.emit('reloadOrdenCreada', envio);

        if (remoteMessage.data.path) {
          Linking.openURL(url).catch((err) => console.error(err));
        }

        Linking.openURL(url)
          .catch((err) => console.error(err))
          .then(Linking.openURL(url).catch((err) => console.error(err)));
      }
    });

    // Cuando la aplicacion no ha sido abierta...
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          let conversion = JSON.parse(remoteMessage.data.contenido);
          let envio = remoteMessage.data.contenido;

          const {data} = remoteMessage;
          const prefix =
            Platform.OS === 'android' ? 'tmproject://' : 'tmproject://';
          const url = `${prefix}${data.path}/${conversion}`;

          setStateLogin(false);
          setUserValidation(true);

          openNewOrder(url, envio);
        }

      });
  }, []);


  //Cuando la aplicacion esta abierta y en uso en ese momento.
  messaging().onMessage(async (remoteMessage) => {
    let envio = remoteMessage.data.contenido;
    let conversion = JSON.parse(remoteMessage.data.contenido);
    const {data} = remoteMessage;
    const prefix = Platform.OS === 'android' ? 'tmproject://' : 'tmproject://';
    const url = `${prefix}${data.path}/${conversion}`;

    EventRegister.emit('reloadData', true);

    Alert.alert(
      '¡Pedido nuevo!',
      'Orden No.' + remoteMessage.data.contenido,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'Ver Pedido',
          onPress: () => {
            EventRegister.emit('reloadOrdenCreada', envio);

            if (remoteMessage.data.path) {
              Linking.openURL(url).catch((err) => console.error(err));
            }
            Linking.openURL(url)
              .catch((err) => console.error(err))
              .then(Linking.openURL(url).catch((err) => console.error(err)));
          },
        },
      ],
      {cancelable: false},
    );
  });

  if (userValidation === false) {
    return <Splash />;
  } else if (stateLogin === true) {
    return <Login {...props} />;
  } else {
    return (
      <NavigationContainer linking={deepLinking}>
        <Drawer.Navigator
          activeBackgroundColor={'#000'}
          drawerContent={(props) => <DrawerContent {...props} />}
          initialRouteName={initialRoute}
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
          <Drawer.Screen name="NuevaOrden" component={NuevaOrdenStackScreen} />
          <Drawer.Screen
            name="OrdenCreada"
            component={OrdenCreadaStackScreen}
          />
          <Drawer.Screen name="Servicios" component={ServiciosStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
>>>>>>> 423e92746de6dd702de111b871726560243b6176
