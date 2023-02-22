import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IReservation } from '../types';

const reservationSchema = new mongoose.Schema<IReservation>(
	{
		start: { type: Date, required: true },
		end: { type: Date, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		title: { type: String, required: true },
	},
	{ timestamps: true }
);

reservationSchema.plugin(mongoosePaginate);

const Reservation = mongoose.model<
	IReservation,
	mongoose.PaginateModel<IReservation>
>('Reservation', reservationSchema);

export default Reservation;
