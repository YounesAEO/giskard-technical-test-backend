import Joi, { Schema } from 'joi';
import * as BaseService from './base';

export const createAvailability = (data: any) => {
	// validate data
	const schema: Schema = Joi.object({
		start: Joi.date().required(),
		end: Joi.date().required(),
		days: Joi.array().items(Joi.boolean()).length(7).required(),
	});
	const { error } = schema.validate(data);
	if (error) {
		throw new Error('Invalid details');
	}

	// create availability
	return BaseService.createOne({ payload: data });
};
