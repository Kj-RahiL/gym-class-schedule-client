import Footer from "@/components/shared/Footer";
import NavbarPage from "@/components/shared/Navbar";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GYM FIT",
  description: "GYm CLass Schedule Wwb App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto container">
      <NavbarPage />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
