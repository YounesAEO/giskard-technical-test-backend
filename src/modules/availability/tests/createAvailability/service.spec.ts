import { defineFeature, loadFeature } from 'jest-cucumber';
import { jest } from '@jest/globals';
import * as path from 'path';
import { IAvailability } from '../../types';
import * as AvailabilityService from '../../services';
import * as BaseServices from '../../services/base';

const feature = loadFeature(path.join(__dirname, './use-case.feature'));
defineFeature(feature, (test) => {
	let start: Date;
	let end: Date;
	let availability: IAvailability;
	let days: boolean[];
	test('Create an availibility', ({ given, when, then }) => {
		//@ts-ignore
		given('I provide valid availibility details', () => {
			//Arrange
			start = new Date();
			// end date is 1 hour after start date
			end = new Date(start.getTime() + 60 * 60 * 1000);
			days = [true, false, true, false, true, true, false];
		});

		when('I attempt to create an availibility', async () => {
			//Act
			// create a spy on the function that connects to the database
			const createOneSpy = jest.spyOn(BaseServices, 'createOne');
			createOneSpy.mockReturnValue(Promise.resolve({ start, end, days }));

			availability = await AvailabilityService.createAvailability({
				start,
				end,
				days,
			});
		});

		then('the availibility should be saved successfully', () => {
			//Assert
			expect(availability).toBeDefined();
			expect(availability.start).toEqual(start);
			expect(availability.end).toEqual(end);
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
