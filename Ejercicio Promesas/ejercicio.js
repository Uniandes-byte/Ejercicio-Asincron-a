/*
Se encarga de realizar fetch al listado de productos. 
*/
function fetchProductos(){
    return fetch('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json')
        .then(response => { return response.json().then( data => {return data;} ) })
            
}

/*
Se encarga de realizar fetch al listado de pedidos. 
*/
function fetchPedidos(){
    return fetch('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json')
        .then(response => { return response.json().then( data => {return data;} ) })
}

/*
Función Main()
*/
async function main(){
    try {
        let dataProducto = await fetchProductos()
        let dataPedidos = await fetchPedidos()
        let dict = {}
        let idProductoMayorCant = "";
        let tempCantidad = 0;

        // Recorrido en el listado de pedidos
        for(let i=0; i<dataPedidos.length; i++){

            // Se encarga de crear un objeto diccionario con el id de todos los productos y la cantidad de veces 
            // que se solicita cada uno.
            let idProducto = dataPedidos[i]["idproducto"]
            let cantidadParcial = parseInt(dataPedidos[i]["cantidad"])

            if(dict.hasOwnProperty( idProducto )){
                dict[idProducto]["cantidad"] += cantidadParcial
            }
            else{
                dict[idProducto] = {"cantidad": cantidadParcial}
            }

            // Actualiza el id del producto que presenta hasta este punto mayor cantidad. 
            let cantidadTotal = dict[idProducto]["cantidad"]

            if(cantidadTotal>tempCantidad) {
                tempCantidad = cantidadTotal
                idProductoMayorCant = dataPedidos[i]["idproducto"]
            }
        }

        // Teniendo en cuenta que el la lista de productos está ordenada por el id del producto, entonces consultamos 
        // el nombre en la posición [idProductoMayorCant-1]. En caso de que no estuviera ordenada, entonces realizamos 
        // un recorrido parcial hasta que encontremos el id del producto para extraer el nombre.
        console.log( dataProducto[parseInt(idProductoMayorCant-1)]["nombreProducto"] + ": " + dict[idProductoMayorCant]["cantidad"])
        
    } catch (error) {
        console.error("Error: ", error)
    }
}

main() 