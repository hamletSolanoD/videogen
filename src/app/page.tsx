// app/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  // Redirección del lado del servidor
  if (session?.user) {
    redirect("/editor/chatlist");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
           <span className="text-[hsl(280,100%,70%)]"> Video Gen </span> Editor
          </h1>
          {/* ... resto de tu código ... */}
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <Link
                href="/api/auth/signin"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}