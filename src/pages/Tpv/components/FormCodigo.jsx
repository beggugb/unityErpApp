import React,{useEffect, useState} from "react";
import { Row, Col, Button, Form, Input  } from "reactstrap";
import {  useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBarcode } from "@fortawesome/free-solid-svg-icons";

const FormCodigo = () => {
   const dispatch = useDispatch()    
   const [codigo, setCodigo] = useState('');
   const [name, setName] = useState('');   
   const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))       
  
  const submitHandle = event => {       
    event.preventDefault()         
    let itt = {
      "almacenId": almacenId.id,
      "pagina":1,
      "num":21,
      "name":name,
      "codigo":"",
      "categoriaId":0,
      "stock":3
    }  
    dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','almacenes',itt))     
    setName('')
  }

  const submitCodigo = event => {       
    event.preventDefault()         
    let itt = {
      "almacenId": almacenId.id,
      "pagina":1,
      "num":21,
      "name":"",
      "codigo":codigo,
      "categoriaId":0,
      "stock":3
    }    
    dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','almacenes',itt)) 
    setCodigo('')

  }

  const changeHandler = (event) =>{
    const { value } = event.target  
    setCodigo(value)       
  }

  const changesHandler = (event) =>{
    const { value } = event.target  
    setName(value)       
  }

  useEffect(() => {      
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  return(
     <Row>
       <Col md="5">
       <Form onSubmit={ submitCodigo}>     
          <Row form>
            <Col md={10}>                                                             
              <Input 
                type="text" 
                name="codigtotal"                             
                id="total"  
                value={codigo}  
                placeholder="...código"
                onChange={changeHandler} 
              />                        
            </Col>
            <Col md={2}>
              <Button className="btn-md btn-warning">
                <FontAwesomeIcon icon={faBarcode} />                          
              </Button>    
            </Col>         
          </Row>                      
        </Form>
       </Col>     
       <Col md="1">

       </Col>
       <Col md="5">
       <Form onSubmit={ submitHandle}>     
          <Row form>
            <Col md={10}>                                                             
              <Input 
                type="text" 
                name="name"                             
                id="name"  
                placeholder="...nombre"
                value={name}  
                onChange={changesHandler} 
              />                        
            </Col>
            <Col md={2}>
              <Button className="btn-md btn-success">
                <FontAwesomeIcon icon={faSearch} />                          
              </Button>    
            </Col>         
          </Row>                      
        </Form>
       </Col>
     </Row> 
                         
        
  )

};
export default FormCodigo;
