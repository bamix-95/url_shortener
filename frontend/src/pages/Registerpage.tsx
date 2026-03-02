import Registerform from "@/components/auth/Registerform";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/layouts/AuthLayout";

const Registerpage = () => {
  return (
    <AuthLayout>
      <div className="container flex flex-col items-center justify-center min-h-screen w-full">
        <div className="mx-auto flex flex-col justify-center w-full space-y-6 max-w-sm">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Start shortening, tracking, and managing your links in seconds.
            </p>
          </div>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Enter your details below to create your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Registerform />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Registerpage;
