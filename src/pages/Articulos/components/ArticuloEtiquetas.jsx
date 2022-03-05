import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Barcode from 'react-barcode'
import { Col, Row, Button } from "reactstrap";
import ReactToPrint from "react-to-print";

export class ComponentToPrint extends React.PureComponent {
  render() {    
    const etiquetas = [0,1,2,3,4,5,6,7,8,9,11,12,13,14]
    return (
      <>
    <div className="reporte">     
      <div className="invoice-box">        
        <Row>
         <Col className="text-center">
            {etiquetas.map((tem,index) =>                
              <div key={index} className="clasificaciones">
                <div className="etiqueta">
                  <Barcode value={this.props.data.codigoBarras} width={1} height={20} fontSize={11} />
                </div>
                <div className="etiqueta">
                <Barcode value={this.props.data.codigoBarras} width={1} height={20} fontSize={11} />
                </div>
                <div className="etiqueta">
                <Barcode value={this.props.data.codigoBarras} width={1} height={20} fontSize={11} />
                </div>
                <div className="etiqueta">
                <Barcode value={this.props.data.codigoBarras} width={1} height={20} fontSize={11} />
                </div>             
              </div>
            )}
         </Col> 
        </Row>               
    </div>
    </div>  
    </> 
    );
  }
}


function ArticuloEtiquetas () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.articulos)
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'ARTICULOS_RESET_ITEM'}) 
    };
  }, []);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />        
        <ComponentToPrint
          ref={componentRef}                      
          data={item}
        />                
    </div>
     )
}


export default ArticuloEtiquetas