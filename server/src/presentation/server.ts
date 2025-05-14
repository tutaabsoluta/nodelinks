import express from 'express'


export class Server {

    private readonly app = express();
    private port: number;

    constructor( port: number ) {
        this.port = port
    }

    async start () {
        this.app.listen(this.port, () => {
            console.log('Server running in port:', this.port)
        })
    }
}