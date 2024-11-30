import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chef's Circle",
  description: "Recipe Sharing Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto container">
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}
