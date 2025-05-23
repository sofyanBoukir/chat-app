import { Loading } from "@/components/ui/Loading";
import { isAuthenticated } from "@/services/auth";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const IsAuth = () => {
    const [loading,setLoading] = useState(true);
    const [isAuth,setIsAuth] = useState(false);
    const dispatch = useDispatch();

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

    if(loading) return <Loading />
    
    return (
        <div>
            {
                isAuth ? <Outlet /> : <Navigate to={'/login'} />
            }
        </div>
    )
}
