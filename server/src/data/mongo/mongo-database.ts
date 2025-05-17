import mongoose, { mongo } from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string,
    dbName: string,
}


export class MongoDatabase {


    static async connect ( options: ConnectionOptions ) {

        const { dbName, mongoUrl } = options;

        try {
            await mongoose.connect( mongoUrl, {
                dbName: dbName,
            } )

            console.log('Mongo Database connected succesfully');
            return true;

        } catch (error) {
            console.log({ error: error })
            throw error;
        }
    }
}