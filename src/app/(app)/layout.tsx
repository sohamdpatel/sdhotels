import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sd travel",
  description: "Here you can book your stay at best price",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-col">
        <Header />
        <main>
            {children}
        </main>
        <Footer />
        <BottomNav />
    </div>

  );
}
