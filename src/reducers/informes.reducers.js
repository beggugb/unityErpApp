const initialState = {
    total:0,
    suma:0,
    saldo:0,
    pagos:[],
    ventas: [],        
    compras: [],        
    consolidado: [], 
    movimientos:[],   
    existencias:[],  
    cajas:[],
    categorias:[],    
    categoriasDetalle:[],
    data: [],    
    pagina: 0,
    paginas: 0,
    detalle: [],      
    articuloId:0,
    almacenId:0,
    categoriaId:0,
    usuarioId:0,
    labelCategoria:'--Todas--',
    labelAlmacen:'--Todos--',
    labelArticulo:'--Todos--',
    labelUsuario:'--Todos--',
    totales:{
      articulosT: 0,
      clienteT: 0,
      proveedorT: 0,
      compraT:{
        total:0,
        suma:0
      },
      ventaT:{
        total:0,
        suma:0
      },
      notaT:{
        pagoTotal:0,
        saldoTotal:0
      },
    },
    comprasLabel:[],    
    comprasItem:[],
    ventasT:[],
    cobrosTrue:[],
    cobrosFalse:[],
    pagosTrue:[],
    pagosFalse:[]
  };
  
export function informes(state = initialState, action) {
    switch (action.type) {     
      case "INFORMES_DASHBOARD":
        return {          
          ...state,
          totales: action.response,
          comprasLabel: action.response.comprasLabel,
          comprasItem: action.response.comprasItem,
          ventasT: action.response.ventasT,
          cobrosTrue: action.response.cobrosTrue,
          cobrosFalse: action.response.cobrosFalse,
          pagosTrue: action.response.pagosTrue,
          pagosFalse: action.response.pagosFalse

        };
        case "INFORME_SET_USUARIO_ID":
          return {
            ...state,
            usuarioId: action.usuarioId,
            labelUsuario: action.labelUsuario
          };    
      case "INFORME_SET_ARTICULO_ID":
        return {
          ...state,
          articuloId: action.articuloId,
          labelArticulo: action.labelArticulo
        };
      case "INFORME_SET_ALMACEN_ID":
          return {
            ...state,
            almacenId: action.almacenId,
            labelAlmacen: action.labelAlmacen
          }; 
          case "INFORME_SET_CATEGORIA_ID":
            return {
              ...state,
              categoriaId: action.categoriaId,
              labelCategoria: action.labelCategoria
            };    
      case "INFORMES_PAGOS":
              return {          
                ...state,
                pagos: action.response.data,              
                total: action.response.total,
                suma: action.response.suma
            };
            
      case "INFORMES_MOVIMIENTOS":
            return {          
              ...state,
              movimientos: action.response.data,              
              total: action.response.total,
              suma: action.response.suma,
              saldo: action.response.saldo
            }; 
        case "INFORMES_EXISTENCIAS":
              return {          
                ...state,                
                existencias: action.response.data,
                total: action.response.total,
                suma: action.response.suma,
                saldo: action.response.saldo
              }; 
        case "INFORMES_CAJAS":
              return {          
                ...state,                
                cajas: action.response.data,
                total: action.response.total,
                suma: action.response.suma
              };       
        case "INFORMES_CATEGORIAS":
              return {          
                ...state,                
                categorias: action.response.data,
                categoriasDetalle : action.response.detalle
             };            
      case "INFORMES_VENTAS":
        return {          
          ...state,
          detalle: action.response.detalle,
          libros: action.response.data,
          total: action.response.data.total
        };               
      case "INFORMES_CONSOLIDADO":
        return {          
          ...state,
          detalle: action.response.detalle,
          consolidado: action.response.data,
          total: action.response.data.total
        };      

     case "INFORMES_RESET":
        return {
          ...state,
          libros: [],                    
          consolidado:[],
          movimientos:[],
          pagina: 0,
          paginas: 0,
          total: 0,
          suma:0,
          saldo:0,
          desde:'2021-01-01',
          hasta:'2021-12-01',
          detalle:0
        };          
        
      default:
        return state;
    }
  }
  