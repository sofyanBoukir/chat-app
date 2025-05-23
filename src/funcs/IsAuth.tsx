import { Loading } from "@/components/ui/Loading";
import { isAuthenticated } from "@/services/auth";
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom";

export const IsAuth = () => {
    const [loading,setLoading] = useState(true);
    const [isAuth,setIsAuth] = useState(false);

    const checkIsUserAuth = async () =>{
        try{
            const response = await isAuthenticated();
            setLoading(false);
            if(response.status === 200){
                setLoading(false)
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

    if(loading) return <Loading />
    
    return (
        <div>
            {
                isAuth ? <Outlet /> : <Navigate to={'/login'} />
            }
        </div>
    )
}
