import React, { Component, } from 'react';
import { StyleSheet, View,  Alert, } from "react-native";

import {
    Container, Content, Text,
    Button, Spinner, Footer,

} from 'native-base';
import DateFormat from 'dateformat';
import { Block } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import {webApi} from '../../constants/utils';
import DetalleOrden from './DetalleOrden';
import {EventRegister} from 'react-native-event-listeners'; 
import AsyncStorage from '@react-native-community/async-storage';


export default class EnProcesoOrden extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contenidoOrder: this.props.route.params,
            isLoading: false,
            detail: [],
            isFetching: true,
            dataOrder: [],
            user_id: null, 
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
       
        const { dataContent } = this.props.route.params;
        let idOrder = dataContent._id;

        return fetch(webApi + '/new_order/detail_order/' + idOrder)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataOrder: responseJson[0],
                    isFetching: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    validar(idOrd) {
        Alert.alert(
            "Alerta",
            "¿Desea finalizar Orden?",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Finalizar", onPress: () => this.submit(idOrd) }
            ],
            { cancelable: false }
          );
    }
    

    async submit(idOrd) {

        await AsyncStorage.getItem('user_id').then((value) => {
            if (value != null) {
                this.setState({
                    user_id: value,
                });

            }
        });

        let collection = {};
        collection.id_order = idOrd;
        collection.id_user = this.state.user_id; 

        const url = webApi + '/order_header/finished';
        this.setState({
            isLoading: true,
        });
        
        fetch(url, {
        method: 'POST', 
        body: JSON.stringify(collection), 
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .catch(error => console.error('Error:', error))
        .then(response =>  {
             
            this.setState({
                isLoading: false,
            });

            this.props.navigation.goBack();
            EventRegister.emit('reloadData', true);
            
        });
        
    }


    render() {
       
        const { navigate } = this.props.navigation;

        if (this.state.isFetching){
            return(
                <View style={styles.container}>
                    <Spinner color='green' />
                    <Text>Cargando...</Text>
                </View>
            )
        }
        else if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Spinner color='green' />
                    <Text>Finalizando Pedido...</Text>
                </View>
            )
        }
        else {
            let fecha = DateFormat(this.state.dataOrder.order_creation_date, "h:MMTT dd-mm-yyyy");
            let fechaAceptada = DateFormat(this.state.dataOrder.order_aceptation_date, "h:MMTT dd-mm-yyyy");

            require('moment/locale/es');
            moment.locale('es');
        
            return (
                
                <Container>
                  
                    <Content style={{backgroundColor: '#980000'}}>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 25,
                                fontWeight: 'bold', color: '#fff'
                            }}>
                            {this.state.dataOrder.order_code}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 20,
                                fontWeight: 'bold', color: '#5CFFF1'
                            }}>
                            {this.state.dataOrder.order_user_detail.user_fullname}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 18,
                                fontWeight: 'bold', color: 'white'
                            }}>
                            {this.state.dataOrder.order_user_detail.user_current_address.address_name}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 18,
                                fontWeight: 'bold', color: '#73FF5C', 
                            }}>
                            <Icon name="pencil" style={{ fontSize: 18, marginLeft: 10, color: '#73FF5C' }}></Icon>
                            &nbsp;
                            Creación: {fecha}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 18,
                                fontWeight: 'bold', color: '#FF8E2B'
                            }}>
                            <Icon name="refresh" style={{ fontSize: 18, marginLeft: 10, color: '#FF8E2B' }}></Icon>
                            &nbsp;

                            Aceptación: {fechaAceptada}
                        </Text>

                        <Block row middle>
                            <Text
                                style={{
                                    marginTop: 15, textAlign: "center", fontSize: 20,
                                    fontWeight: 'bold', color: 'white'
                                }}
                            >
                                Tiempo de la Orden: &nbsp;
                                
                            </Text>

                            <Text
                                style={{
                                    marginTop: 15, textAlign: "center", fontSize: 18,
                                    fontWeight: 'bold', borderRadius: 20, backgroundColor: '#0976B2', width: 150
                                }}>
                                    <TimeAgo style={{ color: '#fff', marginLeft: 50}} time={this.state.dataOrder.order_aceptation_date} />
                            </Text>

                            
                        </Block>

                        <Text
                            style={{
                                marginTop: 20, textAlign: "center", fontSize: 23,
                                fontWeight: 'bold', color: 'white',
                            }}>
                            Estado de la Orden En Proceso
                        </Text>

                        <Block row middle space="evenly"
                            style={{ marginTop: 30, paddingBottom: 24 }}>

                            <Button full rounded success style={{ textAlign: "center", }} 
                                onPress={()=> {this.validar(this.state.dataOrder._id)}}
                            >
                                <Icon name="check" style={{ fontSize: 15, marginLeft: 10, color: '#fff' }}></Icon>
                                <Text style={{ textAlign: "center", fontWeight: 'bold' }}>Finalizar Orden</Text>

                            </Button>

                            
                        </Block>
                        <DetalleOrden dataOrder={this.state.dataOrder.order_detail} {...this.props}/>
                        
                    </Content>

                    <Footer transparent style={styles.footer}>
                        
                        <Button warning rounded onPress={() => this.props.navigation.goBack()} style={styles.buttonFooter}>
                            <Icon  name="arrow-left" style={{ color: '#FFF', fontSize: 20, marginLeft: 15 }} />
                            <Text style={{marginRight: 10}}>Regresar</Text>
                        </Button>
                        
                    </Footer>
                        
    
                </Container>

            )
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
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
      footer: {
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
    }, 
    buttonFooter: {
        textAlign: 'center', 
        alignItems: 'center',
        
    }
});