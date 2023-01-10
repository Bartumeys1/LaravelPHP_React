export interface IProductItem {
    id: number,
    name: string,
    detail: string,
    created_at: string
  }

  export interface IProductState{
    list: Array<IProductItem>,
    currentProduct: IProductItem | null,
    message: string,
    current_page:number,
  }

  export enum ProductActionTypes {
    PRODUCT_LIST = "PRODUCT_LIST",
    SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT",
    CREATE_PRODUCT = "CREATE_PRODUCT",
    PRODUCT_PAGE = "PRODUCT_PAGE",
  }