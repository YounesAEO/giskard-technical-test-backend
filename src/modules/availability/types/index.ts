import { Document } from 'mongoose';
// create an interface representing a document in MongoDB
export interface IAvailability extends Document {
	start: { hours: number; minutes: number };
	end: { hours: number; minutes: number };
	days: number[];
	limitStart?: Date;
	limitEnd?: Date;
}
