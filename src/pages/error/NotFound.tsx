import { Box } from "@mui/system";

export const NotFound = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh", 
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.1)", 
                position: "fixed", 
                top: 0,
                left: 0,
                zIndex: 9999,
            }}
            >
            <div className="flex gap-2 items-center">
                <h1 className="text-4xl font-semibold">404</h1>
                <div className="h-10 w-[2px] border border-white"></div>
                <span className="text-xl font-semibold">Page not found</span>
            </div>
        </Box>
    )
}
