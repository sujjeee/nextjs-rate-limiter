import React from "react";
import { headers } from "next/headers";
import ShowDog from "@/components/ShowDog";

export default function Home() {

  const ip = headers().get("x-forwarded-for")!;

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="my-10">
        <p>Your IP : {ip}</p>
      </div>
      <ShowDog ip={ip} />
    </main>
  );
}
