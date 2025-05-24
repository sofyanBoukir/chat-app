import AppLogo from '../../public/chatLogo.png';
import { LogOut } from 'lucide-react';
import { ModeToggle } from './ui/mode-toggle';
import { Button } from './ui/button';
import { UpdateForm } from './UpdateForm';

export const Header = () => {

    return (
        <header className="flex h-[10vh] items-center justify-between px-6 lg:px-20 py-4 shadow-md bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
            <div className="flex items-center space-x-2">
                <img src={AppLogo} alt="App Logo" className="w-36 h-16 cursor-pointer" />
            </div>
            <div className="flex items-center space-x-4">
                <UpdateForm />

                <ModeToggle />
                
                <Button variant="outline" size="icon">
                    <LogOut />
                </Button>
            </div>
        </header>
    );
};
