import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView, RefreshControl, SafeAreaView, } from 'react-native';
import { Text, Spinner, Content, Tabs, Tab, } from 'native-base';
import { webApi} from '../constants/utils';
import { EventRegister } from 'react-native-event-listeners';
import ItemsData from './servicios/ItemsData';
import AsyncStorage from '@react-native-community/async-storage';

const win = Dimensions.get('window');


export default class Servicios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            itemsData: [],
            itemsCategoryData: [],
            isRefreshing: false,
            didUpdate: false,
            is_updated: false,
            is_changing: false,
            user_store: null, 
            user_id: null,
        }
    }

    async componentDidMount() {

        this.listener = EventRegister.addEventListener('changeStatusItem', (data) => {

            if (data.item_status === 1) {
                this.changeItemStatus(data.item_id, 0);
            }
            else {
                this.changeItemStatus(data.item_id, 1);
            }

        });

        await this.getItemsCategoryData();
        await this.getItemsData();

    }

    onRefresh = (event) => {

        this.setState({
            isRefreshing: true
        });

        this.recargar();
    }

    async recargar() {
        await this.getItemsCategoryData();
        await this.getItemsData();

        this.setState({ isRefreshing: false, });
    }


    getItemsData = () => {
        return fetch(webApi + '/services/info_items/' + this.state.user_store)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    itemsData: responseJson,

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    async getItemsCategoryData () {

        await AsyncStorage.getItem('user_store').then((value) => {
            if (value != null) {
                this.setState({
                    user_store: value,
                });

            }
        });

        return fetch(webApi + '/services/info_category_items/' + this.state.user_store)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    itemsCategoryData: responseJson,

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    async changeItemStatus(itemId, newStatus) {

        await AsyncStorage.getItem('user_id').then((value) => {
            if (value != null) {
                this.setState({
                    user_id: value,
                });

            }
        });

        let collection = {};
        collection.id_item = itemId;
        collection.status_item = newStatus;
        collection.user_updating = this.state.user_id;            

        const url = webApi + '/services/changing_status';
        this.setState({
            isChanging: true,
        });

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(collection),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => console.error('Error:', error))
            .then(response => {

                this.setState({
                    isChanging: false,
                });

                this.onRefresh(true);

                EventRegister.emit('refreshAccount', { nothig: 'nothing' })

            });
    }




    render() {


        if (this.state.isLoading) {
            return (
                <View style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                    <Spinner color='orange' />
                    <Text style={{}}>Cargando Servicios...</Text>
                </View>
            )
        }
        if (this.state.isChanging) {
            return (
                <View style={styles.container}>
                    <Spinner color='red' />
                    <Text>Cambiando el estado del item...</Text>
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
                        <Content>
                            <Tabs style={{ backgroundColor: 'lightgray' }} tabBarInactiveTextColor={'#000'}
                                initialPage={this.state.initialPageTab}>

                                <Tab heading="Todos"
                                    tabStyle={{ backgroundColor: "#00B4AB" }}
                                    activeTabStyle={{ backgroundColor: "#00B4AB" }}>

                                    <ItemsData dataItems={this.state.itemsData}
                                        dataCategoryItems={this.state.itemsCategoryData}
                                        {...this.props}
                                        dimension={win}
                                        filtro={2}
                                    />
                                </Tab>

                                <Tab heading="Activos"
                                    tabStyle={{ backgroundColor: "#00B4AB" }}
                                    activeTabStyle={{ backgroundColor: "#00B4AB" }}>

                                    <ItemsData dataItems={this.state.itemsData}
                                        dataCategoryItems={this.state.itemsCategoryData}
                                        {...this.props}
                                        dimension={win}
                                        filtro={1}
                                    />
                                </Tab>

                                <Tab heading="Inactivos"
                                    tabStyle={{ backgroundColor: "#00B4AB" }}
                                    activeTabStyle={{ backgroundColor: "#00B4AB" }}>

                                    <ItemsData dataItems={this.state.itemsData}
                                        dataCategoryItems={this.state.itemsCategoryData}
                                        {...this.props}
                                        dimension={win}
                                        filtro={0}
                                    />
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A3A5A5',
    },
    scrollView: {


    },
});