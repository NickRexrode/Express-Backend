import { Database } from "sqlite3";

export class DatabaseTable<E> {

    db: Database;
    path: string;

    constructor(path: string) {
        this.path = path;
        this.connect();

    }

    async get(sql: string, values: any[]): Promise<E> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, values, (err: any, row: E) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        });
    }

    async all(sql: string, values: any[]): Promise<Array<E>> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, values, (err: any, rows: Array<E>) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    async run(sql: string, values: any[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, values, (err: any) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        })
    }

    async connect() {
        this.db = new Database(this.path);
    }
}