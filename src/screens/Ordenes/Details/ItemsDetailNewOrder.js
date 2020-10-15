import React, { Component } from 'react';

import {
    Content, List, ListItem, Body, Text, 

} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import AddonsDetail from './AddonsDetail';

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


            objeto = dataContent.addons_data;

            objeto.forEach(element => {
                suma++;
                contenido[suma] = AddonsDetail(element);
            });

            let tituloAddons = '';

            if (suma === 0) {
                tituloAddons = 'Sin addons...';
            }
            else {
                tituloAddons = 'Addons:';
            }

            let price = dataContent.item_price.toFixed(2);
            
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
                                    <Text style={{ marginTop: 15, fontWeight: "bold", color: 'darkred', fontSize: 17, marginBottom: 5 }}> {tituloAddons} </Text>
                                    
                                </Col>

                                <Col style={{ width: 80, alignItems: "center", marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ textAlign: "right", fontWeight: "bold", fontSize: 20 }}>
                                        ${price}
                                    </Text>
                                </Col>
                            </Grid>

                            <Text>{contenido}</Text>
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

