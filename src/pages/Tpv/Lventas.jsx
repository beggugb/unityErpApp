import React,{useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { TpvRouter,TpvRouters } from '../../routes'
import { crudActions } from '../../actions'
import { Row, Col, Modal, ModalBody, Button, Table  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu'
import Pagination from '../../components/Pagination'
import VentaResumen from "../Ventas/components/VentaResumen"

const Lventas = () => {
    const dispatch = useDispatch() 
    const {data,total,pagina,paginas,modalView}= useSelector(state => state.ventas)
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    
 
    const makeHttpRequestWithPage = useCallback((page, num) =>{
     dispatch(crudActions.GET_DATA('VENTAS_DATA','tpv',page, num,usuario.id,usuario.rolId))  
     console.log('segui1')
   },[]) 

   const viewVenta = (pky) => {            
    dispatch({type:'VENTAS_VIEW',view:true}) 
    dispatch(crudActions.GET_ITEM('VENTAS_ITEM','ventas',pky))
  };
   
   const toggleModalView = (item) => {        
    let est = modalView === true ? false : true;       
    dispatch({type:'VENTAS_VIEW',view:est}) 
  };
   useEffect(() => {
    makeHttpRequestWithPage(1,12)
    return () => {
    /*    cleanup*/
    console.log('clean table lventas')
    };
}, []);

console.log(usuario)

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={usuario.isCajero ? TpvRouter: TpvRouters}/>
        <Row>
      <Col>
      <div className="table-single">     
        <Table className="table-simple">
          <thead>
              <tr>  
                  <th width="10%">Nro.</th>
                  <th width="10%">Usuario</th>
                  <th width="10%">Fecha</th>
                  <th width="20%">Glosa</th>
                  <th width="10%">Estado pago</th>
                  <th width="10%">Total</th>
                  <th width="10%">Estado</th>
                  <th width="15%">Cliente</th>
                  <th width="5%"></th>
                  
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.id}</td>
                        <td>{item.usuario ? item.usuario.nombres: ''}</td> 
                        <td>{item.fechaVenta}</td>                                                
                        <td>{item.observaciones}</td>
                        <td>{item.estf}</td>
                        <td>{item.tipo}</td>
                        <td>{item.estado ? "cerrado":"pendiente"}</td>
                        <td>{item.cliente ? item.cliente.nombres: ''}</td>                                                                                 
                        <td>                                                                             
                        <Button className="btn btn-danger" 
                              onClick={() => { viewVenta(item.id)}}>
                              <FontAwesomeIcon icon={faFilePdf} />
                            </Button>                                            
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

    <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <VentaResumen/>
          </ModalBody>
        </Modal>
      </div>
    </div>    
  )

};
export default Lventas;
