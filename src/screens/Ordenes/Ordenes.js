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
import TabNewOrders from './Tabs/TabNewOrders';


import { webApi } from '../../constants/Utils';
//import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';


export default class Ordenes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataOrder: [],
            dataOrderNew: [],
            isRefreshing: false, // poner como true...............................
            didUpdate: false,
            is_updated: false,
            initialPageTab: 3,
            user_store: null,
            mounted: false,
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        // Ordenamos los array...
        // this.state.dataOrder.sort(function (a, b) {
        //     return a.order_creation_date > b.order_creation_date;
        // });

        // this.state.dataOrderNew.sort(function (a, b) {
        //     return a.order_creation_date > b.order_creation_date;
        // });

        if (!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Spinner color='green' />
                    <Text style={{ color: 'white' }}>Cargando Ordenes...</Text>
                </View>
            )
        }

        else {


            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh} />
                        }
                    >

                        <Content style={{ backgroundColor: '#021136' }}>
                            <Tabs style={{ backgroundColor: '#021136' }}
                                tabBarInactiveTextColor={'#fff'}
                                initialPage={this.state.initialPageTab}
                                page={this.state.initialPageTab}
                                onChangeTab={this.changingTab}>

                                <Tab heading="Abiertas"
                                    tabStyle={{ backgroundColor: "#021136" }}
                                    activeTabStyle={{ backgroundColor: "#021136" }}>
                                    
                                    <TabNewOrders {...this.props} />
                                    {/* <OrdenesAbiertas dataOrder={this.state.dataOrderNew}  {...this.props} /> */}
                                </Tab>

                                <Tab heading="Nuevas"
                                    tabStyle={{ backgroundColor: "#021136", }}
                                    activeTabStyle={{ backgroundColor: "#021136" }}>

                                    {/* <OrdenesNuevas dataOrder={this.state.dataOrderNew} {...this.props} /> */}
                                </Tab>

                                <Tab heading="En Proceso"
                                    tabStyle={{ backgroundColor: "#021136" }}
                                    activeTabStyle={{ backgroundColor: "#021136" }}>

                                    {/* <OrdenesEnProceso dataOrder={this.state.dataOrderNew} {...this.props} /> */}
                                </Tab>

                                <Tab heading="Historial"
                                    tabStyle={{ backgroundColor: "#021136" }}
                                    activeTabStyle={{ backgroundColor: "#021136" }}>

                                    {/* <OrdenesHistorial dataOrder={this.state.dataOrder} {...this.props} /> */}
                                </Tab>
                            </Tabs>

                        </Content>


                    </ScrollView>
                </SafeAreaView>

            )

        }
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