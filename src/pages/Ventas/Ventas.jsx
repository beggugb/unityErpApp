import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { VentaRouter } from '../../routes'
import { crudActions } from '../../actions'
import TableVentas from "./components/TableVentas";
import SearchVenta from "./components/SearchVenta";
import EditVenta from "./components/EditVenta";
import SubMenu from '../../components/subMenu'


const Ventas = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.ventas)  
  
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchVenta getComponent={getComponent}/><TableVentas getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'VENTA_RESET_ITEM'})
          setComponent(<EditVenta getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('VENTAS_ITEM','ventas',key)) 
          setComponent(<EditVenta getComponent={getComponent}/>)
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
        <SubMenu items={VentaRouter} prop='Ventas'/>       
        {component}      
          
               
      </div>
    </div>    
  )

};
export default Ventas;
