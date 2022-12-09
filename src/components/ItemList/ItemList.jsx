import Item from '../Item/Item';
//Modificar array de objeto
const ItemList = ({productList}) => {
    console.log(productList)
    return (
        <>
            {productList.map (product => <Item key={product.id} producto = {product}/>)}
        </>
    );
}

export default ItemList;
