"use client"
import { CustomImage } from "@/components/custom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth")
    }, 3000);

    // cleanup when component unmounts
    return () => clearTimeout(timer);
  }, []);




  return (
    <div className=" w-full h-screen flex justify-center items-center "  >
      <CustomImage
        src="/images/logo.png"
        alt="logo"
        width={140}
        height={40}
        className="w-[140px] h-auto animate-pulse "
      />
    </div>
  );
}
