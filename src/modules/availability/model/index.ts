import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IAvailability } from '../types';

const availabilitySchema = new mongoose.Schema<IAvailability>(
	{
		start: { type: Date, required: true },
		end: { type: Date, required: true },
		days: { type: [Boolean], length: 7, required: true },
	},
	{ timestamps: true }
);

availabilitySchema.plugin(mongoosePaginate);

const Availability = mongoose.model<
	IAvailability,
	mongoose.PaginateModel<IAvailability>
>('Availability', availabilitySchema);

export default Availability;

// const availability = {
// 	start: new Date(),
// 	end: new Date(),
// 	days: [],
// };

// const range =
// 	{
// 		startTime: new Date(),
// 		endTime: new Date(),
// 	} || null;
