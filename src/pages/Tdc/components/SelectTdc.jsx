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

const SelectTdc = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.tdcs)
    const { item } = useSelector(state => state.articulos)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('TDCS_LISTA','tdcs',0,0))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','tdcId',io))        
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
            name="tdcId"    
            id="tdcId"                    
            options={data}      
            isClearable={true} 
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.tdcId)} 
        />    
        </>                                             
    );
};
export default SelectTdc;
