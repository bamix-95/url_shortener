import { registerUser } from "@/lib/api/auth";
import useAuthStore from "@/store/auth-store";
import {
  registerSchema,
  type RegisterPayloadType,
} from "@/validators/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const Registerform = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { setAuthUser } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<RegisterPayloadType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const handleRegister = async (registerData: RegisterPayloadType) => {
    setIsloading(true);

    try {
      const res = await registerUser(registerData);

      if (res.success && res.data) {
        toast.success(res.message || "User registered successfully");
        setAuthUser(res.data);
        form.reset();
        navigate("/dashboard");
      } else {
        toast.error(res.message || "User registration failed...");
        setAuthUser(null);
      }
    } catch (error: unknown) {
      let message = "User registration failed...";

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    type="text"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*******"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : "Sign up"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm text-muted-foreground mt-4">
        Have an account?{" "}
        <Link
          to="/login"
          className="hover:text-primary hover:underline underline-offset-2 transition-all duration-200 ease-in-out"
        >
          Sign in
        </Link>
      </div>
    </>
  );
};

export default Registerform;
