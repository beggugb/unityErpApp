import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../actions'
import { customi } from '../../helpers/customStyles'

import Select from "react-select";

const SelectUsuarios = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.usuarios)    

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('USUARIOS_LISTA','usuarios','nombre','asc'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        let lb = event ? event.label: '--Todas--'            
        dispatch({type:'INFORME_SET_USUARIO_ID',usuarioId:io, labelUsuario: lb})        
    }     
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {
            /*dispatch({type:'CATEGORIAS_RESET_DATA'})*/
        };
    }, []);


    return (              
        <>
        <Select
            defaultValue={data[0]}
            name="usuarioId"    
            id="usuarioId"                    
            options={data}      
            isClearable={true} 
            onChange={ (e) => changeHandler(e) }                         
            styles={customi} 
        />    
        </>                                             
    );
};
export default SelectUsuarios;
