import { BaseRepository } from "src/common/base.repository";
import { Theme } from "../entities/theme.entity";


export interface ThemeRepository extends Partial<BaseRepository<Theme>> {
    findByUserId(userId: string): Promise<Theme | null>;
    findByName(name: string): Promise<Theme | null>;
    findById(id: number): Promise<Theme | null>;
}