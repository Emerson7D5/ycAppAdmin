import React, { Component, useState } from 'react';
import { StyleSheet, View, Modal, ScrollView, TouchableOpacity, Alert, TextInput, } from "react-native";

import {
    Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text,
    Card, CardItem, Tab, Tabs, Button, Spinner, Footer,

} from 'native-base';
import DateFormat from 'dateformat';
import { Block } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import {webApi} from '../../constants/utils';
import DetalleOrden from './DetalleOrden';

export default class HistorialOrden extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contenidoOrder: this.props.route.params,
            isLoading: false,
            isFetching: true,
            dataOrder: [],
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
       
        const { dataContent } = this.props.route.params;
        let idOrder = dataContent._id;
        console.log('paso por aqui...');

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
   
    isOnRoute = (fecha) => {
        
        if(fecha != null){
            fecha = DateFormat(fecha, "h:MMTT dd-mm-yyyy");

            return(
                <View>
                    <Text
                        style={{
                            marginTop: 10, textAlign: "center", fontSize: 18,
                            fontWeight: 'bold', color: '#F33333', 
                        }}>
                        <Icon name="motorcycle" style={{ fontSize: 18, marginLeft: 10, color: '#F33333' }}></Icon>
                        &nbsp;
                        En ruta: {fecha}
                    </Text>
                </View>
            )
        }
        
    }

    isDelivered = (fecha) => {

        
        if(fecha != null){
            fecha = DateFormat(fecha, "h:MMTT dd-mm-yyyy");
            
            return(
                <View alignItems={'center'}>
                    <Text
                        style={{
                            marginTop: 10, textAlign: "center", fontSize: 20,
                            fontWeight: 'bold', color: '#fff', 
                            borderRadius: 10, marginBottom: 10, width: 350, 
                        }}>
                        <Icon name="home" style={{ fontSize: 20, marginLeft: 10, color: '#fff' }}></Icon>
                        &nbsp;
                        Entregado: {fecha}
                    </Text>
                </View>
            )
        }
        
    }

    Fechas = (element) => {
        let fechaCreacion = DateFormat(element.order_creation_date, "h:MMTT dd-mm-yyyy");
        let fechaAceptada = DateFormat(element.order_aceptation_date, "h:MMTT dd-mm-yyyy");
        let fechaFinalizacion = DateFormat(element.order_done_date, "h:MMTT dd-mm-yyyy");

    
        return (
            <View>
                <Text
                    style={{
                        marginTop: 10, textAlign: "center", fontSize: 18,
                        fontWeight: 'bold', color: '#73FF5C', 
                    }}>
                    <Icon name="pencil" style={{ fontSize: 18, marginLeft: 10, color: '#73FF5C' }}></Icon>
                    &nbsp;
                    Creación: {fechaCreacion}
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

                <Text
                    style={{
                        marginTop: 10, textAlign: "center", fontSize: 18,
                        fontWeight: 'bold', color: '#6BC0F0'
                    }}>
                    <Icon name="check" style={{ fontSize: 18, marginLeft: 10, color: '#6BC0F0' }}></Icon>
                    &nbsp;
                    Finalización: {fechaFinalizacion}
                </Text>

                {this.isOnRoute(element.order_checkout_date)}

                {this.isDelivered(element.order_delivery_date)}


            </View>
            
        
    
        );
    
    }

    calcularTiempo(element) {
        let fecha;

        if (element.order_checkout_date === null && element.order_delivery_date === null){
            fecha = element.order_done_date;
        }
        else if (element.order_checkout_date !== null && element.order_delivery_date === null){
            fecha = element.order_checkout_date;
        }
        else if (element.order_checkout_date !== null && element.order_delivery_date !== null){
            fecha = element.order_delivery_date;
        }

        return (
            <Text
                style={{
                    marginTop: 15, textAlign: "center", fontSize: 18,
                    fontWeight: 'bold', borderRadius: 20, backgroundColor: '#0976B2', width: 150
                }}>
                    <TimeAgo style={{ color: '#fff', marginLeft: 50}} time={fecha} />
            </Text>
        )
    }

    render() {
        
        const { navigate } = this.props.navigation;

        
        if (this.state.isFetching){
            return(
                <View style={styles.container}>
                    <Spinner color='orange' />
                    <Text>Cargando...</Text>
                </View>
            )
        }
        else {
            
            require('moment/locale/es');
            moment.locale('es');

            return (
                
                <Container>
                    
                    <Content style={{backgroundColor: '#0A0930'}}>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 25,
                                fontWeight: 'bold', color: '#FFF05C'
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

                        {this.Fechas(this.state.dataOrder)}


                        <Block middle row>
                            <Text
                                style={{
                                    marginTop: 15, textAlign: "center", fontSize: 20,
                                    fontWeight: 'bold', color: 'white',
                                }}>
                                Tiempo de la Orden: &nbsp;
                                
                            </Text>

                            {this.calcularTiempo(this.state.dataOrder)}

                        </Block>

                        <Text
                            style={{
                                marginTop: 20, textAlign: "center", fontSize: 20,
                                fontWeight: 'bold', color: 'green', marginBottom: 20, 
                                backgroundColor: '#fff', borderRadius: 10
                            }}>
                            Estado de la Orden:  {this.state.dataOrder.order_current_status}

                        </Text>
                        
                        
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



