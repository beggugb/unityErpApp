import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  
    Row,
    Col,
    Button, Input, Label, Modal, ModalBody, Table
  } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SearchProveedor from "./SearchProveedor";

const SearchsProveedores = () => {
    const dispatch = useDispatch()   
    const [modalView, setmodalView] = useState(false); 
    const { data  } = useSelector(state => state.proveedores) 
    const itt  = useSelector(state => state.compras.item) 
   
    const toggleModalView = () => {    
        let est = modalView === true ? false : true;             
        setmodalView(est)                          
    };

    const asignar = (item) => {    
        let est = modalView === true ? false : true;                     
        dispatch({type: 'COMPRAS_CHANGE', props: 'proveedorId', value: item.id})
        dispatch({type: 'COMPRAS_CHANGE', props: 'proveedors', value: item.razonSocial})
        setmodalView(est)  
        dispatch({type:'PROVEEDORES_RESET_DATA'})             
    };

    /*useEffect(() => {        
    
        return () => {
            dispatch({type:'PROVEEDORES_RESET_DATA'})   
        };
      }, []);*/

    return (  
      <>                    
        
        <Col md={8} className="card-barras">        
            <Label for="proveedors">Proveedor.</Label>
            <Input type="text" name="proveedors" id="proveedors" 
                 value={itt.proveedors}
                readOnly={true}/>              
        </Col>
        <Col md={2} className="card-barras">        
        <Button className="btn-rd btn-info mt-3" onClick={() => toggleModalView()}>
            <FontAwesomeIcon icon={faSearch} />                          
        </Button>
       </Col>
      

       <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
          <div className="card-contenidos">
          <Row>
            <Col className="card-contenido">
              <SearchProveedor/>
            </Col>
          </Row>

           <Row>
            <Col className="card-contenido">
            <div className="table-single">     
                    <Table className="table-simple">
                    <thead>
                        <tr>  
                            <th width="15%">Código</th>
                            <th width="45%">Razon Social</th>
                            <th width="15%">Tipo Fiscal</th>
                            <th width="15%">Nit</th>            
                            <th width="10%"></th>                
                        </tr>
                    </thead>
                    {data && (
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>                      
                                    <td>{item.codigo}</td>
                                    <td>{item.razonSocial}</td>
                                    <td>{item.tipoFiscal}</td>
                                    <td>{item.nit}</td>                                                       
                                    <td>
                                    <Button className="btn btn-success" 
                                    onClick={() => { asignar(item)}}                           >
                                    <FontAwesomeIcon icon={faArrowRight} />
                                    </Button>              
                                    </td>
                                </tr>  
                                ))}
                        </tbody>
                    )}
                    </Table>
            </div>
            </Col>
          </Row>  
          </div>  
          </ModalBody>
        </Modal>

       </>
    );
};
export default SearchsProveedores;
