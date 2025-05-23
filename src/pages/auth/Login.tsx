import { Lock, Eye, EyeOff, Loader2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/auth";
import { type LoginForm } from "@/interfaces";

export const Login = () => {
    const [formData, setFormData] = useState<LoginForm>({
        username: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");
        
        try {
            const response = await login(formData);
            if(response.status === 200){
                navigate('/home');
            }

        } catch {
            setError("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

  return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-xl rounded-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="relative p-0">
                        <div className="p-6 pb-0">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-sm text-center text-gray-500">
                            Sign in to access your account
                        </p>
                    </div>
                </CardHeader>
                
                <CardContent className="p-6">
                    {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </motion.div>
                    )}
                    
                    {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {success}
                    </motion.div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-5" >
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                            </Label>
                            <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="pl-10 py-5 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                            </Label>
                            <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 py-5 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                            </div>
                        </div>
                        
                        
                        <Button
                            type="submit"
                            className="w-full py-6 cursor-pointer rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                            ) : (
                            "Sign In"
                            )}
                        </Button>
                    </form>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                    <div className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to={'/register'}  className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                        Sign up
                    </Link>
                    </div>
                </CardFooter>
                </Card>
                
                <div className="mt-6 text-center text-xs text-gray-400">
                By continuing, you agree to our{" "}
                <a href="#" className="hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="hover:underline">Privacy Policy</a>.
                </div>
            </motion.div>
        </div>
    );
};