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

const SelectMarca = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.marcas)
    const { item } = useSelector(state => state.articulos)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('MARCAS_LISTA','marcas',0,0))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','marcaId',io))        
    }     
    
    useEffect(() => {
       makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
        <>
        <Select
            defaultValue={data[0]}
            name="marcaId"    
            id="marcaId"                    
            options={data}      
            isClearable={true} 
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.marcaId)} 
        />    
        </>                                             
    );
};
export default SelectMarca;
