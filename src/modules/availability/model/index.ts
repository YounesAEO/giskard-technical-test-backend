import mongoose from 'mongoose';
import { IAvailability } from '../types';

const availabilitySchema = new mongoose.Schema<IAvailability>(
	{
		start: {
			type: new mongoose.Schema(
				{
					hours: { type: Number, required: true },
					minutes: { type: Number, required: true },
				},
				{ _id: false }
			),
			required: true,
		},
		end: {
			type: new mongoose.Schema(
				{
					hours: { type: Number, required: true },
					minutes: { type: Number, required: true },
				},
				{ _id: false }
			),
			required: true,
		},
		days: { type: [Number], length: 7, required: true },
		limitStart: { type: Date, required: false },
		limitEnd: { type: Date, required: false },
	},
	{ timestamps: true }
);

const Availability = mongoose.model<IAvailability>(
	'Availability',
	availabilitySchema
);

export default Availability;
