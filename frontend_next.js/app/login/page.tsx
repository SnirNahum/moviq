import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <Image
        src="/background_image.jpg"
        alt="Background image"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to your account
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <a className="text-primary-500 hover:text-primary-600 font-medium cursor-pointer">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
