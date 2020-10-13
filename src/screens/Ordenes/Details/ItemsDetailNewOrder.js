import React, { Component } from 'react';

import {
    Content, List, ListItem, Body, Text, 

} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
//import DetalleAddons from './DetalleAddons';

export default class ItemsDetailNewOrder extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { navigate } = this.props.navigation;


        let content = this.props.dataOrder.map(function (dataContent, index) {
            let suma = 0;

            let objeto = [];
            let contenido = [];

            console.log('testing... ', dataContent);

            // objeto = dataContent.detail_item[0].item_addons_selected;

            // objeto.forEach(element => {
            //     suma++;
            //     contenido[suma] = DetalleAddons(element);
            // });

            // let tituloAddons = '';

            // if (suma === 0) {
            //     tituloAddons = 'No addons...';
            // }
            // else {
            //     tituloAddons = 'Addons:';
            // }

            return (

                <List 
                    style={{ backgroundColor: '#E6E6E6' }}
                    key={dataContent._id}
                >
                    <ListItem 
                        keyExtractor={dataContent => dataContent._id}
                        key={index}
                        >
                        <Body>
                            <Grid>
                                <Col style={{ width: 40, alignItems: "center", marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ textAlign: "right", fontWeight: "bold", fontSize: 20 }}>
                                        {dataContent.item_quantity}
                                    </Text>
                                </Col>

                                <Col style={{ marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, }}>
                                        {dataContent.item_name}
                                    </Text>
                                    {/* <Text style={{ fontSize: 15, marginTop: 10 }}> {dataContent.detail_observaciones} </Text> */}
                                    {/* <Text style={{ marginTop: 15, fontWeight: "bold", color: 'darkred', fontSize: 17, marginBottom: 5 }}> {tituloAddons} </Text> */}
                                    {/* <Text>{contenido}</Text> */}
                                </Col>
                            </Grid>
                        </Body>


                    </ListItem>
                </List>
            )
        });

        return (
            <Content style={{ backgroundColor: '#A3A5A5' }}>
                {content}
            </Content>
        )
    }
}

