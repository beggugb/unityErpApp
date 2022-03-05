import React,{useEffect, useCallback, useState} from "react";
import { Table, Row, Col, Button, Modal, ModalBody, Input, FormGroup, Label, Card  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf, faCheck, faTrash, faMailBulk, faTimes, faCoins } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'
import Moment from 'react-moment'
import DatePicker from 'react-date-picker';


const Tabletventas = ({getComponent}) => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView}= useSelector(state => state.ventas)
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   const [modal, setmodal] = useState(false);
   const [cuota, setcuota] = useState(1);
   const [plan, setplan] = useState([]);
   const [xventa, setxventa] = useState(0);
   const [xid, setid] = useState(0);

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.GET_DATA('VENTAS_DATA','tpv',page, num,usuario.Id,usuario.Id))  
    console.log('segui1')
  },[]) 

  const viewVenta = (pky) => {        
    let est = modalView === true ? false : true;             
    dispatch({type:'VENTAS_VIEW',view:true}) 
    dispatch(crudActions.GET_ITEM('VENTAS_ITEM','ventas',pky))
  };

  const aprobarVenta = () => {   
    let dato ={
      "id": xid,
      "tipo": "venta",      
      "almacenId": 1,
      "estado": true,
      "total": xventa,      
      "fechaAprobacion": new Date(),
      "usuarioId" : usuario.id,   
      "cuotas": cuota   
    }
    let xcode = {
      item: dato,
      items: plan
    }
    dispatch(crudActions.SET_APROBAR('VENTAS_DATA','ventas',xcode,'lista')) 
    setmodal(false)    
    setplan([])
    setxventa(0)
    setid(0)
  };


  const deleteItem = (pky) => {                
    dispatch(crudActions.GET_DELETE('VENTAS_DATA','ventas',pky,'lista'))
  };



  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  const toggleModalView = (item) => {        
    let est = modal === true ? false : true;   
    setmodal(est)         
    if(item){
      setxventa(item.total)
      setid(item.id)
    }
  };

  const calcular = () => {         
    let newArray = []
    for (let index = 0; index < cuota; index++) {
      let iok = {}
      iok.cuota    = index+1
      iok.monto    = parseInt(xventa)/cuota
      iok.estado   = "pendiente"
      iok.fechaPago = new Date()
      newArray.push(iok)
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

  /*function insert =  ( index, item ) {
    this.splice( index, 0, item );  
  };*/
  return(
    <>    
    <Row>
      <Col>
      <div className="table-single">     
        <Table className="table-simple">
          <thead>
              <tr>  
                  <th width="10%">Nro.</th>
                  <th width="10%">Fecha</th>
                  <th width="20%">Glosa</th>
                  <th width="10%">Estado pago</th>
                  <th width="10%">Total</th>
                  <th width="10%">Estado</th>
                  <th width="15%">Proveedor</th>
                  <th width="15%"></th>
                  
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.id}</td>
                        <td>{item.fechaVenta}</td>                                                
                        <td>{item.observaciones}</td>
                        <td>{item.estf}</td>
                        <td>{item.tipo}</td>
                        <td>{item.estado ? "cerrado":"pendiente"}</td>
                        <td>{item.cliente ? item.cliente.nombres: ''}</td>                                                         
                        <td>{item.usuario ? item.usuario.nombres: ''}</td> 
                        <td>
                          {item.estado ?
                            <>
                            <Button className="btn btn-danger" 
                              onClick={() => { viewVenta(item.id)}}>
                              <FontAwesomeIcon icon={faFilePdf} />
                            </Button> 
                            </>
                            :
                            <>                              
                            <Button className="btn btn-warning" 
                              onClick={() => { getComponent('edit',item.id)}}>
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button className="btn btn-success" 
                              onClick={() => { toggleModalView(item)}}>
                              <FontAwesomeIcon icon={faCheck} />
                            </Button>
                   
                            <Button className="btn btn-danger" 
                              onClick={() => { deleteItem(item.id)}}>
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            </>
                          }
                          
                                           
                        </td>
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
      </div>
      <div className="navegador" >
      <Pagination
        makeHttpRequestWithPage={ makeHttpRequestWithPage }
        total={total}
        paginas={paginas}
        current= {pagina} 
        pagina= {12}
      />
      </div>
      </Col>
    </Row>  

    <Modal isOpen={modal} toggle={toggleModalView}>
      <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <ModalBody>
        <Row>
          <Col md={4}>
           <Card>
              <FormGroup>
              <Label for="estado">Nro. cuotas</Label>
                <Input type="number" name="cuota" id="cuota" 
                value={cuota || ''}                
                onChange={ (e) => setcuota(e.target.value)} />    
              </FormGroup> 
              <FormGroup>
                <Button
                  className="btn-md btn-info mt-4"
                  onClick={() => calcular()}>
                  <FontAwesomeIcon icon={faCoins} />  
                  {' '} Calcular
                </Button>
                <Button
                  className="btn-md btn-info mt-4"
                  onClick={() => aprobarVenta()}>
                  <FontAwesomeIcon icon={faCoins} />  
                  {' '} Aprobar
                </Button>
              </FormGroup>   
            </Card>      
          </Col>
          <Col md={6}>
          <Card>
          <h6>Venta total : {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(xventa)}</h6>
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
                        <td>{item.estado}</td>                                                                    
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
        </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>      
</>      
  )

};
export default Tabletventas;
