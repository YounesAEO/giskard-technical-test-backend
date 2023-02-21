import * as services from './services';
import { default as routes } from './routes';
import { Router } from 'express';

function init(router: Router) {
	router.use('/availabilities', routes);
}

export default {
	name: 'Availability',
	init,
	services,
};
