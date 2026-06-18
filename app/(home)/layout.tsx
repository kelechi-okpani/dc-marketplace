import type { Metadata } from "next";
import Navbar from "@/component/Layout/Navbar";
import Footer from "@/component/Layout/Footer";

export const metadata: Metadata = {
  title: "Dominion Enterprise Portal",
  description: "Secure multi-role marketplace ecosystem.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col w-full ">
      <Navbar />
      {/* <main className="flex-grow flex flex-col justify-center max-w-6xl">
        {children}
      </main> */}

      <main className="flex-grow flex flex-col items-center w-full">
          {/* <div className="w-full max-w-6xl"> */}
          <div className="w-full">
            {children}
          </div>
        </main>
      {/* <Footer /> */}
    </div>
  );
}