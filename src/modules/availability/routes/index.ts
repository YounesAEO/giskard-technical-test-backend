import { Router } from 'express';
import * as AvailabilityService from '../services';

const router = Router();

// add route to create a new availability
router.post('/', async (req, res, next) => {
	try {
		const activity = await AvailabilityService.createAvailability(req.body);

		return res.status(200).json({
			success: true,
			data: activity,
		});
	} catch (error) {
		next(error);
	}
});
export default router;