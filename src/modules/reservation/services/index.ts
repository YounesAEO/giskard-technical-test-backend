import Joi, { Schema } from 'joi';
import * as BaseService from './base';

export const fetchAllReservations = (data: any) => {
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

export const createReservation = (data: any) => {
	// validate data
	const schema: Schema = Joi.object({
		start: Joi.date().required(),
		end: Joi.date().required(),
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		title: Joi.string().required(),
	});
	const { error } = schema.validate(data);
	if (error) {
		throw new Error('Invalid details');
	}

	// create reservation
	return BaseService.createOne({ payload: data });
};

export const deleteReservation = async (data: any) => {
	// validate data
	const schema: Schema = Joi.object({
		id: Joi.string().alphanum().length(24).required(),
	});
	const { error } = schema.validate(data);
	if (error) {
		throw new Error('Invalid details');
	}

	const reservation = await BaseService.deleteById({ id: data.id });

	if (!reservation) {
		throw new Error('No reservation found');
	}

	return reservation;
};
