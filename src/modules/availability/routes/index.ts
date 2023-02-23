import { Router } from 'express';
import * as AvailabilityService from '../services';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const query = req.query;
		const availabilities = await AvailabilityService.fetchAllAvailabilities(
			{
				query,
			}
		);

		return res.status(200).json({
			success: true,
			data: availabilities,
		});
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const availability = await AvailabilityService.createAvailability(
			req.body
		);

		return res.status(200).json({
			success: true,
			data: availability,
		});
	} catch (error) {
		next(error);
	}
});

router.post('/bulk', async (req, res, next) => {
	try {
		const availabilities =
			await AvailabilityService.createOrUpdateAvailabilities(req.body);

		return res.status(200).json({
			success: true,
			data: availabilities,
		});
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const availability = await AvailabilityService.deleteAvailability({
			id,
		});

		return res.status(200).json({
			success: true,
			data: availability,
		});
	} catch (error) {
		next(error);
	}
});

export default router;
