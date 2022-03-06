import styled from "styled-components";
import { popularProducts } from "../data";
import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([])
  const [filterdProducts, setFiltedProducts] = useState([])

  useEffect(() => {
    const getProducts = async  () => {
      try {
        const res = await axios.get(
          cat 
          ? `http://localhost:8080/api/products?category=${cat}`
          : `http://localhost:8080/api/products`
        )
        setProducts(res.data)
      }catch (err) {}
    }
    getProducts()
  },[cat])
  useEffect(()=>{
    cat && setFiltedProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].inclues(value)
        )
      )
    )
  },[products, cat, filters])

  useEffect(()=>{
    if(sort === "newest") {
      setFiltedProducts((prev) => 
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    }else if (sort === 'asc') {
      setFiltedProducts((prev) => 
        [...prev.sort((a,b) => a.price - b.price)]
      )
    }else {
      setFiltedProducts((prev) =>
        [...prev].sort((a,b) => b.price - a.price)
      )
    }

  },[sort])

  return (
    <Container>
      {cat 
        ? filterdProducts.map((item) => <Product item={item} key={item.id} />)
        : products
              .slice(0,8)
              .map(item => <Product item={item} key={item.id} />)
      }
      
    </Container>
  );
};

export default Products;

// {popularProducts.map((item) => (
//         <Product item={item} key={item.id} />
//       ))}