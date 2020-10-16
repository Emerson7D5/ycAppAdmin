import React, { Component } from 'react';
import {
    View, TouchableOpacity, StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
} from 'react-native';
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

import { Bar } from 'react-native-progress';

import { webApi } from '../constants/Utils';

import AsyncStorage from '@react-native-community/async-storage';
import DetailRestaurantsByUser from './DetailRestaurantsByUser';

export default class RestaurantsByUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            user_id: null,
            dataRestaurants: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        await AsyncStorage.getItem('user_id').then((value) => {
            if (value != null) {
                this.setState({
                    user_id: value,
                });
            }
        });

        return fetch(
            webApi + '/restaurant/all_stores_by_user/' + this.state.user_id,
        )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataRestaurants: responseJson[0],
                    isFetching: false
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { navigate } = this.props.navigation;

        if (this.state.isFetching) {
            return (
                <View style={styles.container}>
                    <Bar indeterminate={true} width={150} color={'#60D360'} />
                    <Text style={{ fontSize: 20, marginTop: 20 }}>Cargando Restaurantes...</Text>
                </View>
            )
        }
        else {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh}
                            />
                        }>
                        <Content style={{ backgroundColor: '#021136' }}>
                            <DetailRestaurantsByUser dataRest={this.state.dataRestaurants} {...this.props}/>
                        </Content>
                    </ScrollView></SafeAreaView>

            );
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     button: {
//         alignItems: 'center',
//         backgroundColor: '#DDDDDD',
//         padding: 10,
//     },
//     footer: {
//         alignItems: 'center',
//         backgroundColor: 'transparent',
//     },
//     buttonFooter: {
//         textAlign: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         flex: 1,
//         resizeMode: 'cover',
//         justifyContent: 'center',
//     },
// });
