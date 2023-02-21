import { defineFeature, loadFeature } from 'jest-cucumber';
import { jest } from '@jest/globals';
import * as path from 'path';
import { IAvailability } from '../../types';
import { deleteAvailability } from '../../services';
import * as BaseService from '../../services/base';

const feature = loadFeature(path.join(__dirname, './use-case.feature'));
defineFeature(feature, (test) => {
	test('Delete an availibility', ({ given, when, then }) => {
		let id: String;
		let availability: any;
		let start: Date;
		let end: Date;
		let days: boolean[];
		given('I provide valid availibility id', () => {
			//Arrange
			id = '60f1b9f9b9b9b9b9b9b9b9b9';
		});

		when('I attempt to delete an availibility', async () => {
			//Act
			// create a spy on the function that connects to the database
			const deleteByIdSpy = jest.spyOn(BaseService, 'deleteById');
			deleteByIdSpy.mockResolvedValueOnce({ id, start, end, days });

			availability = await deleteAvailability({
				id,
			});
		});

		then('the availibility should be deleted successfully', () => {
			//Assert
			expect(availability).toEqual({ id, start, end, days });
		});

		afterEach(() => {
			// reset the mock after each test
			jest.resetAllMocks();
		});
	});

	test('Inexistent availibility', ({ given, when, then }) => {
		let id: String;
		let err: Error;
		given('I provide invalid id', () => {
			//Arrange
			id = '60f1b9f9b9b9b9b9b9b9b9b9';
		});

		when('I attempt to delete an availibility', async () => {
			//Act
			try {
				// create a spy on the function that connects to the database
				const deleteByIdSpy = jest.spyOn(BaseService, 'deleteById');
				deleteByIdSpy.mockResolvedValueOnce(null);

				await deleteAvailability({ id });
			} catch (error: any) {
				err = error;
			}
		});

		then('I should get inexistent resource error', () => {
			//Assert
			expect(err.message).toEqual('No availability found');
		});

		afterEach(() => {
			// reset the mock after each test
			jest.resetAllMocks();
		});
	});
});
