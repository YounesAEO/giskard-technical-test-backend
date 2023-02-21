import { Router } from 'express';
import * as ReservationService from '../services';

const router = Router();

// add route to create a new reservation
router.post('/', async (req, res, next) => {
	try {
		const reservation = await ReservationService.createReservation(
			req.body
		);

		return res.status(200).json({
			success: true,
			data: reservation,
		});
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const reservation = await ReservationService.deleteReservation({ id });

		return res.status(200).json({
			success: true,
			data: reservation,
		});
	} catch (error) {
		next(error);
	}
});
export default router;
