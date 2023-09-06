"use server"

import { headers } from "next/headers";
// Define a type for IP request counts
type IPRequestCounts = Map<string, { count: number; expirationTime: number }>;

// Create a map to store IP addresses and their request counts
const ipRequestCounts: IPRequestCounts = new Map();

const maxRequestsPerIP = 3;
const expirationTimeMs = 60 * 1000; // 1 minute in milliseconds

export async function fetchDogImage() {
    // const ip = headers().get("x-forwarded-for");
    const ip = '192.168.0.1';
    console.log('user ip', ip)

    // Check if the IP address exists and is not null
    if (ip) {
        // Check if the IP address exists in the request counts map
        if (ipRequestCounts.has(ip)) {
            const ipData = ipRequestCounts.get(ip);


            // Check if the IP has exceeded the maximum number of requests
            if (ipData && ipData.count >= maxRequestsPerIP) {
                throw new Error('Too many requests. Try again tomorrow.');
            }

            // Increment the request count for this IP
            ipData && ipData.count++;
        } else {
            // If the IP address doesn't exist in the map, initialize it with a count of 1 and an expiration time
            ipRequestCounts.set(ip, { count: 1, expirationTime: Date.now() + expirationTimeMs });

            // Set a timeout to delete the IP entry after 1 minute
            setTimeout(() => {
                ipRequestCounts.delete(ip);
            }, expirationTimeMs);
        }
    } else {
        throw new Error('IP address not found in headers.'); // Handle the case where IP is null
    }

    const response = await fetch(
        'https://dog.ceo/api/breeds/image/random',
        { cache: "no-store" }
    );
    const { message } = await response.json();

    return { message, ip }
}
