import React, { Component } from 'react';

import {
    Content, List, ListItem, Body, Text, 

} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import TimeAgo from 'react-native-timeago';
import DateFormat from 'dateformat';
import moment from 'moment';



export default class OrdenesHistorial extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {

        const { navigate } = this.props.navigation;
        require('moment/locale/es');
        moment.locale('es');


        let content = this.props.dataOrder.map(function (dataContent, index) {
            

            let fecha = DateFormat(dataContent.order_creation_date, "h:MMTT dd-mm-yyyy");

            if (dataContent.order_current_status === 'FINALIZADA' || 
                    dataContent.order_current_status === 'EN RUTA' || 
                    dataContent.order_current_status === 'ENTREGADA') 
                {

                let screen = 'HistorialOrden';
                let colorTiempo = '';
                let tiempoTranscurrido;

                if (dataContent.order_current_status === 'FINALIZADA'){
                    colorTiempo= '#920B0B';
                    tiempoTranscurrido = dataContent.order_done_date;
                }
                if (dataContent.order_current_status === 'ENTREGADA'){  
                    colorTiempo= '#0976B2';
                    tiempoTranscurrido = dataContent.order_delivery_date;
                }
                if (dataContent.order_current_status === 'EN RUTA'){ 
                    colorTiempo= '#86139A';
                    tiempoTranscurrido = dataContent.order_checkout_date;
                }


                return (
                    <List key={dataContent._id}
                        style={{ backgroundColor: '#E6E6E6' }} 
                    >
                        <ListItem
                            keyExtractor={dataContent => dataContent._id}
                            onPress={() => navigate(screen, {dataContent})}
                        >

                            <Body>
                                <Grid>
                                    <Col style={{ height: 50 }}>
                                        <Text style={{ marginBottom: 10, fontWeight: 'bold', }}> {dataContent.order_user_detail.user_fullname} </Text>
                                        <Text note>{fecha}</Text>
                                    </Col>

                                    <Col style={{ height: 50 }}>
                                        <Text style={{ textAlign: "center", marginBottom: 10, fontWeight: 'bold' }}>{dataContent.order_current_status}</Text>

                                        <Text note style={{ backgroundColor: colorTiempo, borderRadius: 10, color: '#FFF', textAlign: "center" }}>
                                            <TimeAgo time={tiempoTranscurrido} />
                                        </Text>

                                    </Col>

                                </Grid>

                            </Body>
                        </ListItem>
                    </List>
                )
            }
        })


        return (// other color option for header backgroundcolor FE8B1F
            <Content style={{ backgroundColor: '#A3A5A5' }}>
                {content}

            </Content>
        )


    }

}















