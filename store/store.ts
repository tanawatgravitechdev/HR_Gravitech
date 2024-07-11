"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit"

const initialState = {
    stateNewEmployee: "0",
    editEmployee: "",
}

const sampleReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "setStateNewEmployee":
            return {
                ...state,
                stateNewEmployee: action.payload
            }
        case "setEditEmployee":
            return {
                ...state,
                editEmployee: action.payload
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    storage: sampleReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store;