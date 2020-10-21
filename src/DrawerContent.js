import React from 'react';
import { View, StyleSheet, RefreshControl, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { CommonActions, } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Thumbnail, Spinner, Text, Left, Body, Right } from 'native-base';
import { webApi, domain } from './constants/Utils';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
//import messaging from '@react-native-firebase/messaging';


export default class DrawerContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            estadoTienda: 'Cerrado',
            isLoading: true,
            isChanging: false,
            taskCreated: false,
            isRefreshing: false,
            user_id: null,
            user_name: '',
            user_restaurant: '',
            user_img: '',
            user_email: '',
            user_restaurant_name: '',
            user_image: '',
            numberOfRestaurants: ''
        };
    }



    componentDidMount() {

        this.getData();

        this.listener = EventRegister.addEventListener('reloadDC', () => {
            this.setState({
                isRefreshing: true,
            });

            this.recargar();
        });

    }

    onRefresh = (event) => {
        this.setState({
            isRefreshing: true,
        });

        this.recargar();
    };

    async recargar() {
        await this.getData();

        this.setState({ isRefreshing: false });
    }

    submit(value) {
        let estado_a_enviar;

        if (value === 0) {
            estado_a_enviar = 1;
        } else {
            estado_a_enviar = 0;
        }

        let collection = {};
        collection.id_store = this.state.user_restaurant;
        collection.state = estado_a_enviar;
        collection.user_name = this.state.user_email;

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


        await AsyncStorage.getItem('user_email').then((value) =>
            this.setState({
                user_email: value,
            }),
        );

        await AsyncStorage.getItem('user_img').then((value) => {
            this.setState({
                user_image: value
            });
        });


        await AsyncStorage.getItem('user_restaurant').then((value) => {
            this.setState({
                user_restaurant: value
            });
        });


        await AsyncStorage.getItem('number_of_restaurants').then((value) => {
            this.setState({
                numberOfRestaurants: value
            });
        });

        this.setState({
            isLoading: false,
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


                        //this.deleteToken();

                        EventRegister.emit('logOut', true);

                    },
                },
            ],
            { cancelable: false },
        );
    };

    async deleteToken() {
        // let userToken = '';

        // await messaging()
        //   .getToken()
        //   .then((token) => {
        //     userToken = token;
        //   });

        // let collection = {};
        // collection.id_store = this.state.user_restaurant;
        // collection.token = userToken;

        // const url = webApi + '/manage_store_tokens/delete_token';

        // await fetch(url, {
        //   method: 'POST',
        //   body: JSON.stringify(collection),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })
        //   .catch((error) => console.error('Error:', error))
        //   .then((response) => {
        //     console.log('Token deleted... ');
        //   });
    }

    // This help us to know if the user has a picture or not... 
    // If the user doesn't have a picture, we add one...
    thumbnail() {

        if (this.state.user_image === 'image') {
            return (
                <Thumbnail marginTop={30} large source={require('./img/avatar.jpg')} />
            );
        }
        else {
            let imageUri = domain + '/' + this.state.user_image;
            return (
                <Thumbnail marginTop={30} large
                    source={{ uri: imageUri }} />
            );
        }
    }

    restaurantOption() {
        if (this.state.numberOfRestaurants != '1') {
            return (
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="tasks" color={color} size={size} />
                    )}
                    label="Restaurantes    "
                    onPress={() => {
                        this.props.navigation.navigate('RestaurantsByUser');
                    }}
                />
            );
        }
    }

    contentInDrawer() {
        if (this.state.user_restaurant != 0) {
            return (
                <View style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon name="user-circle" color={color} size={size} />
                        )}
                        label="Cuenta   "
                        onPress={() => {
                            this.props.navigation.navigate('Cuenta');
                        }}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon name="list-alt" color={color} size={size} />
                        )}
                        label="Ordenes   "
                        onPress={() => {
                            this.props.navigation.navigate('Ordenes');
                            //EventRegister.emit('changeTab', 3);
                        }}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon name="dashboard" color={color} size={size} />
                        )}
                        label="Items    "
                        onPress={() => {
                            this.props.navigation.navigate('Items');
                        }}
                    />

                    {this.restaurantOption()}
                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 30,
                        marginBottom: 50,
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#086879'
                    }}>
                        Selecciona un restaurante para ver las opciones...
                    </Text>

                    <Animatable.View
                        animation="pulse"
                        easing="ease"
                        iterationCount="infinite"
                    >
                        <Icons name="sad-tear" style={{ fontSize: 55, marginRight: 20 }} color={'#77D5E5'} />
                    </Animatable.View>
                </View>

            );
        }
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

            return (
                <Animated.View style={{ flex: 1 }}>
                    <DrawerContentScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh}
                            />
                        }>

                        <View style={styles.drawerContent}>
                            <ImageBackground source={require('./img/DrawerContent.jpg')}
                                style={styles.image}>
                                <View style={styles.userInfoSection}>
                                    <View style={{ alignItems: 'center' }}>
                                        {this.thumbnail()}
                                    </View>

                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.userName}>{this.state.user_name}</Text>

                                    </View>

                                    <View style={{ alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: 'lightgreen',
                                                marginTop: 0,
                                                marginBottom: 15
                                            }}>
                                            {this.state.user_email}
                                        </Text>

                                    </View>
                                </View>
                            </ImageBackground>

                            {this.contentInDrawer()}
                        </View>
                    </DrawerContentScrollView>


                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: "center",
                            backgroundColor: "#DC5656",
                            padding: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => this.signOut()}
                    >
                        <Left style={{ minWidth: 125 }}>
                            <Text style={{
                                marginTop: 5,
                                marginBottom: 5,
                                color: 'white',
                                fontWeight: 'bold',
                                marginRight: 20,
                                marginLeft: 20
                            }}>
                                Cerrar Sesión
                            </Text>
                        </Left>

                        <Right>
                            <Icon name="sign-out" style={{ fontSize: 15, marginRight: 20 }} color={'#fff'} />
                        </Right>
                    </TouchableOpacity>

                    {/* <Button
                            danger
                            style={{  justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => this.signOut()}>
                            <Text style={{ fontSize: 10 }}>Cerrar Sesión </Text>
                            <Icon name="sign-out" color={'#fff'} />
                        </Button> */}


                    {/* <View style={styles.statusSection}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.estado}> {this.state.estadoTienda} </Text>

                            <Right>
                                <Switch
                                    marginRight={30}
                                    trackColor={{ false: 'lightgray', true: 'white' }}
                                    thumbColor={true ? 'darkorange' : '#000'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() =>
                                        this.submit(this.state.dataStore[0].store_status)
                                    }
                                    value={this.state.switchValue}
                                />
                            </Right>
                        </View>
                    </View> */}
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
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});
