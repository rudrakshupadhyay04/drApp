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

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-96 h-auto shadow-lg border border-blue-300 bg-white p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-blue-900 text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Please login to book an appointment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-800 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border border-blue-300 focus:ring-blue-500"
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
                className="border border-blue-300 focus:ring-blue-500"
              />
            </div>
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold">
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
