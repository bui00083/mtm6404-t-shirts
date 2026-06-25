import { useState } from "react";
import { createRoot } from "react-dom/client";
const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
];

function App() {
  const [inventory, setInventory] = useState(tshirts);

  const [quantity, setQuantity] = useState({});

  function handleQuantityChange(index, value) {
    setQuantity({
      ...quantity,
      [index]: Number(value)
    });
  }

  function handleStock(index) {
    const selectedQty = quantity[index] || 1;

    const updatedTshirts = inventory.map((product, i) => {
      if (i === index) {
        return { ...product, stock: product.stock - selectedQty };
      }
      return product;
    });
    setInventory(updatedTshirts);
    setQuantity({ ...quantity, [index]: 1 });
  }

  return (
    <div class="container">
      <h1>T-shirts</h1>

      <div class="items">
        {inventory.map((product, index) => (
          <div class="item" key={index}>
            <img src={`./images/${product.image}`}/>
            <h2>{product.title}</h2>
            <p class="price">${product.price}</p>
            {product.stock > 0
              ? <p class="alert ">{product.stock} left!</p>
              : <p class="alert">Out of stock!</p>
            }
            {product.stock > 0 && (
              <>
                <select
                  value={quantity[index] || 1}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                >
                  {Array.from({ length: product.stock }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>

                <button onClick={() => handleStock(index)}>Buy</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);