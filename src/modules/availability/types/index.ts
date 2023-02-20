import { Document } from 'mongoose';
// create an interface representing a document in MongoDB
export interface IAvailability extends Document {
	start: Date;
	end: Date;
	days: string[];
}
