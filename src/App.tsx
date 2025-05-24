import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { Toaster } from "./components/ui/sonner"
import { IsAuth } from "./funcs/IsAuth"
import { ThemeProvider } from "./components/ui/theme-provider"
import { NotFound } from "./pages/error/NotFound"
import Inbox from "./pages/main/Inbox"
import Home from "./pages/main/Home"

export const App = () => {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Toaster />
                <Routes>
                    <Route element={<IsAuth />}>
                        <Route path="/home" element={<Inbox />} />   
                    </Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ThemeProvider>
        </>
    )
}
