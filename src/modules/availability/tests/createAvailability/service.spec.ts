import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import * as AvailabilityService from '@/modules/availability/services';

const feature = loadFeature(path.join(__dirname, './use-case.feature'));
defineFeature(feature, (test) => {
	let startDate: Date;
	let endDate: Date;
	let availability: AvailabilityService.availabilityI;
	test('Create an availibility', ({ given, when, then }) => {
		given('I provide valid availibility details', () => {
			//Arrange
			startDate = new Date();
			// end date is 1 hour after start date
			endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
			// Write code here that turns the phrase above into concrete actions
		});

		when('I attempt to create an availibility', () => {
			//Act
			availability = AvailabilityService.createAvailability(
				startDate,
				endDate
			);
			// Write code here that turns the phrase above into concrete actions
		});

		then('the availibility should be saved successfully', () => {
			//Assert
			expect(availability).toBeDefined();
			expect(availability.startDate).toEqual(startDate);
			expect(availability.endDate).toEqual(endDate);
			// Write code here that turns the phrase above into concrete actions
		});
	});

	test('Invalid availibility details', ({ given, when, then }) => {
		given('I provide invalid start or end time', () => {
			//Arrange
		});

		when('I attempt to create an availibility', () => {
			//Act
		});

		then('I should get invalid details error', () => {
			//Assert
		});
	});
});
