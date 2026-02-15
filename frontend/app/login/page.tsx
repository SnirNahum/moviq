import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to your account
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a className="text-primary-500 hover:text-primary-600 font-medium cursor-pointer">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
