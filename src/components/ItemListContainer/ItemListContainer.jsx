import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import {consultarBDD} from '../../assets/funciones.js'

//Consulta base de datos
const ItemListContainer = ({greeting}) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        consultarBDD().then(productList => {
            const cardProductos = ItemList({productList})
            setProductos(cardProductos)
            
        })
    }, []);
    console.log(productos)

//[] cuando suceden cambios en todo el array
//[propiedad] cuando se modifica un objeto interno del array
    
    return (
        
            
            <div className="row cardProductos">
                {productos}
            </div>
        
    );
}

export default ItemListContainer;
