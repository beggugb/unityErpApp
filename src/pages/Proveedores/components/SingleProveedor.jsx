import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  
    Row,
    Col,Card, CardBody, Button, Input, Label, Modal, ModalBody, Table, Form, FormGroup
  } from "reactstrap"
  import { crudActions } from '../../../actions'  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";


const SingleProveedor = () => {
    const dispatch = useDispatch()   
    const [modalView, setmodalView] = useState(false); 
    const { data  } = useSelector(state => state.proveedores) 
    const itt  = useSelector(state => state.compras.item) 
    const [prop, setProp] = useState('razonSocial');
    const [value, setValue] = useState("");
   
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


    const submitHandle = event => {       
      event.preventDefault()  
      let iok = {}               
      iok.value = value
      iok.prop  = prop
      dispatch(crudActions.GET_SEARCH('PROVEEDORES_DATA','proveedores',iok))              
   } 

    return (  
      <>      
        <Col md={8}>
              <FormGroup>
              <Label for="proveedors">Proveedor</Label>
              <Input type="text" name="proveedors" id="proveedors" 
                 value={itt.proveedors}
                readOnly={true}/>     
              </FormGroup>    
        </Col> 
        <Col md={1}>
              <FormGroup>
              <Button className="btn-rd btn-info mt-3" onClick={() => toggleModalView()}>
            <FontAwesomeIcon icon={faSearch} />                          
        </Button>    
              </FormGroup>    
        </Col>
      

       <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>          
          <Row>
            <Col >
              <Card>
              <CardBody>
                <Form onSubmit={ submitHandle}> 
                  <FormGroup row>                                                          
                    <Col sm={10}>
                    <Input 
                        type="text" 
                        name="value"                                 
                        id="value"  
                        value={ value || '' }  
                        onChange={(e) =>{setValue(e.target.value)}} />
                        {
                          value ? 
                          <Button className="volatils" onClick={(e) => {setValue('')}}>
                            <FontAwesomeIcon icon={faTimes}   />
                          </Button>
                          : null
                        } 
                    </Col>    
                    <Button className="btn-sm btn-primary" sm={1}>
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    </FormGroup>       
                </Form>  
                </CardBody>
              </Card>  
            </Col>
          </Row>

    <Row>
      <Col>
        <Card>
          <CardBody>
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
            </CardBody>
          </Card>  
        </Col>
      </Row>  



          </ModalBody>
        </Modal>

       </>
    );
};
export default SingleProveedor;
