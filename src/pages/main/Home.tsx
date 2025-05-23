import { useSelector } from "react-redux"

export const Home = () => {
    const userData = useSelector(data => data)
    console.log(userData);
    
    return (
        <div>
            <h1 className="text-2xl font-semibold">Welcome to home page</h1>
        </div>
    )
}
