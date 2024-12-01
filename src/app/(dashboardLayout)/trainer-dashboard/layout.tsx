import type { Metadata } from "next";
import TrainerLayout from "./layout/TrainerLayout";

export const metadata: Metadata = {
  title: "Recipe Sharing Community",
  description: "Generated by @KJ-RahiiL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TrainerLayout>{children}</TrainerLayout>
    </div>
  );
}
