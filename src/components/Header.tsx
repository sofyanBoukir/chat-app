import type { UserData } from '@/interfaces';
import AppLogo from '../../public/chatLogo.png';
import { LogOut, UserCircle } from 'lucide-react';

interface HeaderProps {
    user: UserData
}

export const Header = ({userData}:{}) => {
    const username = "TestUser";
    const handleLogout = () => {
        console.log("Logging out...");
    };

    return (
        <header className="flex items-center justify-between bg-white px-6 lg:px-20 py-4 shadow-md">
            <div className="flex items-center space-x-2">
                <img src={AppLogo} alt="App Logo" className="w-36 h-16" />
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <UserCircle className="w-8 h-8 text-gray-600" />
                    <span className="text-gray-700 font-medium">{username}</span>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
                >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                </button>
            </div>
        </header>
    );
};
