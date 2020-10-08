import React, { Component } from 'react';

import {
    Content, List, ListItem, Body, Text, 

} from 'native-base';
import { Col,  Grid } from 'react-native-easy-grid';
import TimeAgo from 'react-native-timeago';
import DateFormat from 'dateformat';
import moment from 'moment';



export default class OrdenesAbiertas extends Component {

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
            
            //Date is formated...
            let fecha = DateFormat(dataContent.order_creation_date, "h:MMTT dd-mm-yyyy");

            //Verify which status is coming...
            if (dataContent.order_current_status === 'CREADA' || dataContent.order_current_status === 'EN PROCESO') {
                
                let screen = '';
                let colorTiempo = '';

                if (dataContent.order_current_status === 'CREADA') {
                    screen = 'NuevaOrden';
                    colorTiempo = '#2CAB12';
                }

                if (dataContent.order_current_status === 'EN PROCESO') {
                    screen = 'EnProcesoOrden';
                    colorTiempo = '#FF9538';
                }

                return (
                    <List key={dataContent._id}
                        style={{ backgroundColor: '#E6E6E6' }}
                    >
                        <ListItem
                            keyExtractor={dataContent => dataContent._id}
                            onPress={() => navigate(screen, { dataContent })}
                        >

                            <Body>
                                <Grid>
                                    <Col style={{ height: 50 }}>
                                        <Text style={{ marginBottom: 10, fontWeight: 'bold', }}> {dataContent.order_user_detail.user_fullname} </Text>
                                        <Text note>{fecha}</Text>
                                    </Col>

                                    <Col style={{ height: 50,   }}>
                                        <Text style={{ textAlign: "center", marginBottom: 10, fontWeight: 'bold' }}>{dataContent.order_current_status}</Text>

                                        <Text note style={{ backgroundColor: colorTiempo, borderRadius: 10, color: '#FFF', textAlign: "center", }}>
                                            <TimeAgo time={dataContent.order_creation_date} />
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

}//

