"use server"

import { backendUrl } from "@/config";
import { _fetch } from "@/fetch";
import { redirect } from "next/navigation";

export async function resetAction(formData : FormData){
    try{
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        const token = formData.get('token') as string;
        if(!password || password.length < 6){
            throw new Error('Password must be at least 6 characters long');
        }
        if(password !== confirmPassword){
            throw new Error('Passwords do not match');
        }
        if(!token){
            throw new Error('Token is required for password reset');
        }



        const response = await _fetch({
            url : `${backendUrl}/password-reset/confirm`,
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                token,
                password,
            },
        })
        if(response.error){
            throw new Error(response.error);
        }
        // }
        // const cookieStore = await cookies();
        // const token = cookieStore.get('reset-token')?.value;
        // if(!token){
        //     throw new Error('Token is required for password reset');
        // }
        // const sessionId = cookieStore.get('sessionId')?.value;
        // const response = await _fetch({
        //     url : `${backendUrl}/password-reset/confirm`,
        //     method : 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: {
        //         token,
        //         password,
        //         sessionId
        //     }
        // })


        // if(response.error){
        //     throw new Error(response.error);
        // }
        // cookieStore.delete('reset-token')
        // cookieStore.delete('sessionId');
        redirect(`/login?success=${encodeURIComponent('Password reset successfully')}`);
    
    }catch(error){
        console.error('Error in resetAction:', error);
        throw error;
    }
}