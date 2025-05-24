import { MessageCircle, Search, User, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/ui/mode-toggle';
import appLogo from '../../../public/chatLogo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/services/auth';
import { Link } from 'react-router-dom';
import { UpdateForm } from '@/components/UpdateForm';

export default function Home() {
    const [loading,setLoading] = useState(true);
    const [isAuth,setIsAuth] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector(data => data);
    
    const checkIsUserAuth = async () =>{
        try{
            const response = await isAuthenticated();
            setLoading(false);
            if(response.status === 200){
                setIsAuth(true)
                dispatch({type:'UPDATE_USERDATA',payload:response.data.user})
            }
        }catch{
            setIsAuth(false)
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(() =>{
        checkIsUserAuth();
    },[])
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img 
                        src={appLogo} 
                        alt="App Logo" 
                        width={144} 
                        height={64} 
                        className="cursor-pointer" 
                        />
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                        Features
                    </a>
                    <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                        How It Works
                    </a>
                    
                    <ModeToggle />
                    
                    {loading ? (
                        <div className="w-24 h-10 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
                    ) : isAuth && userData ? (
                        <UpdateForm />
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                                <Link to={'/login'}>
                                    Sign In
                                </Link>
                            </Button>
                            <Button size="sm">
                                <Link to={'/register'}>
                                    Get Started
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </nav>

            <section className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Connect & Chat in <span className="text-primary">Real-Time</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        A seamless chatting experience with customizable profiles, user search, and instant messaging.
                    </p>
                    <div className="flex space-x-4">
                        <Button className="px-8 py-6 text-lg">
                            <Link to={'/home'}>
                                Start Chatting Now
                            </Link>
                        <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" className="px-8 py-6 text-lg">
                        Learn More
                        </Button>
                    </div>
                </div>
                <div className="md:w-1/2 relative">
                    <div className="bg-card rounded-2xl p-6 shadow-lg border">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">John Doe</p>
                                    <p className="text-sm text-muted-foreground">last active less than 2mins</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 overflow-y-auto mb-4 space-y-4">
                            <div className="flex justify-start">
                                <div className="dark:bg-gray-800 bg-gray-100 rounded-2xl p-3 max-w-xs">
                                    <p>Hey there! How are you doing?</p>
                                    <p className="text-xs text-muted-foreground mt-1">2:30 PM</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-blue-600 dark:text-white text-primary-foreground rounded-2xl p-3 max-w-xs">
                                    <p>I'm doing great! Just finished the new chat UI.</p>
                                    <p className="text-xs mt-1">2:32 PM</p>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="dark:bg-gray-800 bg-gray-100 rounded-2xl p-3 max-w-xs">
                                    <p>That looks awesome! Can't wait to try it out.</p>
                                    <p className="text-xs text-muted-foreground mt-1">2:33 PM</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center bg-muted rounded-full px-4 py-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent border-none focus:outline-none placeholder:text-muted-foreground"
                            />
                            <button className="text-primary hover:text-primary/80">
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        <section id="features" className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-16">Powerful Features</h2>
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="bg-card rounded-xl p-8 border hover:border-primary transition-colors">
                        <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary">
                            <User className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Custom Profiles</h3>
                        <p className="text-muted-foreground">
                            Personalize your profile with a username, profile picture, and status.
                        </p>
                    </div>
                    <div className="bg-card rounded-xl p-8 border hover:border-primary transition-colors">
                        <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary">
                            <Search className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">User Search</h3>
                        <p className="text-muted-foreground">
                            Easily find and connect with other users through our search functionality.
                        </p>
                    </div>
                    <div className="bg-card rounded-xl p-8 border hover:border-primary transition-colors">
                        <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary">
                            <MessageCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Real-Time Chat</h3>
                        <p className="text-muted-foreground">
                            Instant messaging with read receipts and typing indicators.
                        </p>
                    </div>
                </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-6 py-20 bg-card rounded-3xl my-10">
                <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                        1
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
                        <p className="text-muted-foreground">
                        Set up your account with a username and profile picture.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                        2
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Find Friends</h3>
                        <p className="text-muted-foreground">
                        Search for users and send them connection requests.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                        3
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Start Chatting</h3>
                        <p className="text-muted-foreground">
                        Click "Start Conversation" and begin your real-time chat.
                        </p>
                    </div>
                </div>
        </section>

            <section className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Connect?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join thousands of users already enjoying seamless real-time communication.
                </p>
                <Button className="px-10 py-7 text-lg">
                    <Link to={'/home'}>
                        Get Started for Free
                    </Link>
                </Button>
            </section>

            <footer className="border-t py-10">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img src={appLogo} alt="App Logo" className="w-36 h-16 cursor-pointer" />
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
                        <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
                        <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
  );
}