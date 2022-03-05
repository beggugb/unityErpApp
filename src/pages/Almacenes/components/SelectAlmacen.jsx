import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { customi } from '../../../helpers/customStyles'
import Select from "react-select";

const SelectAlmacen = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.almacenes)    

    const makeHttpRequestWithPage = useCallback(() =>{
        /*dispatch(crudActions.getLista('ALMACENES_LISTA','almacenes'))        */
        dispatch(crudActions.GET_LIST('ALMACENES_LISTA','almacenes','nombre','asc'))   
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0       
        let lb = event ? event.label: '--Todas--'                 
        dispatch({type:'INFORME_SET_ALMACEN_ID',almacenId:io,labelAlmacen: lb})
    }     
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
              
        <Select
            defaultValue={data[0]}
            name="almaceneId"    
            id="almaceneId"                    
            options={data}      
            isClearable={true} 
            onChange={ (e) => changeHandler(e) }                                  
            styles={customi} 
        />    
                                                 
    );
};
export default SelectAlmacen;

