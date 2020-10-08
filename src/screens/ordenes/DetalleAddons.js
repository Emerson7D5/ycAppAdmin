import React, {  } from 'react';

import {
     ListItem, Text, 
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetalleAddons = (element) => {
    
    return (
        <ListItem
            key={element._id}>
            <Text style={{ textAlign: "center" }}>
                <Icon name="check" style={{ fontSize: 15, marginLeft: 10, color: 'darkred' }}></Icon>
            &nbsp;
            {element.addon_name} 
            </Text>
        </ListItem>


    );

};

export default DetalleAddons;