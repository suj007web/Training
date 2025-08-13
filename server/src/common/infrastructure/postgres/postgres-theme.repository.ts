import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Theme } from "src/domains/theme/entities";
import { ThemeRepository } from "src/domains/theme/ports/";
import { Repository } from "typeorm";

@Injectable()
export class PostgresThemeRepository implements ThemeRepository{
    
    constructor(
        @InjectRepository(Theme) private readonly themeRepository : Repository<Theme>
    ){}

    async create(data : Partial<Theme>) : Promise<Theme>{
        const newTheme = this.themeRepository.create(data);
        return this.themeRepository.save(newTheme);
    }

    async findByData(query: Partial<Theme>): Promise<Theme | null> {
        const queryArray = Object.entries(query).map(([key, value]) => ({ [key]: value }));
        if (queryArray.length === 0) {
            return null;
        }
        const theme = await this.themeRepository.findOne({
            where: queryArray.length === 1 ? queryArray[0] : queryArray
        });

        return theme ? theme : null;
       
    }

    async update(userId: string, data: Partial<Theme>): Promise<Theme | null> {
        const existingTheme = await this.themeRepository.findOneBy({ userId });
        if (!existingTheme) {
            return null;
        }
        const updatedTheme = Object.assign(existingTheme, data);
        return this.themeRepository.save(updatedTheme);
    }

    async findAll(): Promise<Theme[]> {
        return this.themeRepository.find();
    }

    async findById(id: number): Promise<Theme | null> {
        return this.findByData({ id });
    }

    async findByUserId(userId: string): Promise<Theme | null> {
        return this.findByData({ userId });
    }

    async findByName(name: 'theme1'| 'theme2' | 'theme3'): Promise<Theme | null> {
        return this.findByData({ name } );
    }
}