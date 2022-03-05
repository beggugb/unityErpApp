import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Row,Col,Button, Form, Modal, ModalBody, FormGroup, Input, Card  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faSearch, faPlus, faTimes, faFilePdf, faChartArea } from "@fortawesome/free-solid-svg-icons";
import { customs } from '../../../helpers/customStyles'
import Select from 'react-select'  
import ComprobanteResumen from './ComprobanteResumen'
import { custom } from '../../../helpers/customStyles'


const page =[{"value":'glosaComprobante',"label":'glosa'},
             {"value":'label',"label":'sujeto'}
            ];

const tipos =[
            {"value":'Diario',"label":'Diario'},
            {"value":'Ingreso',"label":'Ingreso'},
            {"value":'Egreso',"label":'Egreso'}                        
           ];            

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }


const SearchComprobantes = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total, indicador, estado}= useSelector(state => state.comprobantes)
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    const [prop, setProp] = useState('glosaComprobante');
    const [value, setValue] = useState("");
    const [view, setview] = useState(false);
    const [viewx, setviewx] = useState(false);
    const [viewz, setviewz] = useState(false);    
    const [tipo, setTipo] = useState('Diario');
    

   const changeSelect = (pky) => {        
      const { value } = pky
      setProp(value)
    };

       
    const submitHandle = event => {       
      event.preventDefault()  
      let iok = {}               
      iok.value = value
      iok.prop  = prop
      dispatch(crudActions.GET_SEARCH('COMPROBANTES_DATA','comprobantes',iok))              
   }  
  
    const createHandle = () => { 
      let eItem = {                                               
          usuarioId : usuario.id,                    
          tipoComprobante: tipo
      }
      dispatch(crudActions.SET_ADD('COMPROBANTES_DATA','comprobantes',eItem,'lista'))      
      dispatch({type:'COMPROBANTES_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})     
      setview(false)                                 
   }



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
    dispatch(crudActions.GET_ITEM('COMPROBANTES_ITEM','comprobantes',indicador))
    setviewz(!viewz)
  }; 



  const aprobarComprobante = () => {    
    let itt={
      id:indicador
    }
    let iok ={
      item : itt
    }   
    
    dispatch(crudActions.SET_APROBAR('COMPROBANTES_DATA','comprobantes/aprobar',iok,'lista'))     
    dispatch({type:'COMPROBANTES_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
    setviewx(false)
  };


    return (                                      
      <>             
       <Card>    
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faChartArea} />  
          </div>        
        </Col>    
        <Col md={4} className="cards">
          <ButtonGroup>
              <Button className={indicador !== 0 ? "btl bg-defaults text-white disabled": "btl bg-defaults text-white"}  onClick={()=> toggleModalView()}>
                  <FontAwesomeIcon icon={faPlus}/> </Button>                 
              <Button className={indicador === 0  || estado === 'aprobado'  ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> getComponent('edit',indicador)}>
                  <FontAwesomeIcon icon={faEdit} /></Button>                                                         
              <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> viewArticulo()}>
                  <FontAwesomeIcon icon={faFilePdf} /> </Button>                              
              <Button className={indicador === 0  || estado === 'aprobado' ? "btr bg-default text-white disabled": "btr bg-default text-white"} onClick={()=> toggleModalViewx()} >
                  <FontAwesomeIcon icon={faCheck} /></Button>     
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
        <p className="mt-3 ml-3" >{ total || 0 } COMPROBANTES</p>          
        </Col>

      </Row>   
      </Card>  
      <Modal isOpen={view} toggle={toggleModalView} className="deleteBody">  
      <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody className="deleteConte">
          <Row>
              <Col md="12" >
              <p className="deletePe">selecciona tipo de comprobante</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="12" className="text-center">
                  <Select                                                               
                      defaultValue={tipos[0]}
                      styles={custom} 
                      name="tipo"    
                      id="tipo"  
                      value={defaultVal(tipos,tipo)}              
                      options={tipos}                            
                      onChange={ (e) => setTipo(e.value)}                                                 
                  />
              </Col>            
            </Row>
            <Row>
              <Col>
                <Button className="btn-success btn-md"  onClick={() => createHandle()} >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Col>
            </Row>  
          </ModalBody>
      </Modal>   

        <Modal isOpen={viewx} toggle={toggleModalViewx} className="deleteBody">  
          <ModalBody className="deleteConte">
          <Row>
              <Col md="12" >
              <p className="deletePe">desea aprobar el comprobante ?</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="6" className="text-center">
              <Button className="btn-danger deleteCol"  onClick={() => toggleModalViewx()} >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              </Col>
              <Col md="6" className="text-center">
              <Button className="btn-success deleteCol"  onClick={() => aprobarComprobante()} >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
              </Col>
            </Row>
          </ModalBody>
      </Modal>

      <Modal isOpen={viewz} toggle={toggleModalViewz}>  
      <Button className="btn-view btn-danger"  onClick={() => toggleModalViewz()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <ComprobanteResumen/>
          </ModalBody>
      </Modal>
    </>                    
    );
};
export default SearchComprobantes;
