import Joi, { Schema } from 'joi';
import * as BaseService from './base';

export const fetchAllAvailabilities = (data: any) => {
	// validate data
	const schema: Schema = Joi.object({
		query: Joi.object(),
		sort: Joi.object(),
	});
	const { error } = schema.validate(data);
	if (error) {
		throw new Error('Bad request');
	}

	return BaseService.fetchAll({ query: data.query, sort: data.sort });
};

export const createAvailability = (data: any) => {
	// validate data
	const schema: Schema = Joi.object({
		start: Joi.object({
			hours: Joi.number().required(),
			minutes: Joi.number().required(),
		}).required(),
		end: Joi.object({
			hours: Joi.number().required(),
			minutes: Joi.number().required(),
		}).required(),
		days: Joi.array().items(Joi.number()).max(7).required(),
	});
	const { error } = schema.validate(data);
	if (error) {
		throw new Error('Invalid details');
	}

	// create availability
	return BaseService.createOne({ payload: data });
};

export const createAvailabilities = (data: any) => {
	// validate data
	const schema: Schema = Joi.object({
		availabilities: Joi.array().items(
			Joi.object({
				start: Joi.object({
					hours: Joi.number().required(),
					minutes: Joi.number().required(),
				}).required(),
				end: Joi.object({
					hours: Joi.number().required(),
					minutes: Joi.number().required(),
				}).required(),
				days: Joi.array().items(Joi.number()).max(7).required(),
			})
		),
		limit: Joi.array().items(Joi.date()).length(2),
	});
	const { error } = schema.validate(data);
	if (error) {
		console.log(error);
		throw new Error('Invalid details');
	}

	const { availabilities, limit } = data;
	const payload = limit
		? availabilities.map((availability: any) => {
				return {
					...availability,
					limitStart: limit[0],
					limitEnd: limit[1],
				};
		  })
		: availabilities;

	// create availabilities
	return BaseService.createMany({ payload });
};

export const deleteAvailability = async (data: any) => {
	// validate data
	const schema: Schema = Joi.object({
		id: Joi.string().alphanum().length(24).required(),
	});
	const { error } = schema.validate(data);
	if (error) {
		throw new Error('Invalid details');
	}

	const availability = await BaseService.deleteById({ id: data.id });

	if (!availability) {
		throw new Error('No availability found');
	}

	return availability;
};
