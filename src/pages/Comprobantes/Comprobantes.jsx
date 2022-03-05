import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ContabilidadRouter } from '../../routes'
import { crudActions } from '../../actions'
import TableComprobantes from "./components/TableComprobantes";
import SearchComprobante from "./components/SearchComprobante";
import EditComprobante from "./components/EditComprobante";
import SubMenu from '../../components/subMenu'


const Comprobantes = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.comprobantes)  
  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'COMPROBANTES_VIEW',view:est})                
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchComprobante getComponent={getComponent}/><TableComprobantes getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'COMPROBANTES_RESET_ITEM'})
          setComponent(<EditComprobante getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('COMPROBANTES_ITEM','comprobantes',key)) 
          setComponent(<EditComprobante getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);



  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga comprobantes')
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={ContabilidadRouter} prop='Comprobantes'/>      
        {component}      
      </div>
    </div>    
  )

};
export default Comprobantes;
