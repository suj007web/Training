import { BaseRepository } from "../common/base.repository";
import { Theme } from "./theme.entity";


export interface ThemeRepository extends Partial<BaseRepository<Theme>> {
    findByUserId(userId: number): Promise<Theme | null>;
    findByName(name: string): Promise<Theme | null>;
    findById(id: number): Promise<Theme | null>;
}