import { defineFeature, loadFeature } from 'jest-cucumber';
import { jest } from '@jest/globals';
import * as path from 'path';
import { IAvailability } from '../../types';
import { createAvailability } from '../../services';
import * as BaseService from '../../services/base';

const feature = loadFeature(path.join(__dirname, './use-case.feature'));
defineFeature(feature, (test) => {
	test('Create an availibility', ({ given, when, then }) => {
		let start: Date;
		let end: Date;
		let availability: IAvailability;
		let days: boolean[];
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
			const createOneSpy = jest.spyOn(BaseService, 'createOne');
			createOneSpy.mockReturnValue(Promise.resolve({ start, end, days }));

			availability = await createAvailability({
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
			expect(availability.days).toEqual(days);
		});

		afterEach(() => {
			// reset the mock after each test
			jest.resetAllMocks();
		});
	});

	test('Invalid availibility details', ({ given, when, then }) => {
		let start: Date;
		let end: Date;
		let availability: IAvailability;
		let days: boolean[];
		let err: Error;
		given('I provide invalid start or end time', () => {
			//Arrange
			start = new Date('invalid');
			// end date is 1 hour after start date
			end = new Date(start.getTime() + 60 * 60 * 1000);
			days = [];
		});

		when('I attempt to create an availibility', async () => {
			//Act
			try {
				// create a spy on the function that connects to the database
				const createOneSpy = jest.spyOn(BaseService, 'createOne');
				createOneSpy.mockReturnValue(
					Promise.resolve({ start, end, days })
				);

				availability = await createAvailability({
					start,
					end,
					days,
				});
			} catch (error: any) {
				err = error;
			}
		});

		then('I should get invalid details error', () => {
			//Assert
			expect(availability).toBeUndefined();
			expect(err).toBeDefined();
			expect(err.message).toEqual('Invalid details');
		});

		afterEach(() => {
			// reset the mock after each test
			jest.resetAllMocks();
		});
	});
});
