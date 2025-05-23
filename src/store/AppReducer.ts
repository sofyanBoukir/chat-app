import { type UserData } from "@/interfaces"

const initialState:UserData = {
    username: '',
    name: '',
    profile_picture: '',
    createdAt: '',
    updatedAt: '',
}

type Action = {
    type :'UPDATE_USERDATA',
    payload: UserData
}

export const Appreducer = (state=initialState, action: Action): UserData =>{
    switch(action.type){
        case 'UPDATE_USERDATA':
            return action.payload
        
        default:
            return state
    }
}