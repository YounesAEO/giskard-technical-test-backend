import { defineFeature, loadFeature } from 'jest-cucumber';
import { jest } from '@jest/globals';
import * as path from 'path';
import { IReservation } from '../../types';
import { deleteReservation } from '../../services';
import * as BaseService from '../../services/base';

const feature = loadFeature(path.join(__dirname, './use-case.feature'));
defineFeature(feature, (test) => {
	test('Delete a reservation', ({ given, when, then }) => {
		let id: String;
		let reservation: any;
		given('I provide valid reservation id', () => {
			//Arrange
			id = '60f1b9f9b9b9b9b9b9b9b9b9';
		});

		when('I attempt to delete a reservation', async () => {
			//Act
			// create a spy on the function that connects to the database
			const deleteByIdSpy = jest.spyOn(BaseService, 'deleteById');
			deleteByIdSpy.mockResolvedValueOnce({ id });

			reservation = await deleteReservation({
				id,
			});
		});

		then('the reservation should be deleted successfully', () => {
			//Assert
			expect(reservation).toEqual(expect.objectContaining({ id }));
		});

		afterEach(() => {
			// reset the mock after each test
			jest.resetAllMocks();
		});
	});

	test('Reservation not found', ({ given, when, then }) => {
		let id: String;
		let err: Error;
		given('I provide invalid id', () => {
			//Arrange
			id = '60f1b9f9b9b9b9b9b9b9b9b9';
		});

		when('I attempt to delete a reservation', async () => {
			//Act
			try {
				// create a spy on the function that connects to the database
				const deleteByIdSpy = jest.spyOn(BaseService, 'deleteById');
				deleteByIdSpy.mockResolvedValueOnce(null);

				await deleteReservation({ id });
			} catch (error: any) {
				err = error;
			}
		});

		then('I should get reservation not found error', () => {
			//Assert
			expect(err.message).toEqual('No reservation found');
		});

		afterEach(() => {
			// reset the mock after each test
			jest.resetAllMocks();
		});
	});
});
