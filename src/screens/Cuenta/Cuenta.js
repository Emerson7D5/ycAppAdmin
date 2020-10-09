import React from 'react';
import {
    StyleSheet,
    Dimensions,
    ImageBackground,
    Image,
    View,
    ScrollView,
    RefreshControl,
    SafeAreaView,
} from 'react-native';

import { Container, Text, Spinner, Button, Footer } from 'native-base';

import { Block, theme } from 'galio-framework';
import { webApi } from '../../constants/Utils';
//import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';
//import messaging from '@react-native-firebase/messaging';

import { Bar } from 'react-native-progress';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const win = Dimensions.get('window');


export default class Cuenta extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataStore: [],
            isRefreshing: false,
            didUpdate: false,
            is_updated: false,
            user_store: null,
            mounted: false,
        };
    }

    componentDidMount() {
        // this.listener = EventRegister.addEventListener('refreshAccount', (data) => {
        //     if (this.state.mounted === true) {
        //         this.onRefresh(true);
        //     }
        // });

        this.getData();
        this.setState({
            isRefreshing: false,
        });


        // messaging().getToken().then(token => {

        //     this.saveTokenToDatabase(token);
        // });

        this.setState({
            mounted: true,
        })

    }

    async saveTokenToDatabase(token) {

        // await AsyncStorage.getItem('user_store').then((value) => {
        //     this.setState({
        //         user_store: value,
        //     });
        // });


        // let collection = {};
        // collection.id_store = this.state.user_store;
        // collection.token = token;


        // const url = webApi + '/manage_store_tokens/save_token';


        // await fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(collection),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .catch(error => console.error('Error:', error))
        //     .then(response => {
        //     });
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

    // Getting data from Api...
    async getData() {
        await AsyncStorage.getItem('user_restaurant').then((value) => {
            this.setState({
                user_store: value,
            });
        });

        return fetch(webApi + '/restaurant/information/' + this.state.user_store)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataStore: responseJson,
                });
                console.log(this.state.dataStore[0]);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        

        const { navigate } = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Bar indeterminate={true} width={150} color={'#60D360'} />

                    <Text style={{fontSize: 20, marginTop: 30}}>Cargando Información...</Text>
                </View>
            );
        } else {
            return (
                <Container>
                    <ImageBackground
                        source={require('../../img/Login.jpg')}
                        style={styles.image}>
                        <SafeAreaView style={styles.container}>
                            <ScrollView
                                contentContainerStyle={styles.scrollView}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }>
                                <Block flex style={styles.profile}>
                                    <Block flex>
                                        <Block flex style={styles.profileCard}>
                                            <Block middle style={styles.avatarContainer}>
                                                <Image
                                                    source={{ uri: 'https://sifu.unileversolutions.com/image/es-MX/recipe-topvisual/2/1260-709/hamburguesa-clasica-50425188.jpg' }}
                                                    style={styles.avatar}
                                                />
                                            </Block>
                                            <Block style={styles.info}>
                                                <Block
                                                    middle
                                                    row
                                                    space="evenly"
                                                    style={{ marginTop: 20, paddingBottom: 24 }}>
                                                    <Button
                                                        rounded
                                                        small
                                                        onPress={() => {
                                                            navigate(
                                                                'Ordenes',
                                                                EventRegister.emit('changeTab', 3),
                                                            ),
                                                                EventRegister.emit('reloadData', true);
                                                        }}>
                                                        <Text>Historial</Text>
                                                    </Button>

                                                    <Button
                                                        rounded
                                                        small
                                                        warning
                                                        onPress={() => {
                                                            navigate('Servicios');
                                                        }}>
                                                        <Text> Servicios</Text>
                                                    </Button>
                                                </Block>

                                                <Block middle row>
                                                    <Block middle>
                                                        <Text
                                                            style={{
                                                                marginBottom: 4,
                                                                fontWeight: 'bold',
                                                                fontSize: 16,
                                                                color: '#525F7F',
                                                                marginRight: 10,
                                                            }}>
                                                            {this.state.dataStore[0][0].ordenes}
                                                        </Text>

                                                        <Text
                                                            style={{
                                                                marginBottom: 4,
                                                                fontWeight: 'bold',
                                                                fontSize: 16,
                                                                color: '#525F7F',
                                                                marginRight: 10,
                                                            }}>
                                                            Ordenes
                                                        </Text>
                                                    </Block>

                                                    <Block middle>
                                                        <Text
                                                            style={{
                                                                marginBottom: 4,
                                                                fontWeight: 'bold',
                                                                fontSize: 16,
                                                                color: '#525F7F',
                                                                marginRight: 10,
                                                            }}>
                                                            {this.state.dataStore[0][0].servicios_activos}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                marginBottom: 4,
                                                                fontWeight: 'bold',
                                                                fontSize: 16,
                                                                color: '#525F7F',
                                                                marginRight: 10,
                                                            }}>
                                                            Servicios
                                                        </Text>
                                                    </Block>

                                                    <Block middle>
                                                        <Text
                                                            style={{
                                                                marginBottom: 4,
                                                                fontWeight: 'bold',
                                                                fontSize: 16,
                                                                color: '#525F7F',
                                                            }}>
                                                            {this.state.dataStore[0][0].servicios_inactivos}
                                                        </Text>

                                                        <Text
                                                            style={{
                                                                marginBottom: 4,
                                                                fontWeight: 'bold',
                                                                fontSize: 16,
                                                                color: '#525F7F',
                                                            }}>
                                                            Ser. Inactivos
                                                        </Text>
                                                    </Block>
                                                </Block>

                                                <Block flex style={{ marginTop: 20 }}>
                                                    <Block middle style={styles.nameInfo}>
                                                        <Text
                                                            bold
                                                            size={28}
                                                            color="#32325D"
                                                            style={{
                                                                fontWeight: 'bold',
                                                                fontSize: 23,
                                                                textAlign: 'center',
                                                                color: '#32325D',
                                                            }}>
                                                            {this.state.dataStore[0][0].store_name}
                                                        </Text>

                                                        <Block
                                                            middle
                                                            style={{ marginTop: -100, marginBottom: 40 }}>
                                                            <Block style={styles.divider} />
                                                        </Block>

                                                        {/* <Text
                                                            style={{
                                                                marginTop: 120,
                                                                textAlign: 'center',
                                                                fontWeight: 'bold',
                                                                fontSize: 16,
                                                                color: '#32325D',
                                                            }}>
                                                            Cuenta: {this.state.dataStore[0][0].store_account}
                                                        </Text> */}
                                                    </Block>

                                                    {/* <Block
                                                        middle
                                                        style={{ marginTop: 10, marginBottom: 10 }}>
                                                        <Text
                                                            style={{
                                                                marginTop: 10,
                                                                fontSize: 16,
                                                                color: '#32325D',
                                                                fontWeight: 'bold',
                                                            }}>
                                                            Sucursal:
                                                        </Text>

                                                        <Text
                                                            style={{
                                                                marginTop: 0,
                                                                fontSize: 16,
                                                                color: '#32325D',
                                                            }}>
                                                            {this.state.dataStore[0][0].store_branch}
                                                        </Text>
                                                    </Block> */}

                                                    <Block middle style={{ marginTop: 10 }}>
                                                        <Text
                                                            style={{
                                                                marginTop: 40,
                                                                fontSize: 16,
                                                                color: '#32325D',
                                                                fontWeight: 'bold',
                                                            }}>
                                                            Direccion:
                                                        </Text>

                                                        <Text style={{ textAlign: 'center' }}>
                                                            {this.state.dataStore[0][0].address}
                                                        </Text>
                                                    </Block>

                                                    {/* <Block middle style={{ marginTop: 30 }}>
                                                        <Text
                                                            style={{
                                                                marginTop: 10,
                                                                fontSize: 16,
                                                                color: '#32325D',
                                                                fontWeight: 'bold',
                                                            }}>
                                                            Telefonos:
                                                        </Text>

                                                        <Text
                                                            style={{
                                                                marginTop: 10,
                                                                fontSize: 16,
                                                                color: '#32325D',
                                                            }}>
                                                            {this.state.dataStore[0][0].store_phone}
                                                        </Text>
                                                    </Block> */}

                                                    <Block
                                                        middle
                                                        style={{ marginTop: 30, marginBottom: 16 }}>
                                                        <Block style={styles.divider} />
                                                    </Block>

                                                    <Block style={{ alignItems: 'center' }}>
                                                        <Text
                                                            style={{
                                                                textAlign: 'center',
                                                                fontSize: 16,
                                                                color: '#525F7F',
                                                                fontWeight: 'bold',
                                                                marginTop: 5,
                                                            }}>
                                                            {this.state.dataStore[0][0].store_description}
                                                        </Text>

                                                        <Block
                                                            middle
                                                            style={{
                                                                marginTop: 30,
                                                                marginBottom: 16,
                                                                alignItems: 'center',
                                                            }}>
                                                            <Block style={styles.divider} />
                                                        </Block>
                                                    </Block>
                                                </Block>
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                            </ScrollView>

                            <Footer
                                style={{
                                    backgroundColor: null,
                                    shadowColor: 'white',
                                    marginTop: 10,
                                }}>
                                <Button
                                    rounded
                                    success
                                    // onPress={() => {
                                    //     navigate('Ordenes', EventRegister.emit('changeTab', 0)),
                                    //         EventRegister.emit('reloadData', true);
                                    // }}
                                    >
                                    <Text style={{ marginLeft: 70, marginRight: 70, fontSize: 20 }}>
                                        TIENDA
                                    </Text>
                                </Button>
                            </Footer>
                        </SafeAreaView>
                    </ImageBackground>
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
      marginTop: 40
    },
    scrollView: {},
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    profile: {
      flex: 1,
    },
    profileContainer: {
      height: height,
      padding: 0,
      zIndex: 1,
    },
    profileBackground: {
      height: height / 2,
    },
    profileCard: {
      padding: theme.SIZES.BASE,
      marginHorizontal: theme.SIZES.BASE,
      marginTop: 75,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      backgroundColor: theme.COLORS.WHITE,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
      shadowOpacity: 0.2,
      zIndex: 2,
    },
    info: {
      paddingHorizontal: 40,
    },
    avatarContainer: {
      position: 'relative',
      marginTop: -80,
    },
    avatar: {
      width: 124,
      height: 124,
      borderRadius: 62,
      borderWidth: 0,
    },
    nameInfo: {
      marginTop: 35,
    },
    divider: {
      width: '90%',
      borderWidth: 1,
      borderColor: '#E9ECEF',
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure,
    },
    createButton: {
      width: width * 0.5,
      marginTop: 25,
      borderRadius: 50,
      backgroundColor: '#00B4AB',
    },
  });
  