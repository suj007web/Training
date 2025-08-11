"use server"

import { backendUrl } from "@/config";
import { _fetch } from "@/fetch";
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
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body:{
            id : decodedToken?.id ,
            token : token
        }
    })

    redirect(`/logout?success=Logged+out+successfully`)    

}