import React,{useState, useCallback, useEffect} from "react";
import ContabilidadDashboard from "./components/ContabilidadDashboard";
import { ContabilidadRouter } from '../../routes'
import SubMenu from '../../components/subMenu'

const Contabilidad = () => {  
  const [component, setComponent] = useState('data');  
  
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<ContabilidadDashboard/>)
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
       <SubMenu items={ContabilidadRouter} prop='Contabilidad'/>
        {component}    
      </div>
    </div>    
  )

};
export default Contabilidad;
