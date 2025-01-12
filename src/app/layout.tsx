import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import ClientLayout from "../../layout/ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Welcome To Fin Coopers",
  description: "This is customer record website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="description" content="This is customer record website" />
        <title>Welcome To Fin Coopers</title>
      </Head>
      <body className={`${poppins.className} main-leyar-side-bar`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
