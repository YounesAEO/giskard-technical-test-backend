import { Document } from 'mongoose';
// create an interface representing a document in MongoDB
export interface IReservation extends Document {
	title: string;
	email: string;
	name: string;
	start: Date;
	end: Date;
}
