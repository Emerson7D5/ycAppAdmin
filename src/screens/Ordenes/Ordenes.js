import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    SafeAreaView,
} from "react-native";

import {
    Content, Text,
    Tab, Tabs, Spinner,
} from 'native-base';

// Importing documents for tabs. 
import TabNewOrders from '@Tabs/TabNewOrders';
import TabOpenOrders from '@Tabs/TabOpenOrders';
import TabProcessOrders from '@Tabs/TabProcessOrders';
import TabRecordOrders from '@Tabs/TabRecordOrders';


import { webApi } from '../../constants/Utils';
//import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { Bar } from 'react-native-progress';


export default class Ordenes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recordDataOrder: [],
            openDataOrder: [],
            isRefreshing: true,
            didUpdate: false,
            is_updated: false,
            initialPageTab: 3,
            user_store: null,
            mounted: false,
        }
    }

    async componentDidMount() {
        await AsyncStorage.getItem('user_restaurant').then((value) => {
            if (value != null) {
                this.setState({
                    user_store: value,
                });

            }
        });

        await this.getOpenDataOrders();
        await this.getRecordDataOrders();

    }

    onRefresh = (event) => {

        this.setState({
            isRefreshing: true
        });

        this.refreshData();
    }

    async refreshData() {

        await this.getOpenDataOrders();
        await this.getRecordDataOrders();

        this.setState({
            isRefreshing: false
        });
    }

    getOpenDataOrders = () => {
        return fetch(webApi + '/order_header/open_orders/' + this.state.user_store)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    openDataOrder: responseJson[0],
                });


            })
            .catch((error) => {
                console.error(error);
            });
    }

    getRecordDataOrders = () => {
        return fetch(webApi + '/order_header/record_orders/' + this.state.user_store)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    recordDataOrder: responseJson[0],
                    isRefreshing: false,
                });


            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { navigate } = this.props.navigation;




        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh} />
                    }
                >

                    <Content style={{ backgroundColor: '#021136', marginTop: 50 }}>
                        <Tabs style={{ backgroundColor: '#021136' }}
                            tabBarInactiveTextColor={'#fff'}
                            initialPage={this.state.initialPageTab}
                            page={this.state.initialPageTab}
                            onChangeTab={this.changingTab}>

                            <Tab heading="Abiertas"
                                tabStyle={{ backgroundColor: "#021136" }}
                                activeTabStyle={{ backgroundColor: "#021136" }}>

                                <TabOpenOrders dataOrder={this.state.openDataOrder} {...this.props} />

                            </Tab>

                            <Tab heading="Nuevas"
                                tabStyle={{ backgroundColor: "#021136", }}
                                activeTabStyle={{ backgroundColor: "#021136" }}>
                                <TabNewOrders dataOrder={this.state.openDataOrder} {...this.props} />

                            </Tab>

                            <Tab heading="En Proceso"
                                tabStyle={{ backgroundColor: "#021136" }}
                                activeTabStyle={{ backgroundColor: "#021136" }}>

                                <TabProcessOrders dataOrder={this.state.openDataOrder} {...this.props} />
                            </Tab>

                            <Tab heading="Historial"
                                tabStyle={{ backgroundColor: "#021136" }}
                                activeTabStyle={{ backgroundColor: "#021136" }}>

                                <TabRecordOrders dataOrder={this.state.recordDataOrder} {...this.props} />
                            </Tab>
                        </Tabs>

                    </Content>


                </ScrollView>
            </SafeAreaView>

        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A3A5A5',
        alignItems: 'center',
        justifyContent: 'center',
    },
});