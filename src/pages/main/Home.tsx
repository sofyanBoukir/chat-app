import { Header } from "@/components/Header";
import { useSelector } from "react-redux"

export const Home = () => {
    const userData = useSelector(data => data);
        
    return (
        <div>
            <Header />
            <h1 className="text-2xl font-semibold">Welcome to home page {userData?.name}</h1>
        </div>
    )
}
