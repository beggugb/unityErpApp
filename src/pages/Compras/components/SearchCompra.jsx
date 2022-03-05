import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Row,Col,Button, Form, Modal, Table, ModalBody, FormGroup, Input, Label, Card, CardBody  } from "reactstrap"
import { crudActions, mailActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheck, faEnvelope, faEdit, faSearch, faPlus, faTrash, faFilePdf, faCoins, faTimes } from "@fortawesome/free-solid-svg-icons";
import { customs } from '../../../helpers/customStyles'
import Select from 'react-select'  
import CompraResumen from './CompraResumen'
import Switch from 'react-switch'

const page =[{"value":'observaciones',"label":'glosa'},
             {"value":'proveedor',"label":'proveedor'}
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }


const SearchCompras = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total, indicador, indicadorTotal, estado}= useSelector(state => state.compras)
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    const [prop, setProp] = useState('observaciones');
    const [value, setValue] = useState("");
    const [view, setview] = useState(false);
    const [viewx, setviewx] = useState(false);
    const [viewz, setviewz] = useState(false);
    const [cuota, setcuota] = useState(1);
    const [plan, setplan] = useState([]);

    const [contado, setContado] = useState(true);
    const [banco, setBanco] = useState(false);
    const [inicial, setInicial] = useState(false);
    const [pinicial, setPinicial] = useState(0);

    

   const changeSelect = (pky) => {        
      const { value } = pky
      setProp(value)
    };
    
    const submitHandle = event => {       
      event.preventDefault()  
      let iok = {}               
      iok.value = value
      iok.prop  = prop
      dispatch(crudActions.GET_SEARCH('COMPRAS_DATA','compras',iok))              
   }  
  
    const createHandle = () => { 
      let eItem = {                            
          proveedors:'sin proveedor',                    
          observaciones:'compra nueva - sin items',               
          usuarioId : usuario.id,
          nroItems : 0,
          total : 0
      }
      dispatch(crudActions.SET_ADD('COMPRAS_DATA','compras',eItem,'lista'))      
      dispatch({type:'COMPRAS_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})                                           
   }

   const onBorrar = () => {            
    dispatch(crudActions.GET_DELETE('COMPRAS_DATA','compras',indicador,'lista'))      
    dispatch({type:'COMPRAS_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
    setview(false)

  };

  const toggleModalView = () => {        
    setview(!view)                  
  };
  const toggleModalViewx = () => {        
    setviewx(!viewx)      
             
  };

  const toggleModalViewz = () => {        
    setviewz(!viewz)      
             
  };

  const viewArticulo = () => {                    
    dispatch(crudActions.GET_ITEM('COMPRAS_ITEM','compras',indicador))
    setviewz(!viewz)
  }; 



  const aprobarCompra = () => {   
    let dato ={
      "id": indicador,
      "tipo": "compra",      
      "almacenId": 1,
      "estado": "cerrado",      
      "usuarioId" : usuario.id,
      "nroPagos": cuota      
    }
           
    let xcode = {
      item: dato,
      items:plan,
      contado:contado,
      banco:banco,
      inicial:inicial,
      cuota:pinicial,
      total:indicadorTotal
    }
    dispatch(crudActions.SET_APROBAR('COMPRAS_DATA','compras/aprobar',xcode,'lista'))     
    dispatch({type:'COMPRAS_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
    setviewx(false)
  };

  const calcular = () => {         
    let newArray = []
    let diok = false
    let dd = new Date()
    for (let index = 0; index < cuota; index++) {
      if(index === 0 && inicial){
        setPinicial(parseInt(indicadorTotal)/cuota)
        diok = true
      }
      let iok = {}
      iok.cuota     = index+1
      iok.monto     = parseInt(indicadorTotal)/cuota
      iok.estado    =  diok
      iok.fechaPago = dd
      iok.mes       = dd.getMonth() + 1
      newArray.push(iok)
      diok = false
    }
    
    setplan(newArray)
}

const onChange = (event,item) => {       

  const {name, value } = event.target    
  let xarray = [...plan]
  for (let index = 0; index < cuota; index++) {
    xarray[item]['fechaPago']= value
    
  }
  setplan(xarray)
};

const sendMail = () => {                
  dispatch(mailActions.SEND_MAIL('mails/cotizacion',indicador))
  dispatch({type:'COMPRAS_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
  
};
    return (                                      
      <>       
      <Card>    
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faShoppingCart} />  
          </div>        
        </Col>    
        <Col md={4} className="cards">
          <ButtonGroup>
                <Button className={indicador !== 0 ? "btl bg-defaults text-white disabled": "btl bg-defaults text-white"}  onClick={()=> createHandle()}><FontAwesomeIcon icon={faPlus}/> </Button>                 
                 <Button className={indicador === 0  || estado === 'cerrado'  ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> getComponent('edit',indicador)}>
                   <FontAwesomeIcon icon={faEdit} /></Button>            
                 <Button className={indicador === 0  || estado === 'cerrado' ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> toggleModalView()}>
                   <FontAwesomeIcon icon={faTrash} /> </Button>                                
                 <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> viewArticulo()}>
                   <FontAwesomeIcon icon={faFilePdf} /> </Button> 
                 <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> sendMail()}>
                   <FontAwesomeIcon icon={faEnvelope} /> </Button>                
                 <Button className={indicador === 0  || estado === 'cerrado' ? "btr bg-default text-white disabled": "btr bg-default text-white"} onClick={()=> toggleModalViewx()} >
                   <FontAwesomeIcon icon={faCoins} /></Button>                  
          </ButtonGroup>
        </Col>
        <Col md={1} className="cards text-right">
          <Select                 
                styles={customs}                                              
                defaultValue={page[0]}
                name="prop"    
                id="prop"                    
                options={page}      
                isClearable={false}                          
                value={defaultVal(page,prop)}    
                onChange={ (e) => changeSelect(e)}                                             
          />
        </Col> 

        <Col md={4} className="cards">
          <Form onSubmit={ submitHandle}> 
            <FormGroup row>                                                          
              <Col md={11}>
                <Input 
                    type="text" 
                    name="value"                                 
                    id="value"  
                    value={ value || '' }  
                    onChange={ (e) => {setValue(e.target.value)}} />   
                    {
                      value ? 
                      <Button className="volatil" onClick={(e) => {setValue('')}}>
                        <FontAwesomeIcon icon={faTimes}   />
                      </Button>
                      : null
                    } 
              </Col>
              <Col md={1}>
                <Button className="btn-primary btn-search">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>  
              </Col>              
          </FormGroup>       
          </Form>               
        </Col>
        <Col md={2}> 
        <p className="mt-3 ml-3" >{ total || 0 } COMPRAS</p>          
        </Col>

      </Row>   
      </Card>  
      <Modal isOpen={view} toggle={toggleModalView} className="deleteBody">  
          <ModalBody className="deleteConte">
          <Row>
              <Col md="12" >
              <p className="deletePe">desea borra el registro ?</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="6" className="text-center">
              <Button className="btn-danger deleteCol"  onClick={() => toggleModalView()} >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              </Col>
              <Col md="6" className="text-center">
              <Button className="btn-success deleteCol"  onClick={() => onBorrar()} >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
              </Col>
            </Row>
          </ModalBody>
      </Modal>

      <Modal isOpen={viewx} toggle={toggleModalViewx} className="calculoBody">  
      <Button className="btn-view btn-danger"  onClick={() => toggleModalViewx()} >
          <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody className="calculoConte">
          <Row>                       
              <Col md={2}>                
                  <FormGroup>
                    <Label for="estado">Nro. cuotas</Label>
                    <Input type="number" name="cuota" id="cuota" 
                    value={cuota || ''}                
                    onChange={ (e) => setcuota(e.target.value)} />    
                  </FormGroup> 
              </Col>
              <Col md={2}>                               
                  <FormGroup>
                      <Label for="estado">Contado</Label>
                      <Switch                         
                        className="mt-1"                         
                        onChange={ (e) =>{setContado(e)}}  
                        checked={contado} />
                    </FormGroup> 
              </Col>
              <Col md={2}>                               
                <FormGroup>
                      <Label for="estado">Cheque</Label>
                      <Switch                         
                        className="mt-1"                         
                        onChange={ (e) =>{setBanco(e)}}  
                        checked={banco} />
                </FormGroup>      
              </Col>
              <Col md={2}>                               
                  <FormGroup>
                      <Label for="estado">P.Inicial</Label>
                      <Switch                         
                        className="mt-1"                         
                        onChange={ (e) =>{setInicial(e)}}  
                        checked={inicial} />
                    </FormGroup>
              </Col>
              <Col md={2}>                               
                <FormGroup>
                  <Button
                    className="btn-md btn-info mt-4"
                    onClick={() => calcular()}>
                    <FontAwesomeIcon icon={faCoins} />  
                    {' '} Calcular
                  </Button>                  
                </FormGroup> 
              </Col>                                      
          </Row>    
          <Row>            
              <Col md={12}>
                <Card>            
                  <CardBody>
                    <h6>Compra total : {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(indicadorTotal)}</h6>
                    <Table className="table-simple">
                    <thead>
                        <tr>  
                            <th width="20%">Fecha</th>                  
                            <th width="20%">Cuota</th>                  
                            <th width="30%">Monto</th>
                            <th width="30%">Estado</th>
                        </tr>
                    </thead>
                    {plan && (
                        <tbody>
                            {plan.map((item, index) => (
                                <tr key={index}>                                                                       
                                  <td>
                                    <Input type="date" name="fechaPago" id="fechaPago" 
                                      value={item.fechaPago || ''}       
                                      onChange={ (e) => onChange(e,index)}                     
                                    />   
                                  </td>                                                 
                                  <td>{item.cuota}</td> 
                                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>
                                  <td>{item.estado ? "pagado":"pendiente" }</td>                                                                    
                                </tr>  
                                ))}
                        </tbody>
                    )}
                  </Table>
                </CardBody>  
              </Card>
              </Col>
            </Row>
            <Row>                                      
                  <Col md={3}>
                    <FormGroup>
                      <Button                        
                        className={plan ? "btn btn-md btn-success" : "btn btn-md btn-success disabled" }
                        onClick={() => aprobarCompra()}>
                        <FontAwesomeIcon icon={faCoins} />  
                        {' '} Aprobar
                      </Button>                  
                    </FormGroup>               
                  </Col>           
            </Row>    
          </ModalBody>
      </Modal>

      <Modal isOpen={viewz} toggle={toggleModalViewz}>  
      <Button className="btn-view btn-danger"  onClick={() => toggleModalViewz()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <CompraResumen/>
          </ModalBody>
      </Modal>
    </>                    
    );
};
export default SearchCompras;
