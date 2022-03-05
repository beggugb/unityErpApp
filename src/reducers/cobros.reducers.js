const initialState = {
    data: [],
    total:0,
    pagina:0,    
    indicador: 0,
    estado:false,
    indicadorTotal: 0,
    ventaId:0,
    compraId:0,
    plan:[],
    nota:{},
    venta:{
      usuario:{
        id:0,
        nombres:''
      },
      cliente:{
        id:0,
        nombres:''
      },
    },
    ventaItems:[],
    cantidadTotal:0,
    sumaTotal:0             
  };
  
export function cobros(state = initialState, action) {
    switch (action.type) {      
      case "COBROS_RESET_ITEM":
        return {
            ...state,
            nota: {},            
            plan: [],
            venta: initialState.venta,
            ventaItems:[]

        };
      case "COBROS_ADD":
        return {
            ...state,
            nota: action.response.item,            
            plan: action.response.items            
        };
      case "COBROS_INDICADOR":
        return {
          ...state,
          indicador: action.value,
          estado: action.estado,
          ventaId: action.venta
        };
      case "COBROS_DATA":
        return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            indicador: 0,
            estado:false,
            indicadorTotal: 0
        };
        case "COBROS_ITEM":
          return {
            ...state,
            venta: action.response.item,
            ventaItems: action.response.items,
            nota: action.response.nota,
            plan: action.response.plan,
            cantidadTotal: action.response.item.nroItems,
            sumaTotal: action.response.item.total
        };                       
      
      default:
        return state;
    }
  }
  
