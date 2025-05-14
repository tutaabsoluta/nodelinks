import { Server } from "./presentation/server"


function main () {

    const server = new Server(3000);
    server.start()
    
}

( async () => {
    main()
})();