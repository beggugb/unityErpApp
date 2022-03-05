import { combineReducers } from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';
import { usuarios } from "./usuarios.reducers";
import { articulos } from "./articulos.reducers";
import { categorias } from "./categorias.reducers";
import { marcas } from "./marcas.reducers";
import { proveedores } from "./proveedores.reducers";
import { compras } from "./compras.reducers";
import { clientes } from "./clientes.reducers";
import { ventas } from "./ventas.reducers";
import { empresas } from "./empresas.reducers";
import { informes } from "./informes.reducers";
import { cajasitems } from "./cajasitems.reducers";
import { cajas } from "./cajas.reducers";
import { almacenes } from "./almacenes.reducers";
import { tareas } from "./tareas.reducers";
import { cobros } from "./cobros.reducers";
import { pagos } from "./pagos.reducers";
import { pucs } from "./pucs.reducers";
import { comprobantes } from "./comprobantes.reducers";
import { contables } from "./contables.reducers";
import { procesos } from "./procesos.reducers";
import { tdcs } from "./tdcs.reducers";

const rootReducer = combineReducers({
    usuarios,
    tdcs,
    informes,
    comprobantes,
    procesos,
    contables,
    pucs,
    pagos,
    articulos,
    tareas,
    almacenes,
    cajas,
    cajasitems,
    categorias,
    clientes,
    empresas,
    marcas,
    proveedores,
    ventas,
    compras,
    cobros,
    toastr: toastrReducer
});

export default rootReducer;