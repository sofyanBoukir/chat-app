import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { Toaster } from "./components/ui/sonner"
import { IsAuth } from "./funcs/IsAuth"
import { Home } from "./pages/main/Home"

export const App = () => {
    return (
        <>
            <Toaster />
            <Routes>
                <Route element={<IsAuth />}>
                    <Route path="/home" element={<Home />} />   
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}
