"use server"

import { backendUrl } from "@/src/utils/config";
import { _fetch } from "@/src/utils/fetch";
import { parseJwt } from "@/lib/utils";

import { cookies } from "next/headers"
import { redirect } from 'next/navigation';
export async function logoutAction(){
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const decodedToken = parseJwt(token || '')
    cookieStore.delete('token')
    cookieStore.delete('selectedTheme')

    const response = await _fetch({
        url: `${backendUrl}/user/logout`,
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:{
            id : decodedToken?.id ,
            token : token
        }
    })
    console.log('Logout response:', response);
    redirect(`/logout?success=Logged+out+successfully`)    

}