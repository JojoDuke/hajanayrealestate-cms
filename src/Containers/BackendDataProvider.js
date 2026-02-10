import React from "react";
/* OWN */
import BackendDataContext from "../Context/BackendDataContext";
import {FETCH_STRUCTURE, backendDataReducer} from "./backendDataReducer";
import {BACKEND_DATA_STRUCTURE} from "./backendDataStructure";


const BackendDataProvider = (props) => {

    const [configState, dispatch] = React.useReducer(backendDataReducer, BACKEND_DATA_STRUCTURE);
    const [initialConfig, setInitialConfig] = React.useState(BACKEND_DATA_STRUCTURE);

    return <BackendDataContext.Provider
        value={{
            initialState: initialConfig,
            currentState: configState,
            dispatch: dispatch,
            setConfigData: (data) => {
                setInitialConfig(data);
                dispatch({
                    type: FETCH_STRUCTURE,
                    config: data,
                })
            },
        }}>
        {props.children}
    </BackendDataContext.Provider>;

}

export default BackendDataProvider;