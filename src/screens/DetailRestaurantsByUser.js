import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    Right,
} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';



export default class ItemsDetailNewOrder extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { navigate } = this.props.navigation;


        let content = this.props.dataRest.map(function (dataContent, index) {



            return (

                <TouchableOpacity
                    key={dataContent.restaurant_id}
                    //onPress={() => navigate(screen, { dataContent })}
                    >
                    <Card style={{ marginLeft: 5, marginRight: 5 }}>
                        <CardItem header bordered style={{ backgroundColor: 'darkorange' }}>
                            <Body>
                                <View style={{ justifyContent: 'center', minHeight: 30 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        #{dataContent.restaurant_id}
                                    </Text>
                                </View>
                            </Body>
                            <Right style={{ borderColor: 'white' }}>
                                <View
                                    style={{
                                        borderColor: 'white',
                                        borderTopWidth: 1,
                                        borderBottomWidth: 1,
                                        borderLeftWidth: 1,
                                        borderRightWidth: 1,
                                        minWidth: 130,
                                        minHeight: 30,
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        note
                                        style={{
                                            color: '#FFF',
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                        }}>
                                        
                                    </Text>
                                </View>
                            </Right>
                        </CardItem>

                        <CardItem bordered>
                            <Body>
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
                                    {dataContent.restaurant_name}
                                </Text>

                            </Body>

                            <Right>
                                <Text note>{dataContent.restaurant_rating}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            )
        });

        return (
            <Content style={{ backgroundColor: '#A3A5A5' }}>
                {content}
            </Content>
        )
    }
}

