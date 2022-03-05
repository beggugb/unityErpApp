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
    compra:{
      usuario:{
        id:0,
        nombres:'',
        total:0
      },
      proveedor:{
        id:0,
        razonSocial:''
      },
    },
    compraItems:[],
    cantidadTotal:0,
    sumaTotal:0             
  };
  
export function pagos(state = initialState, action) {
    switch (action.type) {      
      case "PAGOS_RESET_ITEM":
        return {
            ...state,
            nota: {},            
            plan: [],
            compra: initialState.compra,
            compraItems:[]

        };
      case "PAGOS_ADD":
        return {
            ...state,
            nota: action.response.item,            
            plan: action.response.items            
        };
      case "PAGOS_INDICADOR":
        return {
          ...state,
          indicador: action.value,
          estado: action.estado,
          compraId: action.compra
        };
      case "PAGOS_DATA":
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
        case "PAGOS_ITEM":
          return {
            ...state,
            compra: action.response.item,
            compraItems: action.response.items,
            nota: action.response.nota,
            plan: action.response.plan,
            cantidadTotal: action.response.item.nroItems,
            sumaTotal: action.response.item.total
        };                       
      
      default:
        return state;
    }
  }
  
