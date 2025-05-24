import { useState, useRef, useEffect } from "react";
import { SearchIcon, ChevronDown, ChevronUp, X, MessageCircle } from "lucide-react";
import { searchByQuery } from "@/services/user";
import type { UserData } from "@/interfaces";
import { Button } from "./ui/button";
import defaultImage from '../../public/userd_Image.webp'
import { toast } from "sonner";
import { startNew } from "@/services/conversation";

export const SearchInput = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () =>{
            if (query.trim() === "") {
                setResults([]);
            } else {
                const response = await searchByQuery(query);                
                if(response.status === 200){
                    setResults(response.data.users)
                }
            }
        }
        fetchData();
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsFocused(false);
            setIsExpanded(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const startConv = async (userId: string) =>{
        toast.promise(startNew(userId),{
            loading: '...Sending',
            success: (res) => res.data.message,
            error: (error) => error.response.data.message
        })
    }

    const clearSearch = () => {
        setQuery("");
        setIsFocused(true);
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
            <div className="relative text-gray-700">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="w-full border border-gray-300 dark:text-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="Search for users"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        setIsFocused(true);
                        setIsExpanded(true);
                    }}
                    autoComplete="off"
                />
                {query && (
                <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-8 flex items-center pr-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
                )}
                <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                ) : (
                    <ChevronDown className="w-5 h-5" />
                )}
                </button>
            </div>

            {isFocused && isExpanded && (
                <div className="absolute bg-white z-50 mt-2 w-[100%] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-200 transform origin-top dark:bg-gray-900">          
                    {results.length > 0 ? (
                        <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto rounded-xl shadow-sm bg-white dark:bg-gray-900">
                            <ul>
                            {results.map((user: UserData) => (
                                <li
                                key={user._id}
                                className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer group transition-all"
                                >
                                <div className="flex items-center gap-3">
                                    {
                                        user.profilePictureUrl ? 
                                            <img
                                                src={user.profilePictureUrl}
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full object-cover transition border-2 border-white"
                                            />
                                        : <img
                                                src={defaultImage}
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full object-cover transition border-2 border-white"
                                            />
                                    }
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white text-base">
                                            {user.username}
                                        </span>
                                        <span className="text-sm text-gray-500">{user.name}</span>
                                    </div>
                                </div>
                    
                                <Button
                                    onClick={() => startConv(user._id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 flex items-center gap-2 text-sm"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Start
                                </Button>
                                </li>
                            ))}
                            </ul>
                    </div>
                    ) : (
                    <div className="px-4 py-6 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">No results</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            We couldn&quot;t find any results matching &quot;{query}&quot;
                        </p>
                        <button
                            onClick={clearSearch}
                            className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Clear search
                        </button>
                    </div>
                )}
                </div>
            )}
        </div>
    );
};