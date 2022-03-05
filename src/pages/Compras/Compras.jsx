import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { CompraRouter } from '../../routes'
import { crudActions } from '../../actions'
import TableCompras from "./components/TableCompras";
import SearchCompra from "./components/SearchCompra";
import EditCompra from "./components/EditCompra";
import SubMenu from '../../components/subMenu'


const Compras = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.compras)  
  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'COMPRAS_VIEW',view:est})                
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchCompra getComponent={getComponent}/><TableCompras getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'COMPRAS_RESET_ITEM'})
          setComponent(<EditCompra getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('COMPRAS_ITEM','compras',key)) 
          setComponent(<EditCompra getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);



  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga compras')
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={CompraRouter} prop='Compras'/>      
        {component}      
      </div>
    </div>    
  )

};
export default Compras;
