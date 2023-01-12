export interface CRUD<E> {
    create: (data: E) => Promise<E>;
    readAll: () => Promise<Array<E>>;
    read: (id: string) => Promise<E>;
    update: (id: string, data: E) => Promise<E>;
    delete: (id: string) => Promise<E>;
}