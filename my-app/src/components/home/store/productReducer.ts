import { IProductState, ProductActionTypes } from "./type";

const initialState : IProductState={
    list:[],
    currentProduct: null,
    message: "",
};

export const productReducer = (state= initialState , action: any):IProductState =>{

    switch(action.type){
        case ProductActionTypes.PRODUCT_LIST:{
            return{
                ...state, 
                list: [...action.payload]
            }
        }
        case ProductActionTypes.SET_CURRENT_PRODUCT:{
            return{
                ...state, 
               currentProduct: action.payload
            }
        }
        case ProductActionTypes.CREATE_PRODUCT:{
            return{
                ...state, 
                message: action.payload.message
            }
        }
        default:
            return state;
    }
}