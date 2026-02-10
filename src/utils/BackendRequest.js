import Axios from "axios";
import { getTokenFromLocalStorage, getRefreshTokenFromLocalStorage, setToken } from './localStorage';

const refreshToken = () => {

    const onSuccess = (response) => {
        setToken(response.data.access);
        return true;
    }

    const onError = (error) => {
        console.log("error in refresh token");
        return false;
    }

    BackendRequest("post", "/token/refresh/", {refresh: getRefreshTokenFromLocalStorage()}, onSuccess, onError)
}

const BackendRequest = (method, actionURL, data, onSuccess, onError) => {

    const ApiUrlBase = "https://api.moderni-zelesice.cz";
    // Assign Action Name
    data = {...data};

    Axios({
        method: method,
        url: ApiUrlBase + actionURL,
        data: data,
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
            'Access-Control-Allow-Origin': "*",
        },
    })
        .then((response) => {
            onSuccess(response)
        })
        .catch((error) => {
            if (error.response !== undefined) {
                if (error.response.status === 401 || error.response.status === 403) {
                    if (refreshToken()) {
                        Axios({
                            method: method,
                            url: ApiUrlBase + actionURL,
                            data: data,
                            headers: {
                                'Content-Type': 'application/json', 
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
                            },
                        })
                            .then((response) => {
                                onSuccess(response)
                            })
                            .catch((error) => {
                                if (error.response !== undefined) {
                                    onError(error.response)
                                }
                            });
                    } else {
                        onError(error.response);
                    }
                }
                else {
                    onError(error.response);
                }
            }
        });

}

export default BackendRequest;