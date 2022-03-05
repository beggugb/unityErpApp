import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  
    Row,
    Col,
    Button, FormGroup, Input, Label,Card,CardBody,ListGroup, ListGroupItem
  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const SearchvArticulos = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.articulos)  
    const { cantidadTotal, sumaTotal, items, item  } = useSelector(state => state.ventas)  
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [valor, setValor] = useState(0);
    const [articulo, setArticulo] = useState({});
    
    const changeHandler = event => {    
      const { value } = event.target  
      const name = value.toLowerCase().trim();
      if (!value) {      
        clearInput();
        return;
      }
  
      setName(value)
      setOpen(true)
  
      if (name) {
        search(name);
      }       
    } 
    const search = (searchTerm) =>{
      /*this.props.searchArticuloItems(searchTerm);*/
      let iok ={}
      iok.codigo = ''
      iok.nombre = searchTerm     
      iok.almacenId = almacenId.id
      iok.tipo = 'venta'

      dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','tpv',iok))
    }  

    const clearInput = () => {
      setName('')
      setOpen(false)
      setCantidad(0)
      setValor(0)
    } 
    
    const upCantidad = (e) => {
      const { value } = e.target 
      setCantidad(value)      
    }
    const upValor = (e) => {
      const { value } = e.target 
      setValor(value)      
    } 

    const add = () =>{  
      let ites = [...items]
      let cTotal = cantidadTotal
      let sTotal = sumaTotal
      let repeat = false
      ites.map((item, index) =>{                        
        if(item.articuloId === articulo.articuloId)
        { 
          repeat = true;
        }
        return null
      }) 
      if(!repeat)
      {
      let itemVENTA = {};
        itemVENTA.cantidad = cantidad;          
        itemVENTA.articuloId = articulo.articuloId;
        itemVENTA.codigo = articulo.codigo; 
        itemVENTA.marca = articulo.marca;
        itemVENTA.valor = valor;
        itemVENTA.subTotal = parseInt(cantidad) * parseInt(valor);        
        itemVENTA.nombre = articulo.nombre;    
        itemVENTA.ventaId = item.id;    
        ites.push(itemVENTA);   
        cTotal = parseInt(cTotal) +parseInt(cantidad);    
        sTotal = parseInt(sTotal) +parseInt(itemVENTA.subTotal)        
        dispatch({type:'VENTAS_SET_ITEMS',values:ites, cantidad: cTotal, suma: sTotal})  
      }
        clearInput()

    }

    const handleAsignar = (articulo) =>{   
      console.log(articulo)
      setArticulo(articulo)  
      setName(articulo.nombre)    
      setValor(articulo.precioVenta)    
      setOpen(false)
    }


    return (   
      <>           
      <Row>                
      <Col> 
       <Card>        
        <CardBody>                 
          <Row form>                      
                    <Col md={7}>
                        <FormGroup>   
                        <Label for="eNombre">Nombres</Label>                 
                          <Input 
                            type="text" 
                            name="name"                             
                            id="name"  
                            value={name || ''}  
                            onChange={changeHandler} />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>   
                        <Label for="eNombre">Cantidad</Label>                 
                          <Input 
                            type="number" 
                            name="cantidad"                             
                            id="cantidad"    
                            value={cantidad}                          
                            onChange={(e) => upCantidad(e)} />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>   
                        <Label for="eValor">Valor</Label>                 
                          <Input 
                            type="number" 
                            name="valor"                             
                            id="valor"    
                            value={valor}      
                            readOnly={true}                    
                            onChange={(e) => upValor(e)} />
                        </FormGroup>
                      </Col>
                                      
                      <Col md={1}>
                        <Button className={cantidad === 0 ? "btn-rd btn-disabled mt-3":"btn-rd btn-danger mt-3"}
                          onClick={() => add() }
                        >
                         <FontAwesomeIcon icon={faArrowDown} />                          
                         </Button>
                      </Col>
                    </Row>                  
                </CardBody>
              
                </Card>          
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
                        <b>{item.codigo}</b> - {item.nombre}/{item.marca} - (Stock: {item.stock})  
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                    }
                  </CardBody>  
                </Card>           
              : null}                

        </>                    
                         
    );
};
export default SearchvArticulos;
