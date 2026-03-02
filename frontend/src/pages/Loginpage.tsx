import Loginform from "@/components/auth/Loginform";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/layouts/AuthLayout";

const Loginpage = () => {
  return (
    <AuthLayout>
      <div className="container flex flex-col items-center justify-center min-h-screen w-full">
        <div className="mx-auto flex flex-col justify-center w-full space-y-6 max-w-sm">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Access your link dashboard and keep everything organized.
            </p>
          </div>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Continue managing your shortened URLs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Loginform />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Loginpage;
