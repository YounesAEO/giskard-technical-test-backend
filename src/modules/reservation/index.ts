import * as services from './services';
import { default as routes } from './routes';
import { Router } from 'express';

function init(router: Router) {
	router.use('/reservations', routes);
}

export default {
	name: 'Reservation',
	init,
	services,
};
