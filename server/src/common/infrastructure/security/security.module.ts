import { Module } from "@nestjs/common";

import { BcryptPasswordService } from "./bcrypt-password.service";
import { PASSWORD_SERVICE } from "src/common";

@Module({
    providers:[
        {
            provide: PASSWORD_SERVICE,
            useClass: BcryptPasswordService
        }
    ],
    exports: [
        PASSWORD_SERVICE
    ]
})
export class SecurityModule{}