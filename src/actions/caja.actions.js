import { cajaService, crudService } from "../services";
import {toastr} from 'react-redux-toastr'
export const cajaActions = {  
  /*GET*/  
  getListDetalle,
  getItems,
  viewModal,
  getItem,
  setAdd
};

/*---------------------------------------------------------------*/
function setAdd(payload, dato) {  
  return (dispatch) => {
    crudService
      .SET_ADD(payload, dato,'lista')                
      .then((response) => {                                         
        dispatch(ItemGet('CAJAS_ITEMS_DATA', response.result.items));           
        dispatch(ListaPost("CAJAS_ITEM", response.result.item));
        dispatch({type:'CAJAS_ITEMS_RESET_ITEM'})      
        toastr.success(payload, 'Dato creado')     

      })
      .catch((err) => {        
        
      });
  };
}



export function ListaPost(xredux, result) { 
  return {  
    type: xredux,
    response: result
  };
}

/*---------------------------------------------------------------*/
function viewModal(xredux, est) {  
  return (dispatch) => {    
    dispatch({type: xredux, view:est});
  };
}
/*---------------------------------------------------------------*/
function getItems(xredux, payload, pky) {  
  return (dispatch) => {
    cajaService
      .getItems(payload, pky)
      .then((response) => {                                         
          dispatch(ItemGet('CAJAS_ITEM', response.result.cajau));
          dispatch(ItemGet('CAJAS_ITEMS_DATAS', response.result.itemsu));                  
      })
      .catch((err) => {
         
      });
  };
}

/*---------------------------------------------------------------*/
function getListDetalle(xredux, payload, page,num,dato) {  
  return (dispatch) => {
    cajaService
      .getListDetalle(payload, page,num,dato)
      .then((response) => {                                   
        dispatch(ListaGet(xredux, response.result));
      })
      .catch((err) => {
        toastr.error('Error', err)      
        
      });
  };
}

export function ListaGet(xredux, result) {  
 
  return {
    type: xredux,
    response: result
  };
}


function getItem(xredux, payload, pky) {  
  return (dispatch) => {
    crudService
      .GET_ITEM(payload, pky)
      .then((response) => {                                                       
        dispatch(ItemGet('CAJAS_ITEM', response.result.item));
        dispatch(ItemGet('CAJAS_ITEMS_DATA', response.result.items));  
         console.log(response)       
      })
      .catch((err) => {        
        
      });
  };
}

export function ItemGet(xredux, result) {  
  return {
    type: xredux,
    response: result
  };
}