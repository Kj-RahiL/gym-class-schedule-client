import { Suspense } from "react";
import LoginForm from "./LoginFrom";
import bgLogin from "../../../public/assets/loginBg.jpg";
import { Button } from "@nextui-org/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgLogin.src})` }}
      >
        <div className="py-5 pl-10">
            <Link href='/'><Button><ArrowLeft/>Back to Home</Button></Link>
        </div>
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
