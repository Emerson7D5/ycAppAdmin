import React, { Component, } from 'react';
import { StyleSheet, View, Modal,  Alert, TextInput, ImageBackground, } from "react-native";

import {
    Container, Content, Text, Button, Spinner,  Textarea, Footer,

} from 'native-base';
import DateFormat from 'dateformat';
import { Block } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import {webApi} from '../../../constants/Utils';
import ItemsDetailNewOrder from './ItemsDetailNewOrder';
//import {EventRegister} from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { Bar } from 'react-native-progress';

export default class NuevaOrden extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contenidoOrder: this.props.route.params,
            show: false, 
            showAccept: false,
            reason: '',
            tiempo: 0,
            isLoading: false,
            isRejecting: false,
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

        

        return fetch(webApi + '/order_header/detail_new_order/' + idOrder)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataOrder: responseJson,
                    isFetching: false,
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    async submit(idOrd) {

        await AsyncStorage.getItem('user_id').then((value) => {
            if (value != null) {
                this.setState({
                    user_id: value,
                });

            }
        });

        if (this.state.tiempo === 0 ) {
            Alert.alert('Debes de escribir el tiempo de proceso de la orden.');
        } else {
            let collection = {};
            collection.id_order = idOrd;
            collection.id_user = this.state.user_id;
            collection.preparationTime = this.state.tiempo;
            
            const url = webApi + '/order_header/in_process';
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
                    showAccept: false,
                    isLoading: false,
                });

                this.props.navigation.goBack(); 
                EventRegister.emit('changeTab', 0);
                EventRegister.emit('reloadData', true);
            });

        }   
    }

    onChangeText(val) {
        
        this.setState({
            reason: val
        });
    }

    onChangeTiempo(val) {
        
        this.setState({
            tiempo: val
        });

        if(val.trim() === ""){
            this.setState({
                tiempo: 0
            });
        }
        console.log('tiempo... ', this.state.tiempo);
    }

    verify () {        
        
        if (this.state.reason.trim() === "") {
            Alert.alert('Debes de escribir una razón para rechazar la orden.');
        } else {
            this.rechazarOrden(this.state.contenidoOrder.dataContent._id);
        }
    }
    
    async rechazarOrden(idOrd){
        
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
        collection.explanation = this.state.reason;
        

        const url = webApi + '/order_header/rejected';
        this.setState({
            isRejecting: true,
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
            //console.log(response); 
            
            this.setState({
                show: false,
                isRejecting: false,
                
            });

            this.props.navigation.goBack();
            EventRegister.emit('changeTab', 0);
            EventRegister.emit('reloadData', true);
        });

    }

    render() {
        
        
        const { navigate } = this.props.navigation;

        if (this.state.isFetching){
            return(
                <View style={styles.container}>
                    <Bar indeterminate={true} width={150} color={'#60D360'} />
                    <Text style={{fontSize: 20, marginTop: 20}}>Cargando...</Text>
                </View>
            )
        }
        else if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Spinner color='green' />
                    <Text>Aceptando Pedido...</Text>
                </View>
            )
        }
        else if(this.state.isRejecting) {
            return (
                <View style={styles.container}>
                    <Spinner color='red' />
                    <Text>Rechazando Pedido...</Text>
                </View>
            )
        }
        else {
            let fecha = DateFormat(this.state.dataOrder.order_creation_date, "h:MMTT dd-mm-yyyy");
            require('moment/locale/es');
            moment.locale('es');

        
            return (
                
                <Container>
                    
                    <Content>

                        <ImageBackground source={require('../../../img/Azul.jpg')} 
                                style={styles.image}>
                        <Text
                            style={{
                                marginTop: 60, textAlign: "center", fontSize: 18,
                                fontWeight: 'bold', color: '#CC5050'
                            }}>
                            {this.state.dataOrder.order_code}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 22,
                                fontWeight: 'bold', color: 'white'
                            }}>
                            {this.state.dataOrder.user_fullname}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 18,
                                fontWeight: 'bold', color: 'orange'
                            }}>
                            {this.state.dataOrder.address_name}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10, textAlign: "center", fontSize: 18,
                                fontWeight: 'bold', color: 'lightgreen'
                            }}>
                            <Icon name="pencil" style={{ fontSize: 18, marginLeft: 10, color: '#fff' }}></Icon>
                            &nbsp;
                            Creación: {fecha}
                        </Text>

                        <Block middle row>
                            <Text
                                style={{
                                    marginTop: 15, textAlign: "center", fontSize: 18,
                                    fontWeight: 'bold', color: 'white'
                                }}>
                                Tiempo de la Orden: &nbsp;
                                
                            </Text>
                            <Text
                                style={{
                                    marginTop: 15, textAlign: "center", fontSize: 18,
                                    fontWeight: 'bold', borderRadius: 20, backgroundColor: 'darkgreen', width: 150
                                }}>
                                    <TimeAgo style={{ color: '#fff', marginLeft: 50}} time={this.state.dataOrder.order_creation_date} />
                            </Text>

                            
                        </Block>


                        <Block row middle space="evenly"
                            style={{ marginTop: 30, paddingBottom: 24 }}>

                            <Button rounded success style={{ width: 130, textAlign: "center", }} 
                                onPress={()=> {this.setState({showAccept:true})}}
                            >
                                <Icon name="check" style={{ fontSize: 15, marginLeft: 10, color: '#fff' }}></Icon>
                                <Text style={{ textAlign: "center", fontWeight: 'bold' }}>Aceptar</Text>

                            </Button>

                            <Button rounded danger style={{ width: 130, textAlign: "center", }} onPress={()=> {this.setState({show:true})}}>
                                <Icon name="trash" style={{ fontSize: 15, marginLeft: 10, color: '#fff' }}></Icon>
                                <Text style={{ textAlign: "center", fontWeight: 'bold' }}>Cancelar</Text>
                            </Button>
                        </Block>

                        <ItemsDetailNewOrder dataOrder={this.state.dataOrder.items_detail} {...this.props} />
                        {/* <DetalleOrden dataOrder={this.state.dataOrder.order_detail} {...this.props}/> */}
                        </ImageBackground>
                    </Content>

                    {/* <Modal transparent={false} visible={this.state.show} alignItems={'center'}>
                            <View style={{flex:1}}>
                                <View style={{backgroundColor: '#fff',margin:30, padding:10, borderRadius: 20, flex:0.75}}>
                                    <Text style={{fontSize:20, textAlign: "center", color: '#000', fontWeight: "bold", marginTop:5}}>
                                        ¿Desea rechazar esta orden?
                                    </Text>

                                    <Textarea style={{marginTop:20}} rowSpan={2} bordered 
                                        placeholder="Escriba el por qué..." require
                                        onChangeText={(val) => this.onChangeText(val)}
                                        />
                                    
                                    <Button full rounded danger style={{textAlign: "center", marginTop: 20}} 
                                        onPress={() => {this.verify()}}
                                    >
                                        <Icon name="trash" style={{ fontSize: 15, marginLeft: 10, color: '#fff' }}></Icon>
                                        <Text style={{ textAlign: "center", fontWeight: 'bold' }}>Rechazar</Text>

                                    </Button>

                                    <Button full rounded warning style={{ marginLeft:10, textAlign: "center", marginTop:20}}
                                        onPress={()=> {this.setState({show:false})}}>
                                        <Icon name="window-close" style={{ fontSize: 15, marginLeft: 10, color: '#fff' }}></Icon>
                                        <Text style={{ textAlign: "center", fontWeight: 'bold' }}>Cancelar</Text>
                                    </Button>
                                    
                                    
                                </View>
                            </View>
                            
                    </Modal>

                    <Modal transparent={false} visible={this.state.showAccept} alignItems={'center'}>
                            <View style={{flex:1}}>
                                <View style={{backgroundColor: '#fff',margin:30, padding:10, borderRadius: 20, flex:0.75}}>
                                    <Text style={{fontSize:25, textAlign: "center", color: '#000', fontWeight: "bold", marginTop:10, marginBottom: 10}}>
                                        Escriba el tiempo de proceso.
                                    </Text>
                                        
                                        <TextInput keyboardType='numeric'  
                                            onChangeText={(val) => this.onChangeTiempo(val)} 
                                            maxLength={2} placeholder='Escriba el tiempo...'
                                            style={{ height: 50, borderColor: 'gray', borderWidth: 1, textAlign: "center",  borderRadius: 20 }}/>
                                    
                                    
                                    <Button full rounded success style={{textAlign: "center", marginTop: 30}} 
                                        onPress={() => this.submit(this.state.dataOrder._id)}
                                    >
                                        <Icon name="check" style={{ fontSize: 15, marginLeft: 10, color: '#fff' }}></Icon>
                                        <Text style={{ textAlign: "center", fontWeight: 'bold' }}>Aceptar Orden</Text>

                                    </Button>

                                    <Button full rounded warning style={{ marginLeft:10, textAlign: "center", marginTop:20}}
                                        onPress={()=> {this.setState({showAccept:false})}}>
                                        <Icon name="window-close" style={{ fontSize: 15, marginLeft: 10, color: '#fff' }}></Icon>
                                        <Text style={{ textAlign: "center", fontWeight: 'bold' }}>Cancelar</Text>
                                    </Button>
                                    
                                    
                                </View>
                            </View>
                            
                    </Modal> */}

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
        
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});
