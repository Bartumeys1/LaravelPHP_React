import { IProductState, ProductActionTypes } from "./type";

const initialState : IProductState={
    list:[],
    currentProduct: null,
    message: "",
    current_page:1,
};

export const productReducer = (state= initialState , action: any):IProductState =>{

    switch(action.type){
        case ProductActionTypes.PRODUCT_LIST:{
            return{
                ...state, 
                list: [...action.payload.data]
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
        case ProductActionTypes.PRODUCT_PAGE:{
            return{
                ...state, 
                current_page: action.payload
            }
        }
        default:
            return state;
    }
}