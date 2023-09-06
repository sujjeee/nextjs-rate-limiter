"use server"

type IPRequestCounts = Map<string, { count: number; expirationTime: number }>;

const ipRequestCounts: IPRequestCounts = new Map();

const maxRequestsPerIP = 3;
const expirationTimeMs = 60 * 1000;

export async function fetchDogImage(ip: string) {
    console.log('user ip', ip)

    if (ip) {
        if (ipRequestCounts.has(ip)) {
            const ipData = ipRequestCounts.get(ip);

            if (ipData && ipData.count >= maxRequestsPerIP) {
                throw Object.assign(new Error('Too many requests. Try again tomorrow'), { statusCode: 429 });
            }

            ipData && ipData.count++;
        } else {
            ipRequestCounts.set(ip, { count: 1, expirationTime: Date.now() + expirationTimeMs });

            setTimeout(() => {
                ipRequestCounts.delete(ip);
            }, expirationTimeMs);
        }
    } else {
        throw Object.assign(new Error('IP address not found in headers.'), { statusCode: 404 });
    }

    const response = await fetch(
        'https://dog.ceo/api/breeds/image/random',
        { cache: "no-store" }
    );
    const { message } = await response.json();

    return { message, ip }
}
