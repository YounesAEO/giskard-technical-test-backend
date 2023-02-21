import Joi, { Schema } from 'joi';
import * as BaseService from './base';

export const createReservation = (data: any) => {
	// validate data
	const schema: Schema = Joi.object({
		start: Joi.date().required(),
		end: Joi.date().required(),
		email: Joi.string().email().required(),
		title: Joi.string().required(),
	});
	const { error } = schema.validate(data);
	if (error) {
		throw new Error('Invalid details');
	}

	// create availability
	return BaseService.createOne({ payload: data });
};
