import { Injectable, Inject } from '@nestjs/common';
import { THEME_REPOSITORY } from 'src/common/infrastructure/database';
import { Theme, ThemeColorMap } from './entities';
import type { ThemeRepository } from './ports';
import { UpdateDTO } from './dto';


export type ThemeObject = {
  name: string;
  value: string;
  color: string;
};


@Injectable()
export class ThemeService {
    constructor(
        @Inject(THEME_REPOSITORY)
        private readonly themeRepository: ThemeRepository,

    ) { }

    private generateThemes(): ThemeObject[] {
  return Object.entries(ThemeColorMap).map(([key, value]) => {
    return {
      name: `Theme ${key.replace('theme', '')}`, 
      value: key,
      color: value,
    };
  });
}

    async allTheme() {
        const themes = this.generateThemes();
        return themes;
    }

    async createTheme(userId: string): Promise<Theme> {
        if (userId === null || userId === undefined) {
            throw new Error('User ID cannot be null or undefined');
        }

        const newTheme = this.themeRepository?.create?.({
            name: 'theme1',
            userId: userId,
        });
        if (!newTheme) {
            throw new Error('Theme creation failed');
        }
        return newTheme;


    }

    async getThemeByUserId(userId: string): Promise<Theme | null> {
        return this.themeRepository.findByUserId(userId);
    }

    async updateTheme(userId: string, themeData: UpdateDTO): Promise<Theme | null> {
        if (!userId || !themeData) {
            throw new Error('User ID and theme data must be provided');
        }

        const existingTheme = await this.themeRepository.findByUserId(userId);
        if (!existingTheme) {
            throw new Error('Theme not found for the given user ID');
        }
        const {name} : {
            name : 'theme1' | 'theme2' | 'theme3'
        } = themeData;
        console.log("this is name " +name)
        const updatedTheme = await this.themeRepository?.update?.(userId, {name : name});
        console.log("Updated theme: ", updatedTheme);
        if(!updatedTheme){
            return null;
        }
        return updatedTheme;
    }
}
