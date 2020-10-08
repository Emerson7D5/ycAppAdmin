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
import OrdenesAbiertas from './tabs/OrdenesAbiertas';
import OrdenesNuevas from './tabs/OrdenesNuevas';
import OrdenesEnProceso from './tabs/OrdenesEnProceso';
import OrdenesHistorial from './tabs/OrdenesHistorial';

import { webApi } from '../constants/utils';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

export default class Ordenes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataOrder: [],
            dataOrderNew: [],
            isRefreshing: true,
            didUpdate: false,
            is_updated: false,
            initialPageTab: 3,
            user_store: null,
            mounted: false,
        }
    }


    componentDidMount() {

        this.listener = EventRegister.addEventListener('reloadData', (data) => {
            if (this.state.mounted === true) {
                if (data === true) {
                    this.refreshData();
                }
            }

        });

        this.listener = EventRegister.addEventListener('changeTab', (tab) => {
            if (this.state.mounted === true) {
                this.setState({
                    initialPageTab: tab,
                });
            }
        });

        this.getData();
        this.setState({
            isRefreshing: false
        });

        this.setState({
            mounted: true
        })
    }

    onRefresh = (event) => {

        this.setState({
            isRefreshing: true
        });

        this.recargar();
    }

    async recargar() {
        await this.getDataRecord();
        await this.getDataOthers();

        this.setState({ isRefreshing: false, });
    }

    async getData() {
        await this.getDataRecord();
        await this.getDataOthers();

        this.setState({ isLoading: false, });
    }



    // Getting data from Api...
    async getDataRecord() {

        await AsyncStorage.getItem('user_store').then((value) => {
            if (value != null) {
                this.setState({
                    user_store: value,
                });

            }
        });

        return fetch(webApi + '/order_header/headers_record/' + this.state.user_store)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataOrder: responseJson,

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getDataOthers = () => {
        return fetch(webApi + '/order_header/headers/' + this.state.user_store)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataOrderNew: responseJson,

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    async refreshData() {
        this.setState({
            isRefreshing: true
        });

        await this.getDataRecord();
        await this.getDataOthers();

        this.setState({
            isRefreshing: false
        });
    }


    render() {
        const { navigate } = this.props.navigation;

        // Ordenamos los array...
        this.state.dataOrder.sort(function (a, b) {
            return a.order_creation_date > b.order_creation_date;
        });

        this.state.dataOrderNew.sort(function (a, b) {
            return a.order_creation_date > b.order_creation_date;
        });

        if (this.state.isLoading) {
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

                        <Content style={{ backgroundColor: '#A3A5A5' }}>
                            <Tabs style={{ backgroundColor: '#A3A5A5' }}
                                tabBarInactiveTextColor={'#000'}
                                initialPage={this.state.initialPageTab}
                                page={this.state.initialPageTab}
                                onChangeTab={this.changingTab}>

                                <Tab heading="Abiertas"
                                    tabStyle={{ backgroundColor: "#00B4AB" }}
                                    activeTabStyle={{ backgroundColor: "#00B4AB" }}>

                                    <OrdenesAbiertas dataOrder={this.state.dataOrderNew}  {...this.props} />
                                </Tab>

                                <Tab heading="Nuevas"
                                    tabStyle={{ backgroundColor: "#00B4AB", }}
                                    activeTabStyle={{ backgroundColor: "#00B4AB" }}>

                                    <OrdenesNuevas dataOrder={this.state.dataOrderNew} {...this.props} />
                                </Tab>

                                <Tab heading="En Proceso"
                                    tabStyle={{ backgroundColor: "#00B4AB" }}
                                    activeTabStyle={{ backgroundColor: "#00B4AB" }}>

                                    <OrdenesEnProceso dataOrder={this.state.dataOrderNew} {...this.props} />
                                </Tab>

                                <Tab heading="Historial"
                                    tabStyle={{ backgroundColor: "#00B4AB" }}
                                    activeTabStyle={{ backgroundColor: "#00B4AB" }}>

                                    <OrdenesHistorial dataOrder={this.state.dataOrder} {...this.props} />
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

