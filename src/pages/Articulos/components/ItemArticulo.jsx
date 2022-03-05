import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  
    Row,
    Col,
    FormGroup, Input, Card,CardBody,ListGroup, ListGroupItem
  } from "reactstrap"
import { crudActions } from '../../../actions'

const ItemArticulo = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.articulos)      
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');    

    
    const changeHandler = event => {    
      const { value } = event.target  
      const name = value.toLowerCase().trim();
      if (!value) {      
        clearInput();        
        dispatch({type:'INFORME_SET_ARTICULO_ID',articuloId:0})
        return;
      }
  
      setName(value)
      setOpen(true)
  
      if (name) {
        search(name);
      }       
    } 
    const search = (searchTerm) =>{      
      let iok ={}
      iok.prop = 'nombre'
      iok.value = searchTerm            
      dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','articulos',iok))  
    }  

    const clearInput = () => {
      setName('')
      setOpen(false)      
    } 


    const handleAsignar = (articulo) =>{        
      dispatch({type:'INFORME_SET_ARTICULO_ID',articuloId:articulo.id,labelArticulo:articulo.nombre})   
      /*setArticulo(articulo)  */
      setName(articulo.nombre)    
      setOpen(false)
    }

 
    return (              
        <div className="lnsearch">
                         
                    <Row form>                      
                      <Col md={12}>
                        <FormGroup>                           
                          <Input 
                            type="text" 
                            name="name"                             
                            id="name"  
                            value={name || ''}  
                            onChange={changeHandler} />
                        </FormGroup>
                      </Col>                     
                    </Row>                  
              
              
              { open ?              
                <Card className="resultArt">           
                  <CardBody>
                    {data &&
                    <ListGroup>
                      {data.map(item =>(
                        <ListGroupItem
                          key={item.id}
                          onClick={() => handleAsignar(item) }
                        >
                        <b>{item.codigo}</b> - {item.nombre}  
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                    }
                  </CardBody>  
                </Card>           
              : null}                

        </div>                    
                         
    );
};
export default ItemArticulo;
