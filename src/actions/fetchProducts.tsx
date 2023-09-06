"use server"

import { headers } from "next/headers";

export async function fetchProducts() {
    const ip = headers().get("x-forwarded-for");
    console.log('user ip', ip)

    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    return { data, ip }

}
