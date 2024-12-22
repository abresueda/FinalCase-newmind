//Sepet Öğesi
const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
      <div>
        <h5>{item.name}</h5>
        <p>Price: ${item.price}</p>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
        />
        <button onClick={() => removeItem(item.id)}>Remove</button>
      </div>
    );
  };
  