
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export const dynamic = 'force-dynamic'
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className=" w-full md:h-24"></div>
        <main className="flex-1 px-[calc(7.5%)] lg:px-[calc(3%+10px)]  xl:px-[calc(7.5%+32px)] min-h-[calc(100vh-96px)]">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
