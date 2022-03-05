import React,{ useEffect} from "react";
import SubMenu from '../../components/subMenu.jsx';
import { InformeRouter } from '../../routes'

const InformesView = () => {  
  useEffect(() => {
    return () => {
      console.log('descarga cliente')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InformeRouter} prop='Informes'/>        
         <div className="submenub"></div> 
          <div className="sub-form">                  
          </div>       
      </div>
    </div>    
    </>
  )

};
export default InformesView;
