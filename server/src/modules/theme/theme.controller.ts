import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ThemeObject, ThemeService } from './theme.service';
import { APIResponse } from 'src/domains/common/response';

import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { UpdateDTO } from './dto/update.dto';
import { JwtAuthGuard } from 'src/guards/jwtauth.guard';
import { Theme } from 'src/domains/theme/theme.entity';

@Controller('theme')
export class ThemeController {
    constructor(
        private readonly themeService: ThemeService
    ){
        
    }

    @Get('all')
    async getAllThemes() : Promise<APIResponse<ThemeObject[]>> {
        console.log('Fetching all themes');
        return {
            status: 'success',
            message: 'Themes fetched successfully',
            data: await this.themeService.allTheme()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('getTheme')
    async getThemeByUserId(@CurrentUser() userInfo) : Promise<APIResponse<Theme>> {
        const theme = await this.themeService.getThemeByUserId(userInfo._id);
        if (!theme) {
            throw new Error('Theme not found for the given user ID');
        }
        return {
            status: 'success',
            message: 'Theme fetched successfully',
            data: theme
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    async updateTheme(@CurrentUser() userInfo, @Body() updateDto: UpdateDTO) : Promise<APIResponse<Theme>> {
        const updatedTheme = await this.themeService.updateTheme(userInfo._id, updateDto);
        if(!updatedTheme) {
            throw new Error('Theme update failed');
        }
        return {
            status: 'success',
            message: 'Theme updated successfully',
            data: updatedTheme
        }
    }
}
