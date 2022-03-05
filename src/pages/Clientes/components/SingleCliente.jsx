import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../../actions'  
import {  
    Row,
    Col,
    Card,
    CardBody,
    Form,
    Button, FormGroup, Input, Label, Modal, ModalBody, Table
  } from "reactstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SearchCliente from "./SearchCliente";

const SingleCliente = () => {
    const dispatch = useDispatch()   
    const [modalView, setmodalView] = useState(false); 
    const { data  } = useSelector(state => state.clientes) 
    const itt  = useSelector(state => state.ventas.item) 
    const [prop, setProp] = useState('nombres');
    const [value, setValue] = useState("");
   
    const toggleModalView = () => {    
        let est = modalView === true ? false : true;             
        setmodalView(est)                          
    };

    const asignar = (item) => {    
        let est = modalView === true ? false : true;                     
        dispatch({type: 'VENTAS_CHANGE', props: 'clienteId', value: item.id})
        dispatch({type: 'VENTAS_CHANGE', props: 'clients', value: item.nombres})
        dispatch({type: 'VENTAS_CHANGE', props: 'nit', value: item.nit})
        setmodalView(est)  
        dispatch({type:'CLIENTES_RESET_DATA'})             
    };
    const submitHandle = event => {       
        event.preventDefault()  
        let iok = {}               
        iok.value = value
        iok.prop  = prop
        dispatch(crudActions.GET_SEARCH('CLIENTES_DATA','clientes',iok))              
     } 

    useEffect(() => {        
    
        return () => {
          dispatch({type:'CLIENTES_RESET'})   
        };
      }, []);

    return (                      
      <>
        <Row form>          
            <Col md={5}>        
             <FormGroup>
              <Label for="clients">Cliente</Label>
              <Input type="text" name="clients" id="clients" 
                    value={itt.clients}
                    readOnly={true}/>              
             </FormGroup>       
            </Col>
            <Col md={5}>        
             <FormGroup>
              <Label for="nit">Nit</Label>
              <Input type="text" name="nit" id="nit" 
                    value={itt.nit}
                    readOnly={true}/>              
             </FormGroup>       
            </Col>
            <Col md={2}>        
            <Button className="btn-rd btn-info mt-3" onClick={() => toggleModalView()}>
                <FontAwesomeIcon icon={faSearch} />                          
            </Button>
          </Col>
        </Row>
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
            <div className="table-single">     
                    <Table className="table-simple">
                    <thead>
                        <tr>  
                            <th width="15%">Id</th>
                            <th width="45%">Nombres</th>
                            <th width="15%">Dirección</th>
                            <th width="15%">Nit</th>            
                            <th width="10%"></th>                
                        </tr>
                    </thead>
                    {data && (
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>                      
                                    <td>{item.id}</td>
                                    <td>{item.nombres}</td>
                                    <td>{item.direccion}</td>
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
          </ModalBody>
        </Modal>

       </>
    );
};
export default SingleCliente;
