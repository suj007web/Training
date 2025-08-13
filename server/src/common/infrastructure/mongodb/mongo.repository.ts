import { BaseRepository } from "src/common";
import { Model } from "mongoose";
import { Document, UpdateQuery, FilterQuery } from "mongoose";



export class MongoRepository<T> implements BaseRepository<T> {

    constructor(protected readonly model: Model<T & Document>) { }

    async findAll(): Promise<T[]> {
        return this.model.find().exec().then(entries => entries.map(entry => entry.toObject() as T));
    }
    async update(id: string, data: Partial<T>): Promise<T | null> {
        // console.log("---- INSIDE MONGO REPOSITORY --- updated ", data)
        const updatedModel = await this.model.findByIdAndUpdate(id, data as UpdateQuery<T & Document>
            , { new: true }).lean().exec();
        return updatedModel ? updatedModel as T : null;
    }
    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id).exec();
    }
    async create(data: T): Promise<T> {
        const created = new this.model(data);
        return (await created.save()).toObject();
    }

    async findByData(query: Partial<T>): Promise<T | null> {
        const queryKeys = Object.keys(query);
        if (queryKeys.length === 0) {
            return null;
        }

    const condition: FilterQuery<T & Document> = queryKeys.length === 1
        ? query as FilterQuery<T & Document>
        : {
            $or: Object.entries(query).map(([key, value]) => ({ [key]: value })) as FilterQuery<T & Document>[]
        };

        const model = await this.model.findOne(condition).lean().exec();
        return model ? model as T : null;
    }

    async findByDataAnd(query: any): Promise<T | null> {
        console.log('Finding document with query:', query);
        const found = await this.model.findOne(query).lean().exec();
        console.log('Found document:', found);
        return found ? found as T : null;
    }


}