import { headers } from "next/headers";

export default function Home() {
  const ip = headers().get("x-forwarded-for");
  console.log("headers?", headers())
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>
        IP Address:
        {` ${ip}` || " Not found"}
      </p>
    </main>
  )
}
