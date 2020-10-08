import React, { Component } from 'react';
import { Switch, } from 'react-native';
import {
    Content, List, ListItem, Body, Text,

} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { EventRegister } from 'react-native-event-listeners';


export default class ItemsData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnabled: [],
        }
    }

    render() {

        let originalWidthSize = this.props.dimension.width;
        let sizeBigWidth = this.props.dimension.width * 0.8;
        let sizeSmallWidth = this.props.dimension.width * 0.2;
        let sizeDescriptionWidth = this.props.dimension.width * 0.6;
        let heightRow = 100;
        let categoriaAnterior;
        let categoriaActual;
        let filtroActual = this.props.filtro;



        const { navigate } = this.props.navigation;

        let content = this.props.dataItems[0].map(function (dataContent, index) {

            let switchStatus = true;

            if (dataContent.item_status === 0) switchStatus = false;

            let nuevaCategoria = false;
            categoriaActual = dataContent.item_category_name;

            let price = dataContent.item_price.toFixed(2);


            // This helps to filter if it is active or not... 
            if (dataContent.item_status == filtroActual) {

                if (categoriaActual != categoriaAnterior) {
                    categoriaAnterior = categoriaActual;

                    nuevaCategoria = true;
                }

                // If it is a new category...
                if (nuevaCategoria == true) {
                    return (
                        <List key={dataContent.item_id} style={{ marginLeft: -18, }}>

                            <ListItem style={{
                                alignItems: 'center', textAlign: 'center', backgroundColor: '#020F3F',
                                width: originalWidthSize, borderBottomWidth: 2,
                            }}>
                                <Body style={{ width: originalWidthSize, alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}> {categoriaAnterior} </Text>
                                </Body>
                            </ListItem>

                            <ListItem style={{ backgroundColor: '#E6E6E6', }}>
                                <Body>
                                    <Grid>
                                        <Col style={{ width: sizeBigWidth, height: heightRow }}>

                                            <Text style={{ fontSize: 18, color: 'orange', fontWeight: 'bold' }}>
                                                {dataContent.item_name}
                                            </Text>


                                            <Text style={{
                                                marginTop: 10, textAlign: 'justify', width: sizeDescriptionWidth, fontSize: 14,
                                                color: '#000'
                                            }}>
                                                {dataContent.item_description}
                                            </Text>

                                        </Col>

                                        <Col style={{ width: sizeSmallWidth, height: heightRow, alignItems: 'center'  }}>
                                            <Text style={{ fontSize: 18, color: 'orange' }}>${price}</Text>

                                            <Switch
                                                marginTop={40}
                                                trackColor={{ false: "#B6B4B4", true: "#B6B4B4" }}
                                                thumbColor={true ? "#00B4AB" : "#00B4AB"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() =>
                                                    EventRegister.emit('changeStatusItem', {item_id: dataContent.item_id, 
                                                        item_status: dataContent.item_status})
                                                }
                                                value={switchStatus}
                                            />
                                        </Col>


                                    </Grid>
                                </Body>
                            </ListItem>
                        </List>
                    )
                }
                // if it is not the same category...
                else {
                    return (
                        <List key={dataContent.item_id} style={{ marginLeft: -18, }}>
                            <ListItem style={{ backgroundColor: '#E6E6E6', borderBottomWidth: 2, }}>
                                <Body>
                                    <Grid>
                                        <Col style={{ width: sizeBigWidth, height: heightRow }}>

                                            <Text style={{ fontSize: 18, color: 'orange', fontWeight: 'bold' }}>
                                                {dataContent.item_name}
                                            </Text>


                                            <Text style={{
                                                marginTop: 10, textAlign: 'justify', width: sizeDescriptionWidth, fontSize: 14,
                                                color: '#000'
                                            }}>
                                                {dataContent.item_description}
                                            </Text>

                                        </Col>

                                        <Col style={{ width: sizeSmallWidth, height: heightRow, alignItems: 'center'  }}>
                                            <Text style={{ fontSize: 18, color: 'orange' }}>${price}</Text>

                                            <Switch
                                                marginTop={40}
                                                trackColor={{ false: "#B6B4B4", true: "#B6B4B4" }}
                                                thumbColor={true ? "#00B4AB" : "#00B4AB"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() =>
                                                    EventRegister.emit('changeStatusItem', {item_id: dataContent.item_id, 
                                                        item_status: dataContent.item_status})
                                                }
                                                value={switchStatus}
                                            />
                                        </Col>

                                       

                                    </Grid>
                                </Body>
                            </ListItem>
                        </List>
                    )
                }

            }
            // This send both categories, doesn´t matter if it is active or not. 
            else if (filtroActual === 2) {

                if (categoriaActual != categoriaAnterior) {
                    categoriaAnterior = categoriaActual;

                    nuevaCategoria = true;
                }

                // If it is a new category...
                if (nuevaCategoria == true) {
                    return (
                        <List key={dataContent.item_id} style={{ marginLeft: -18, }}>

                            <ListItem style={{
                                alignItems: 'center', textAlign: 'center', backgroundColor: '#020F3F',
                                width: originalWidthSize,
                            }}>
                                <Body style={{ width: originalWidthSize, alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}> {categoriaAnterior} </Text>
                                </Body>
                            </ListItem>

                            <ListItem style={{ backgroundColor: '#E6E6E6', borderBottomWidth: 2, }}>
                                <Body>
                                    <Grid>
                                        <Col style={{ width: sizeBigWidth, height: heightRow }}>

                                            <Text style={{ fontSize: 18, color: 'orange', fontWeight: 'bold' }}>
                                                {dataContent.item_name}
                                            </Text>


                                            <Text style={{
                                                marginTop: 10, textAlign: 'justify', width: sizeDescriptionWidth, fontSize: 14,
                                                color: '#000'
                                            }}>
                                                {dataContent.item_description}
                                            </Text>

                                        </Col>

                                        <Col style={{ width: sizeSmallWidth, height: heightRow, alignItems: 'center'  }}>
                                            <Text style={{ fontSize: 18, color: 'orange' }}>${price}</Text>

                                            <Switch
                                                marginTop={40}
                                                trackColor={{ false: "#B6B4B4", true: "#B6B4B4" }}
                                                thumbColor={true ? "#00B4AB" : "#00B4AB"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() =>
                                                    EventRegister.emit('changeStatusItem', {item_id: dataContent.item_id, 
                                                        item_status: dataContent.item_status})
                                                }
                                                value={switchStatus}
                                            />
                                        </Col>

                                       

                                    </Grid>
                                </Body>
                            </ListItem>
                        </List>
                    )
                }
                // If it is not a new category...
                else {
                    return (
                        <List key={dataContent.item_id} style={{ marginLeft: -18, }}>
                            <ListItem style={{ backgroundColor: '#E6E6E6', borderBottomWidth: 2, }}>
                                <Body>
                                    <Grid>
                                        <Col style={{ width: sizeBigWidth, height: heightRow }}>

                                            <Text style={{ fontSize: 18, color: 'orange', fontWeight: 'bold' }}>
                                                {dataContent.item_name}
                                            </Text>


                                            <Text style={{
                                                marginTop: 10, textAlign: 'justify', width: sizeDescriptionWidth, fontSize: 14,
                                                color: '#000'
                                            }}>
                                                {dataContent.item_description}
                                            </Text>

                                        </Col>

                                        <Col style={{ width: sizeSmallWidth, height: heightRow, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 18, color: 'orange' }}>${price}</Text>

                                            <Switch
                                                marginTop={40}
                                                trackColor={{ false: "#B6B4B4", true: "#B6B4B4" }}
                                                thumbColor={true ? "#00B4AB" : "#00B4AB"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() =>
                                                    EventRegister.emit('changeStatusItem', {item_id: dataContent.item_id, 
                                                        item_status: dataContent.item_status})
                                                }
                                                value={switchStatus}
                                            />
                                        </Col>


                                    </Grid>
                                </Body>
                            </ListItem>
                        </List>
                    )
                }
            }


        });


        return (
            <Content style={{ backgroundColor: '#E6E6E6', }}>
                {content}
            </Content>
        )
    }

}