import express, { Router } from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Modules from '@/modules';

dotenv.config();

let server: Server;
const app = express();

function apiRoutesLoader(): Router {
	const router = Router();
	for (const module of Modules) {
		module.init(router);
		console.log('✅ Module loaded: ' + module.name);
	}

	return router;
}

async function start(env = 'development') {
	// load database
	const DB_ENV_URIS = {
		development: 'mongodb://localhost:27017/dev',
		test: 'mongodb://localhost:27017/test',
		production: process.env.MONGODB_URI,
	};

	// @ts-ignore
	const databaseURI = DB_ENV_URIS[env];

	await mongoose.connect(databaseURI);
	console.log('✅ DB loaded and connected!');

	// load express app + mdoules
	app.get('/api', (req: express.Request, res: express.Response) =>
		res.status(200).json({ message: 'API is working' })
	);

	app.use(cors());
	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ limit: '50mb', extended: true }));
	app.use('/api', apiRoutesLoader());
	console.log('✅ Express app loaded!');

	// Catch 404 errors
	app.use((_, __, next) => {
		next({ status: 404, message: 'Endpoint not found' });
	});

	// Error handler
	app.use(
		(
			error: any,
			_: express.Request,
			res: express.Response,
			__: express.NextFunction
		) => {
			error.status = [
				'Invalid details',
				'No availability found',
				'No reservation found',
			].includes(error.message)
				? 400
				: error?.status;
			res.status(error.status || 500).json({
				success: false,
				message: error.message || 'Something went wrong',
			});
		}
	);

	// start server
	if (process.env.NODE_ENV !== 'test') {
		server = app.listen(process.env.PORT, () => {
			console.log(`
			################################################
			🛡️  Server listening on port: ${process.env.PORT} 🛡️ 
			################################################
		  `);
		});
	} else {
		server = app.listen(0);
	}
}

function stop() {
	server.close();
}

export { start, stop, app };
