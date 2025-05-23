import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import userDefaultImage from '../../public/userd_Image.webp'
import { toast } from 'sonner';
import { updateProfile } from '@/services/user';

export function UpdateForm() {
    const userData = useSelector(data => data);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
  
    useEffect(() => {
        if (userData) {
            setName(userData.name || '');
            setUsername(userData.username || '');
            setProfilePicPreview(userData.profilePictureUrl || null);
        }
    }, [userData]);
  
    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePicFile(file);
            setProfilePicPreview(URL.createObjectURL(file));
        }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirmation do not match");
            return;
        }
    
        if (newPassword && !oldPassword) {
            setPasswordError("Please enter your old password to change it");
            return;
        }
    
        setPasswordError(null);
    
        const formData:FormData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        if (profilePicFile) formData.append('profile_picture', profilePicFile);
        if (oldPassword) formData.append('oldPassword', oldPassword);
        if (newPassword) formData.append('newPassword', newPassword);
    
    
        toast.promise(updateProfile(formData),{
            loading: '...Updating',
            success: (res) => {
                return res.data.message
            },
            error: (err) => err.response.data.message
        })
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center space-x-3 cursor-pointer group">
            <img
              src={profilePicPreview || userDefaultImage}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover transition border-2 border-white"
            />
          </div>
        </DialogTrigger>
  
        <DialogContent className="sm:max-w-lg rounded-lg p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold dark:text-gray-300 mb-1">Edit Profile</DialogTitle>
            <DialogDescription className="text-gray-400 mb-6">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <img
                src={profilePicPreview || userDefaultImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-md"
              />
              <label
                htmlFor="profilePic"
                className="cursor-pointer inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Change Picture
              </label>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>
  
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-medium text-gray-500">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className="col-span-3"
                required
              />
            </div>
  
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right font-medium text-gray-500">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="@username"
                className="col-span-3"
                required
              />
            </div>
  
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="oldPassword" className="text-right font-medium text-gray-500">
                Old Password
              </Label>
              <Input
                id="oldPassword"
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                className="col-span-3"
                autoComplete="current-password"
              />
            </div>
  
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPassword" className="text-right font-medium text-gray-500">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="col-span-3"
                autoComplete="new-password"
              />
            </div>
  
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right font-medium text-gray-500">
                Confirm it
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="col-span-3"
                autoComplete="new-password"
              />
            </div>
  
            {passwordError && (
              <p className="col-span-4 text-center text-sm text-red-600 font-semibold">{passwordError}</p>
            )}
  
            <DialogFooter className="flex justify-end">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }