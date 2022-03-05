import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { VentaRouter } from '../../routes'
import { crudActions } from '../../actions'
import TableCobros from "./components/TableCobros";
import SearchCobro from "./components/SearchCobro";
import EditCobro from "./components/EditCobro";
import SubMenu from '../../components/subMenu'


const Cobros = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.ventas)  
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  


  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchCobro getComponent={getComponent}/><TableCobros getComponent={getComponent}/></>)          
          break;    
        case 'new':
          dispatch({type:'VENTA_RESET_ITEM'})
          setComponent(<EditCobro getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('COBROS_ITEM','ventas',key)) 
          setComponent(<EditCobro getComponent={getComponent}/>)
         
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
export default Cobros;
