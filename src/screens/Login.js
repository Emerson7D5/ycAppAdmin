import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground,
    Dimensions,
    Alert,
    Modal,
} from 'react-native';
import { Button, Spinner } from 'native-base';
import { Block } from 'galio-framework';
//import {seedOne, seedTwo, webApi} from '../constants/utils';

import AsyncStorage from '@react-native-community/async-storage';
//import md5 from 'react-native-md5';
//import {EventRegister} from 'react-native-event-listeners';
import { CommonActions, DefaultNavigatorOptions } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const win = Dimensions.get('window');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            styleError: 'null',
            errorText: '',
            stateModal: false,
            splashModal: true,
            counting: 1,
        };
    }


    onChangeText(input, value) {
        if (input === 'user') {
            this.setState({
                user: value,
            });
        } else {
            this.setState({
                password: value,
            });
        }
    }

    async submitLogin() {
        if (!this.state.user) {
            Alert.alert(
                'Alerta',
                'Por favor ingresa un usuario...',
                [
                    {
                        text: 'Entendido',
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
            return;
        }
        if (!this.state.password) {
            Alert.alert(
                'Alerta',
                'Por favor ingresa una contraseña...',
                [
                    {
                        text: 'Entendido',
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
            return;
        }

        this.setState({
            stateModal: true,
        });

        let pass = seedOne + this.state.password + seedTwo;
        let encryptedPassword = md5.hex_md5(pass);

        let collection = {};

        collection.user_data = this.state.user;
        collection.password_data = encryptedPassword;

        const url = webApi + '/users/checking_user';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(collection),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .catch((error) => console.error('Error:', error))
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson[0][0].validation_exist === 1) {

                    this.loginProcess(responseJson[0][0]);

                } else {
                    this.setState({
                        stateModal: false,
                        styleError: styles.errorTextStyle,
                        errorText: 'Usuario o Contraseña incorrecta.',
                    });
                }
            });
    }

    async loginProcess(values) {
        await AsyncStorage.setItem('user_id', JSON.stringify(values.user_id));
        await AsyncStorage.setItem('user_name', values.user_fullname);
        await AsyncStorage.setItem('user_store', JSON.stringify(values.user_store));
        await AsyncStorage.setItem('user_img', values.user_img);
        await AsyncStorage.setItem('user_account', this.state.user);


        EventRegister.emit('loginCorrectly', true);

        this.setState({
            stateModal: false,
        });
    }

    render() {
        console.log(this.props.dataLogin);
        return (
            <ImageBackground source={require('../img/Login.jpg')} style={styles.image}>
                <View style={styles.mainBody}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View style={styles.box}>
                            <KeyboardAvoidingView enabled>
                                <View style={{
                                    alignItems: 'center', marginBottom: 20, backgroundColor: 'white',
                                    borderRadius: 20
                                }}>
                                    <Block row>
                                        <Text style={{ color: 'darkorange', fontSize: 30, fontWeight: 'bold' }}>Yo</Text>
                                        <Text style={{ color: '#666A66', fontSize: 30, fontWeight: 'bold' }}>Compro</Text>
                                        <Text style={{ color: 'darkorange', fontSize: 30, fontWeight: 'bold' }}>Admin</Text>
                                    </Block>

                                </View>

                                <View style={{ alignItems: 'center' }}>

                                    <Text style={{
                                        color: this.props.dataLogin.storeColor,
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        marginBottom: 10,
                                    }}>Welcome </Text>
                                </View>

                                <View style={styles.SectionStyle}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder={this.props.dataLogin.lblEmail}
                                        placeholderTextColor="darkblue"
                                        autoCapitalize="none"
                                        keyboardType="default"
                                        onChangeText={(val) => this.onChangeText('user', val)}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.SectionStyle}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder={this.props.dataLogin.lblPassword}
                                        autoCapitalize="none"
                                        placeholderTextColor="darkblue"
                                        keyboardType="default"
                                        onChangeText={(val) => this.onChangeText('password', val)}
                                        blurOnSubmit={false}
                                        secureTextEntry={true}
                                    />
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <Text style={this.state.styleError}>
                                        {this.state.errorText}
                                    </Text>
                                </View>

                                <View style={styles.SectionStyleButton}>
                                    <Button
                                        style={styles.buttonStyle}
                                        success
                                        onPress={() => this.submitLogin()}>
                                        <Animatable.Text
                                            animation="pulse"
                                            easing="ease-out"
                                            iterationCount="infinite"
                                            style={{
                                                textAlign: 'center',
                                                fontSize: 20,
                                                color: '#fff',
                                                fontWeight: 'bold',
                                            }}>
                                            {this.props.dataLogin.lblTitle}  &nbsp;
                    </Animatable.Text>
                                    </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                        <Modal
                            transparent={true}
                            visible={this.state.stateModal}
                            alignItems={'center'}>
                            <View style={styles.container}>
                                <Block
                                    style={{
                                        backgroundColor: 'white',
                                        width: 200,
                                        height: 200,
                                        justifyContent: 'center',
                                        borderRadius: 20,
                                    }}>
                                    <Spinner color="#00B4AB" />
                                    <Text
                                        style={{
                                            color: '#00B4AB',
                                            textAlign: 'center',
                                            fontSize: 20,
                                        }}>
                                        Iniciando Sesión...
                  </Text>
                                </Block>
                            </View>
                        </Modal>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 400,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    SectionStyleButton: {
        flexDirection: 'row',
        height: 40,
        marginTop: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        marginBottom: 60,
    },
    buttonStyle: {
        borderColor: 'green',
        borderRadius: 30,
        color: '#FFFFFF',
        flex: 1,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 30,
    },
    buttonTextStyle: {
        color: '#fff',
        fontWeight: 'bold',
        paddingVertical: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    inputStyle: {
        flex: 1,
        color: 'darkblue',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
        backgroundColor: 'white',
        width: 260,
        borderRadius: 20,
        fontWeight: 'bold',
    },
    box: {
        marginTop: win.height / 2 / 2 / 2,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 50,
        marginTop: 5,
        backgroundColor: '#00B4AB',
        borderRadius: 30,
        width: 200,
        textAlign: 'center',
    },
});
