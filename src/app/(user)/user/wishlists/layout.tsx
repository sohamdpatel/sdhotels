
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProfileSidebar from "@/components/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className=" w-full h-24"></div>
        <main className="flex-1 md:px-[calc(7.5%+32px)] lg:px-[calc(3%+10px)]  xl:px-[calc(7.5%+32px)] min-h-[calc(100vh-96px)]">{children}</main>
      <Footer />
    </div>
  );
}
