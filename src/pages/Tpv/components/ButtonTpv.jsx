import React,{useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMoneyCheck, faUsers  } from "@fortawesome/free-solid-svg-icons";

const ListaArticulos = () => {
    const dispatch = useDispatch()        
    const { items, sumaTotal } = useSelector(state => state.ventas)      

    const viewForm = () => {                
        dispatch({type:'VENTAS_VIEW',view:true})         
    };
   
     
    
    const handleCancelar = () => {  
        let ites = [...items]
        let cTotal = 0
        let sTotal = 0
        ites= []
        dispatch({type:'VENTAS_SET_ITEMS',values:ites, cantidad: cTotal, suma: sTotal})          
        dispatch({type:'VENTAS_SET_ART',id:-1}) 

    }
    
    useEffect(() => {        
        return () => {   
            /*dispatch({type:'ARTICULOS_RESET'})          */
        };
    }, []);

     
    return (              
        <div className="btnTpv"> 
          <Row>
          
                                        
            <Col md={12}>
                <Button className="btn btn-md btn-danger btn-tpv" onClick={() => handleCancelar()}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Col>            
          </Row> 
          <Row>            
            <Col md={6}>
                <Button className="btn btn-md btn-warning btn-tpv">
                    <FontAwesomeIcon icon={faUsers} />
                </Button>
            </Col>                
            <Col md={6}>
                <Button 
                  className={sumaTotal <= 0 ? "btn btn-md disabled btn-tpv" : "btn btn-md btn-success btn-tpv" }
                  onClick={() => { viewForm()}}>
                    <FontAwesomeIcon icon={faMoneyCheck} />
                </Button>
            </Col>                                                
          </Row>                         
        </div>                                             
    );
};
export default ListaArticulos;
