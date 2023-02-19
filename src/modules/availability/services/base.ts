export interface availabilityI {
	startDate: Date;
	endDate: Date;
}

export const createAvailability = (
	startDate: Date,
	endDate: Date
): availabilityI => {
	return {
		startDate,
		endDate,
	};
};
