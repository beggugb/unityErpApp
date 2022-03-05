import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { custom } from '../../../helpers/customStyles'
import Select from "react-select";

const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )
  
  }

const SelectCategoria = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.categorias)
    const { item } = useSelector(state => state.articulos)
   

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('CATEGORIAS_LISTA','categorias','nombre','asc'))          
      },[])
    

    const changeHandler = event => {    
      let io = event ? event.value: 0    
      dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','categoriaId',io))        
  }     
  
         
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {
            dispatch({type:'CATEGORIAS_RESET_DATA'})  
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
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.categoriaId)} 
        /> 
        </>                                             
    );
};
export default SelectCategoria;
