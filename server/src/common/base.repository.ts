export interface BaseRepository<T>{
    create(data : Partial<T>) : Promise<T>;
    findByData(query : Partial<T>): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: string | number, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
    findByDataAnd(query : any) : Promise<T | null>;
   
}