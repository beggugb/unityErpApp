import React,{ useEffect, useCallback, useState } from "react";
import { css } from "@emotion/react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Nav, Modal, ModalBody, NavItem } from "reactstrap";
import {  useSelector } from "react-redux";
import Inventario from "../../pages/Inventario/Inventario.jsx";
import MoonLoader from "react-spinners/MoonLoader";

import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import Articulos from "../../pages/Articulos/ArticulosView.jsx";
import Categorias from "../../pages/Categorias/CategoriasView.jsx";
import Marcas from "../../pages/Marcas/MarcasView.jsx";
import Compras from "../../pages/Compras/Compras.jsx";
import Ventas from "../../pages/Ventas/Ventas.jsx";
import Cobros from "../../pages/Cobros/Cobros.jsx";
import Pagos from "../../pages/Pagos/Pagos.jsx";
import Proveedores from "../../pages/Proveedores/ProveedoresView.jsx";
import Clientes from "../../pages/Clientes/ClientesView.jsx";
import Tpv from "../../pages/Tpv/Tpv.jsx"
import Cajas from "../../pages/Cajas/CajasView.jsx"
import CajasItems from "../../pages/CajasItems/CajasItemsView";
import Informes from "../../pages/Informes/InformesView.jsx"
import IMovimientos from "../../pages/Informes/MovimientosView.jsx"
import IExistencias from "../../pages/Informes/ExistenciasView.jsx"
import ICajas from "../../pages/Informes/CajasView.jsx"
import IPagos from "../../pages/Informes/PagosView.jsx"
import Lventas from "../../pages/Tpv/Lventas.jsx"
import Pucs from "../../pages/Pucs/PucsView.jsx"
import Comprobantes from "../../pages/Comprobantes/Comprobantes.jsx"
import Contabilidad from "../../pages/Contabilidad/Contabilidad.jsx"
import Diarios from "../../pages/Diarios/DiariosView.jsx"
import Mayores from "../../pages/Mayores/MayoresView.jsx"
import Saldos from "../../pages/Saldos/SaldosView.jsx"
import Tdc from "../../pages/Tdc/TdcView.jsx"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Admin(){
    const [itemr,setItemr] = useState([])    
    const modulos = JSON.parse(localStorage.getItem('@userItems'))    
    const { loading }= useSelector(state => state.usuarios)
    const changeModule = useCallback((name, tab, pky) =>{
        let items = [...itemr];
        modulos.map((prop, key)=>{
            let dato = {
                path: prop.path,
                name: prop.name,
                icon: prop.icon,
                component: verificar(prop.component),
                layout: prop.layout
            };
            items.push(dato);
            return null;
        })
        setItemr(items)
    })
    
    const verificar = (component) => {
        switch (component) {
          case "Dashboard":
            return Dashboard;                
          case "Inventario":
            return Inventario;
          case "Compras":
            return Compras;
          case "Clientes":
            return Clientes;
          case "Tpv":
            return Tpv;
          case "Informes":
            return Informes;
          case "Ventas":
            return Ventas;                      
          case "Cajas":
            return Cajas;   
          case "Contabilidad":
            return Contabilidad;                      
          default:
            return null;
        }
      };
    
    const getRoutes = (routes) =>{
        return routes.map((prop, key) =>{
            if(prop.layout === '/admin'){
                return(
                    <Route
                       path={prop.layout + prop.path}
                       component={prop.component}
                       key={key} 
                    />
                );
            }else{
                return null;
            }
        })
    };
    

    useEffect(() => {        
        changeModule();
        return () => {
         
        };
    }, []);

return(
    <div className="wrapper">  
      <div className="main-panel" > 
         <Modal isOpen={loading} className="cargas">          
          <ModalBody className="carga">
            <MoonLoader color="#1fa2f2" loading={loading} css={override} size={30} />                
          </ModalBody>
        </Modal>
        <div className="nav-unity" expand="lg">        
        <Nav> 
               
          <NavItem>       
          <NavLink
              to="/admin/dashboard"
              className="nav-link"
              activeClassName="active">            
                  <p className="text-white">
                  Dashboard
                  </p>
            </NavLink>
          </NavItem>      
            {itemr.map((prop, key) => (  
            <NavItem key={key}>  
              <NavLink                
                to={prop.layout + prop.path}
                className="nav-link"
                activeClassName="active"> 
                <p>{prop.name}</p>                    
              </NavLink>
            </NavItem>))}

             
        </Nav>        
        </div>  
       

        <Switch>   
                {getRoutes(itemr)}
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/articulos" component={Articulos} />
                <Route path="/admin/categorias" component={Categorias} />
                <Route path="/admin/marcas" component={Marcas} />
                <Route path="/admin/proveedores" component={Proveedores} />
                <Route path="/admin/lcaja" component={Cajas} />
                <Route path="/admin/lventas" component={Lventas} />
                <Route path="/admin/imovimientos" component={IMovimientos} />
                <Route path="/admin/iexistencias" component={IExistencias} />
                <Route path="/admin/icajas" component={ICajas} />
                <Route path="/admin/ipagos" component={IPagos} />
                <Route path="/admin/cajasitems/:cajaId" component={CajasItems}/>                 
                <Route path="/admin/cobros" component={Cobros} />                
                <Route path="/admin/pagos" component={Pagos} />
                <Route path="/admin/puc" component={Pucs} />
                <Route path="/admin/tdc" component={Tdc} />
                <Route path="/admin/comprobantes" component={Comprobantes} />
                <Route path="/admin/diarios" component={Diarios} />
                <Route path="/admin/mayores" component={Mayores} />
                <Route path="/admin/saldos" component={Saldos} />
            </Switch> 
            
      </div>        
    </div>    
)    

}
export default Admin;
