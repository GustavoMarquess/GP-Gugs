import { useState, useEffect } from "react";
import "./styles.css";
import Card from "../../components/Card";

interface ProdutoProps {
  id: string;
  thumbnail: string;
  title: string;
  price: string;
  description: string;
}

export function Home() {
  const [produtos, setProdutos] = useState<ProdutoProps[]>([]);

  useEffect(() => {
    function getProducts() {
      //fetch("https://dummyjson.com/products?limit=3")
      fetch('https://dummyjson.com/products/search?q=perfume')
        .then((response) => response.json())
        .then((data) => {
          setProdutos(data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getProducts();
  }, []);

  return (
    <>
      <div className="bannerHome">
        <h1>Vitrine de Produtos</h1>
      </div>
      <main>
        <section className="vitrine">
          {produtos.map((produto, index) => (
            <Card
              key={index}
              imageUrl={produto.thumbnail}
              title={produto.title}
              price={produto.price}
              description={produto.description}
              buttonUrl={`/produtos/${produto.id}`}
            />
          ))}
        </section>
      </main>
    </>
  );
}
