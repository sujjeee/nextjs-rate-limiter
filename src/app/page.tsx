"use client"

import { fetchProducts } from "@/actions/fetchProducts";
import React from "react";

// Define a TypeScript type for the product data structure
type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

export default function Home() {
  // Create a state variable to store the fetched data
  const [products, setProducts] = React.useState<Product[]>([]);
  const [IP, setIP] = React.useState<string>('');

  // Call the 'fetchProducts' function when the button is clicked
  const handleCallRes = async () => {
    try {
      const getData = await fetchProducts()
      console.log("all data", getData)
      setProducts(getData.data);
      setIP(IP);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="m-6"> your ip:{IP}</p>
      <button className="mt-10 p-3 rounded-lg border bg-white text-black " onClick={handleCallRes}>
        Call function
      </button>
      {/* Map the fetched products */}
      <div className="grid md:grid-cols-3 mx-auto gap-6 ">
        {products.map((product) => (
          <div key={product.id}>
            <a href="#" className=" block overflow-hidden">
              <div className="relative h-[350px] sm:h-[450px] rounded-lg">
                <img
                  src={product.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100 "
                />
              </div>

              <div className="relative bg-white pt-3">
                <h3
                  className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4"
                >
                  {product.title}
                </h3>

                <p className="mt-1.5 tracking-wide text-gray-900">{product.price}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
