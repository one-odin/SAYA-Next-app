import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/modules/Header/Header";
import Footer from "@/components/modules/Footer/Footer";

const mainFont = localFont({src: "../../public/fonts/YekanBakh/YekanBakh-Regular.woff"});

export const metadata = {
  title: "SAYA Next App",
  description: "Generated by Farhad Hjb",
};

export default function RootLayout({children}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={mainFont.className}>
        <Header />
        <div className="w-full h-auto min-h-screen mx-auto flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}