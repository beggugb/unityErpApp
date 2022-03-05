const initialState = {
  data: [],
  items: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  modalView: false,
  modalViews: false,
  modalViewq: false,
  estado:true,
  tipo:'pdf',
  indicador:0,
  item:{   
    id:'',   
    codigo: '',
    codigoBarras: '',      
    estado: true,      
    nombre:'',
    nombreCorto:'',
    categoriaId:1,
    marcaId:1,
    tipo:'artículo',
    descripcion:'',
    inCatalogo: false,
    inOferta: false,
    precioCosto:0.00,
    precioVenta:0.00,
    pGanancia:0,
    unidad:'unidad',
    modelo:'',
    impuestoIva:0,
    impuestoIt:0,
    pServicio:0,
    stockMinimo:0,
    stockTiempo:0,
    origen:'compra',
    categoria:{
        id:'',
        nombre:''
      },
    marca:{
        id:'',
        nombre:''
    }  
  }    
};

export function articulos(state = initialState, action) {
  switch (action.type) {
     case "ARTICULOS_INDICADOR":
      return {
        ...state,
        indicador: action.value
      };
     case "ARTICULOS_VIEW":
      return {
        ...state,
        modalView: action.view,
        tipo: action.tipo
      }; 
      case "ARTICULOS_BARRAS":
        return {
          ...state,
          modalViews: action.view
        }; 
      case "ARTICULOS_QR":
          return {
            ...state,
            modalViewq: action.view
        };  
      case "ARTICULOS_ITEM":
        return {
          ...state,
          item: action.response
      };  
      case "ARTICULOS_DATA":
        return {
          ...state,
          data: action.response.data,
          pagina: action.response.pagina,
          paginas: action.response.paginas,
          total: action.response.total
      }; 
      case "ARTICULOS_CHANGE":
        return {          
        ...state,
        item:
        {...state.item,
          [action.props]: action.value
        }
      };
    case "ARTICULOS_ADD":
      return {
        ...state,
        item: action.response
      };       
    case "ARTICULOS_RESET_ITEM":
      return {
        ...state,
        item: initialState.item,
        indicador: 0
      };
    case "ARTICULOS_RESET":
      return {
        ...state,
        item: initialState.item,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0
      };  

    case "ARTICULOS_RESET_DATA":
        return {
          ...state,            
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  
    case "ARTICULOS_LISTA":
        return {
          ...state,
          items: action.response
      }; 
            
    default:
      return state;
  }
}
