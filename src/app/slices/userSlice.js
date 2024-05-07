import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    name:"user",
    initialState: {
        credenciales: {},
        isRegistered: false,
    },
    reducers: {
        login: (state,action) => {
            return {
                ...state,
                ...action.payload,
                isRegistered: true,
            }
        },
        logout:(state, action) => {
            return {
                ...state,
                credenciales: "",
                isRegistered: false,
                ...action.payload
            }
        },
        profile: (state, action) => {
            return {
              ...state,
              credenciales: {
                ...state.credenciales,
                email: action.payload.email
            },
              ...action.payload,
            }
        },
        doRegister: (state) =>{
            return {
                ...state,
                isRegistered: true,
            }
        },
        noRegister: (state , action) =>{
            return {
                ...state,
                isRegistered: false,
                error: action.payload
            }
        }
    }
});

export const { login, logout, profile, doRegister, noRegister} = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice;