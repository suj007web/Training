"use server"
import SibApiV3Sdk from "sib-api-v3-sdk";
import { brevoApiKey } from "@/src/utils/config";

import { _fetch } from "@/src/utils/fetch";

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