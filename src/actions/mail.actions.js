import { crudService } from "../services";
import {toastr} from 'react-redux-toastr'
export const mailActions = {        
  SEND_MAIL
};

function SEND_MAIL(payload, pky) {  
    return (dispatch) => {
      dispatch({type:'SET_LOADING',state:true})
      crudService
        .SEND_MAIL(payload,pky)
        .then((response) => {         
          toastr.success("Cotización enviada")       
          dispatch({type:'SET_LOADING',state:false})
        })
        .catch((err) => {                  
          toastr.error(payload, err)   
          dispatch({type:'SET_LOADING',state:false})
        });
  };
  }



  