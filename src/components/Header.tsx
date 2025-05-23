import AppLogo from '../../public/chatLogo.png';
import { LogOut } from 'lucide-react';
import { ModeToggle } from './ui/mode-toggle';
import { Button } from './ui/button';
import { UpdateForm } from './UpdateForm';

export const Header = () => {

    return (
        <header className="flex items-center justify-between px-6 lg:px-20 py-4 shadow-md">
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
