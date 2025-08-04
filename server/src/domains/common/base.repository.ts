export interface BaseRepository<T>{
    create(data : T) : Promise<T>;
    findByData(query : Partial<T>): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
}