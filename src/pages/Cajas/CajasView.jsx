import React,{useEffect} from "react";
import { useDispatch } from 'react-redux'
import SubMenu from '../../components/subMenu.jsx';
import { CajasRouter } from '../../routes'
import TableCajas from "./components/TableCajas";
import EditCaja from "./components/EditCaja"
const CajasView = () => { 
  const dispatch = useDispatch()       
useEffect(() =>{                       
     return () =>{            
      dispatch({type:'CAJAS_RESET'})  
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={CajasRouter } prop='Caja'/>        
          <EditCaja/>
          <TableCajas/>         
      </div>
    </div>    
    </>
  )

};
export default CajasView;
