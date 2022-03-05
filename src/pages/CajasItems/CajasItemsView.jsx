import React, { useState,useEffect } from 'react';

import {  useDispatch } from 'react-redux'
import {  Row, Col } from "reactstrap"
import SubMenu from '../../components/subMenu.jsx';
import { CajaRouter } from '../../routes'
import { cajaActions } from '../../actions'
import CajasItemsTable from './components/CajasItemsTable'
import CajaDetalle from '../Cajas/components/CajaDetalle'
import CajasItemsForm from './components/CajasItemsForm'

function CajasItemsView({...props}) {     
  const dispatch = useDispatch()
    
  useEffect(() =>{        
    const {  match: { params }} = props;            
    dispatch(cajaActions.getItem('CAJAS_ITEMS_DATA','cajas',params.cajaId))              
     return () =>{            
        /*dispatch(crudActions.getReset('CLIENTES_RESET'))*/
    };
  }, []);

  return (
        <div className="content">     
          <div className="main-contenido">    
          <SubMenu items={CajaRouter} prop='Cajas'/> 
            <Row>
              <Col md="4">
                <CajaDetalle/>                                
              </Col>
              <Col md="8">
                <CajasItemsForm/> 
                <CajasItemsTable/>    
              </Col>
            </Row>            
          </div>
        </div> 
  );
}

export default CajasItemsView