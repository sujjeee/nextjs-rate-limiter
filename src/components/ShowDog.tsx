"use client"

import { fetchDogImage } from "@/actions/fetchDogImage";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowDog({ ip }: { ip: string }) {
    const [image, setImage] = React.useState<string>('https://images.dog.ceo/breeds/terrier-tibetan/n02097474_4959.jpg');
    const [isloading, setIsloading] = React.useState(false)

    const getNewDog = async () => {
        try {
            setIsloading(true)
            const getData = await fetchDogImage(ip)
            setImage(getData.message);
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            if (error instanceof Error) {
                toast.error('Too many requests. Please try later.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    return (
        <main className="flex flex-col items-center justify-between">
            <img
                src={image}
                alt=""
                className="w-[500px] h-[500px] border rounded-lg  object-contain" />
            <button
                className="mt-10 p-3 rounded-lg border bg-white text-black w-full"
                onClick={getNewDog}
                disabled={isloading}
            >
                {isloading ? (
                    "Loading..."
                ) : (
                    "Show new dog"
                )}
            </button>
            <ToastContainer />
        </main>
    );
}
