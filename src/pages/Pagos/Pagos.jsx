import React,{useState, useCallback, useEffect} from "react";
import {  useDispatch } from 'react-redux'
import { CompraRouter } from '../../routes'
import { crudActions } from '../../actions'
import TablePagos from "./components/TablePagos";
import SearchPago from "./components/SearchPago";
import EditPago from "./components/EditPago";
import SubMenu from '../../components/subMenu'


const Pagos = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
    
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchPago getComponent={getComponent}/><TablePagos getComponent={getComponent}/></>)          
          break;    
        case 'new':
          dispatch({type:'COMPRA_RESET_ITEM'})
          setComponent(<EditPago getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('PAGOS_ITEM','compras',key)) 
          setComponent(<EditPago getComponent={getComponent}/>)
         
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga ventas')
    };
  }, []); 

 

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={CompraRouter} prop='Pagos'/>       
        {component}      
          
               
      </div>
    </div>    
  )

};
export default Pagos;
