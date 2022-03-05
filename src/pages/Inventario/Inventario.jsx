import React,{useState, useCallback, useEffect} from "react";
import InventarioDashboard from "./components/InventarioDashboard";
import { InventarioRouter } from '../../routes'
import SubMenu from '../../components/subMenu'

const Inventario = () => {  
  const [component, setComponent] = useState('data');    
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<InventarioDashboard/>)
          break;    
        case 'new':
          
          break;
        case 'edit':
          
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga articulos')
    };
  }, []);

  return(
    <div className="content">     
      <div className="main-contenido">        
       <SubMenu items={InventarioRouter} prop='Inventario'/>
        {component}    
      </div>
    </div>    
  )

};
export default Inventario;
