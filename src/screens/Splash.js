import React from 'react';
import { View, Text} from 'react-native';

// To do animatable elements....
import * as Animatable from 'react-native-animatable';

import { Bar } from 'react-native-progress';

import {Block } from 'galio-framework';

const SplashScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.View
                animation="pulse"
                easing="ease"
                iterationCount="infinite"
                style={{
                    marginBottom: 50
                }}>
                <Block row>
                    <Text style={{color: 'darkorange', fontSize: 30, fontWeight: 'bold'}}>Yo</Text>
                    <Text style={{color: '#666A66', fontSize: 30, fontWeight: 'bold'}}>Compro</Text>
                    <Text style={{color: 'darkorange', fontSize: 30, fontWeight: 'bold'}}>Admin</Text>
                </Block>
            </Animatable.View>

            <Bar indeterminate={true} width={150} color={'#60D360'} />

        </View>

        
    );
};
export default SplashScreen;