"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

// {Form Schema Via Zod}
const signInFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
});

const signUpFormSchema = z.object({
  name: z.string(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 8 characters." }),
  confirmPassword: z
    .string()
    .min(5, { message: "Password must be at least 8 characters." }),
});

export function AuthPage() {
  const router = useRouter();

  const signInform = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // SIGNIN SUBMIT HANDLER
  async function SignInSubmitHandler(value: z.infer<typeof signInFormSchema>) {
    const data = await signIn("credentials", {
      username: value.username,
      password: value.password,
      redirect: false
    });
    console.log("SignIn Button Clicked");
    console.log(value);
    console.log(data);

    if (data?.error) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "Kindly check your credentials and try again.",
      })
    } else {
      toast({
        variant: "default",
        title: "Login Successful",
        description: "Welcome to Dashboard.",
      })
      router.push("/dashboard");
    }
  }

  //SIGNUP SUBMIT HANDLER
  async function SignUpSubmitHandler(value: z.infer<typeof signUpFormSchema>) {
    console.log("SignUp Button Clicked");
    const response = await fetch("api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value.name,
        username: value.username,
        email: value.email,
        password: value.password,
      }),
    });

    if (response.ok) {
      toast({
        variant: "default",
        title: "SignUp Successful",
        description: "Welcome to Uploady!",
      })
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Ooops! Something went wrong",
        description: "We'll have a look, Try Again!",
      })
    }
    console.log(value);
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg">
      <Tabs defaultValue="signinform" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="signinform">SignIn</TabsTrigger>
          <TabsTrigger value="signupform">New Here? SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="signinform">
          <div>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  Welcome to Uploady!
                </CardTitle>
                <CardDescription className="text-center">
                  Upload. Share. Track
                </CardDescription>
              </CardHeader>

              {/* Form For SigIn */}
              <CardContent className="grid gap-2">
                <Form {...signInform}>
                  <form
                    onSubmit={signInform.handleSubmit(SignInSubmitHandler)}
                    className="space-y-8"
                  >
                    <FormField
                      control={signInform.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email or username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInform.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Button className="w-full" type="submit">
                      Login
                    </Button>
                  </form>
                </Form>

                <span className=" text-blue-600 hover:underline text-sm">
                  {/* TODO: Add Link to reset password page */}

                  <Link href="/reset-anchor">Forget password ?</Link>
                </span>
              </CardContent>

             
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="signupform">
          <div>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  Join Uploady now!
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to sign up
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Form {...signUpForm}>
                  <form
                    onSubmit={signUpForm.handleSubmit(SignUpSubmitHandler)}
                    className="space-y-8"
                  >
                    <FormField
                      control={signUpForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Choose your Username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Re-enter your Password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
      
                  <Button className="w-full" type="submit">
                    SignUp
                  </Button>
                  </form>
                </Form>
              </CardContent>
              
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <div className="text-gray">
        <p>Created By Akarsh Tripathi for Blinkit</p>
      </div>
    </div>
  );
}
