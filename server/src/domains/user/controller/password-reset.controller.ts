import { Controller, Post, Body } from '@nestjs/common';
import { PasswordResetService } from '../services';
import { CreateTokenDTO, ConfirmResetDTO } from '../dto';
import { APIResponse } from 'src/common';
import { PasswordResetToken, User } from 'src/domains/user/schemas';

@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService
  ) { }

  @Post('start')
  async startReset(@Body() createDto: CreateTokenDTO): Promise<APIResponse<PasswordResetToken>> {

    const response = await this.passwordResetService.createToken(createDto);

    return {
      status: 'success',
      message: 'Password reset token created successfully',
      data: response
    }
  }

  @Post('confirm')
  async resetConfirm(@Body() confirmResetDto : ConfirmResetDTO) : Promise<APIResponse<Partial<User>>> {
    const response = await this.passwordResetService.validateRequest(confirmResetDto);

    return {
      status: 'success',
      message: 'Password reset confirmed successfully',
      data: response
    }
  }

}


// import { Controller, Post, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
// import type { FastifyRequest, FastifyReply } from 'fastify';
// import { UserService } from '../user/user.service';
// import { promisify } from 'util';

// @Controller('password-reset')
// export class PasswordResetController {

//     constructor(
//         private readonly userService : UserService
//     ){}

//   @Post('start')
//   async startReset(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
//     const { token, id } = req.body as { token: string, id : string };

//     req.session.token = token;
//     req.session.id = id;
//     return res.status(200).send({ status: 'success', message: 'Reset session started' });
//   }

//   @Post('confirm')
//   async isValid(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
//     console.log("Validating reset session...");
//     const { token, password, sessionId } = req.body as { token: string, password: string, sessionId: string };
//   const sessionStoreGet = promisify(req.sessionStore.get).bind(req.sessionStore);
//   console.log("Sesion Store get" , sessionStoreGet);
//   console.log("Session ID", sessionId);
//   const sessionData = await sessionStoreGet(sessionId);

//     console.log("Session Data", sessionData);

//   if (!sessionData) {
//     throw new HttpException('Session not found or expired', HttpStatus.UNAUTHORIZED);
//   }

//   if (sessionData.token !== token) {
//     throw new HttpException('Invalid reset token', HttpStatus.UNAUTHORIZED);
//   }


//   const userId = sessionData.id;
  
//   await this.userService.editUser(userId, { password });

//     console.log("Password reset successful for user ID:", userId);
//     req.session.destroy()


//     return res.status(200).send({ status: 'success', message: 'Reset session is valid' });
//   }

// }
