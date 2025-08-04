import { InjectRepository } from "@nestjs/typeorm";
import { Theme } from "src/domains/theme/theme.entity";
import { ThemeRepository } from "src/domains/theme/theme.repository";
import { Repository } from "typeorm";

export class PostgresThemeRepository implements ThemeRepository{
    
    constructor(
        @InjectRepository(Theme) private readonly themeRepository : Repository<Theme>
    ){}

    async create(data : Theme) : Promise<Theme>{
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

    async findAll(): Promise<Theme[]> {
        return this.themeRepository.find();
    }

    async findById(id: number): Promise<Theme | null> {
        return this.findByData({ id });
    }

    async findByUserId(userId: number): Promise<Theme | null> {
        return this.findByData({ userId });
    }

    async findByName(name: string): Promise<Theme | null> {
        return this.findByData({ name });
    }
}