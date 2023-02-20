import express from 'express';
import { Server } from 'http';

const app = express();
const port = 3000;

let server: Server;

// app.get('/', (req, res) => createUserController.execute(req, res));

function start() {
	server = app.listen(port, () => {
		console.log(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️ 
        ################################################
      `);
	});
}

function stop() {
	server.close();
}

export { start, stop };
