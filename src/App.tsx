import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@adobe/react-spectrum';

type Product = {
  id: number,
  name: string,
  spec?: string,
  baseUnit: string
  basePrice: number
  baseWeight: number
  firstStock: number
  stock: number
  categoryId: number
  isActive: boolean
}

function App() {
  const [products, setProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    let isLoaded = false;

    async function loadProducts() {
      let res = await fetch("http://localhost:8000/products/", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let json = await res.json();
      
      setProducts(json);
    }

    if(!isLoaded) {
      loadProducts();
    }

    return () => {isLoaded = true}
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <Button variant='cta'>Load</Button>
        {products && products.map((o) => (
          <div key={o.id}>
            <div>{o.name}</div>
            <div>{o.spec || ""}</div>
            <div>{o.basePrice}</div>
            <div>{o.baseUnit}</div>
            <div>{o.baseWeight}</div>
            <div>{o.isActive}</div>
            <div>{o.stock}</div>
            <div>{o.firstStock}</div>
            <div>{o.categoryId}</div>
          </div>
        ))}
      </div>
      </header>
    </div>
  );
}

export default App;
