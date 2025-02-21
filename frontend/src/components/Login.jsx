import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { toast } = useToast();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        console.log("User Data:", res.data.user);
        toast({
          title: "Login successfull!!",
          variant: "success",
        });
      } else {
        toast({
          title: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "Something went wrong. Please try again.",
        description: `${error.response.data.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-96 h-auto shadow-lg border border-blue-300 bg-white p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-blue-900 text-2xl font-bold">
            Login
          </CardTitle>
          <CardDescription className="text-gray-600">
            Please login to book an appointment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSignin}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-800 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-blue-300 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-blue-300 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-900 font-medium">Role</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="doctor"
                    name="role"
                    value="doctor"
                    checked={role === "doctor"}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-blue-900 focus:ring-blue-500"
                  />
                  <Label htmlFor="doctor">Doctor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="patient"
                    name="role"
                    value="patient"
                    checked={role === "patient"}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-blue-900 focus:ring-blue-500"
                  />
                  <Label htmlFor="patient">Patient</Label>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold"
            >
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
