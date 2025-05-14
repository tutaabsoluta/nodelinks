import express, { Router } from 'express'
import { AppRoutes } from './routes';

interface Options {
    port: number,
    routes: Router,
}

export class Server {

    private readonly app = express();

    private readonly routes: Router
    private readonly port: number;

    constructor( options: Options ) {

        const { port, routes } = options;

        this.port = port;
        this.routes = routes
    }


    async start () {

        // middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );

        // routes
        this.app.use( this.routes );

        this.app.listen(this.port, () => {
            console.log('Server running in port:', this.port)
        })
    }
}