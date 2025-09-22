
import BottomNav from "@/components/BottomNav";
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
      <div className=" w-full md:h-24"></div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r min-h-screen">
          <ProfileSidebar />
        </div>

        {/* Content */}
        <main className="hidden md:block flex-1 py-9 md:px-[calc(7.5%+32px)] lg:px-[calc(3%+10px)]  xl:px-[calc(7.5%+32px)] min-h-screen">{children}</main>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}
