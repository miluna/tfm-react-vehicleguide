export default interface CrudService<T> {
    getAll() : Promise<Array<T>>;
    getOne(id: number) : Promise<T>;
    createOne(t : T) : Promise<T>;
    updateOne(id: number, t : T) : Promise<T>;
    deleteOne(id: number) : Promise<Boolean>;
}
