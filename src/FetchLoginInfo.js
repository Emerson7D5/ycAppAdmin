import {webApi} from './constants/Utils';

async function FetchLoginInfo () {
    let inf = null;

    await fetch(webApi + '/settings')
        .then((response) => response.json())
        .then((responseJson) => {

            inf = responseJson;

        })
        .catch((error) => {
            console.error(error);
        });
    return inf;
}

export default FetchLoginInfo;