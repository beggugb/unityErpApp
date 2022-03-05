import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { customi } from '../../../helpers/customStyles'
import Select from "react-select";

const SelectCategorias = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.categorias)
    const { item } = useSelector(state => state.articulos)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('CATEGORIAS_LISTA','categorias','nombre','asc'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        let lb = event ? event.label: '--Todas--'    
        /*dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','categoriaId',io)) */
        dispatch({type:'INFORME_SET_CATEGORIA_ID',categoriaId:io, labelCategoria: lb})        
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
            name="categoriaId"    
            id="categoriaId"                    
            options={data}      
            isClearable={true} 
            onChange={ (e) => changeHandler(e) }                         
            styles={customi} 
        />    
        </>                                             
    );
};
export default SelectCategorias;
