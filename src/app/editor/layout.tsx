// app/editor/layout.tsx
import React from "react";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "~/app/_components/mainSidebar";
import Topbar from "~/app/_components/mainTopbar";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden"> {/* Added overflow-hidden */}
      {/* Navbar lateral */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden"> {/* Added overflow-hidden */}
        {/* Navbar superior */}
        <Topbar user={session.user} />

        {/* Contenido principal */}
        <main className="flex-1 p-4 bg-gray-100 overflow-auto"> {/* Changed to overflow-auto */}
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}