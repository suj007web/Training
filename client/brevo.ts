"use server"
import SibApiV3Sdk from "sib-api-v3-sdk";
import { backendUrl, brevoApiKey } from "./config";



import { _fetch } from "@/fetch";
import { redirect } from "next/navigation";



process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export async function forgotAction(formData: FormData) {
    try {
        const email = formData.get('email') as string;

        if (!email || !email.includes('@')) {
            throw new Error('Please provide a valid email address');
        }

        // const user = await _fetch({
        //     url : `${backendUrl}/user/getId/${email}`,
        // })

        // console.log('User fetched:', user.data);
        // const id = user.data;

        const token = crypto.randomUUID();

        // const storeSession = await _fetch<{
        //     sessionId : string
        // }>({
        //     url : `${nextPublicBackendUrl}/api/password-reset/start`,
        //     method : 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: {
        //         id,
        //         token
        //     },
        //     credentials: true,
        // })
        // if (storeSession.error) {
        //     throw new Error(storeSession.error);
        // }
        // console.log('Session stored successfully:', storeSession);

        const response = await _fetch({
            url : `${backendUrl}/password-reset/start`,
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email,
                token
            }
        })

        if(response.error){
            throw new Error(response.error);
        }

        const resetLink = `${process.env.RESET_URL}?token=${token}`;

        // const cookieStore = await cookies();
        // const cookieStore = await cookies();
        // if(storeSession.data){
        //     cookieStore.set('sessionId', storeSession.data.sessionId, {
        //         maxAge : 60 * 15 , // 15 minutes
        //         httpOnly: true,
              
        //     });
        // }
        // cookieStore.set('reset-token', token, {
        //     maxAge: 60 * 15, // 15 minutes
        //     httpOnly: true,
        //     // secure: process.env.NODE_ENV === 'production',
        // })
        const res = await sendEmail(email, resetLink);


        redirect(`/forgot-password/success`);

    } catch (e) {
        console.error('Error in forgot password action:', e);
        throw e;
    }
}

export async function sendEmail(email: string, resetLink: string) {
            const defaultClient = SibApiV3Sdk.ApiClient.instance;
        defaultClient.authentications["api-key"].apiKey = brevoApiKey;
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const sendSmtpEmail = {
            to: [{ email }],
            sender: { name: "Control Panel", email: "sujal.chauhan@myrealdata.in" },
            subject: "Reset Your Password",
            htmlContent: `
                <p>Hello,</p>
                <p>You requested to reset your password.</p>
                <p><a href="${resetLink}">Click here to reset your password</a></p>
                <p>If you did not request this, please ignore this email.</p>
            `
        };
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`Password reset link sent to ${email}`);    
}