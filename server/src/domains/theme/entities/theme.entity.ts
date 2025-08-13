import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ThemeColorMap {
    theme1 = '#BBF7D0',
    theme2 = '#FBCFE8',
    theme3 = '#BFDBFE',
}



@Entity()
export class Theme {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ['theme1', 'theme2', 'theme3'] })
    name: keyof typeof ThemeColorMap;

    @Column()
    userId: string;

    get color(): string {
        return ThemeColorMap[this.name];
    }
}