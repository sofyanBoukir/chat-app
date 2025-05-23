export interface LoginForm {
    username: string,
    password: string,
}

export interface RegisterForm extends LoginForm {
    name: string,
}

export interface UserData {
    name: string,
    username: string, 
    profile_picture?: string,
    createdAt: string, 
    updatedAt: string,
}