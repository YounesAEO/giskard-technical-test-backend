import { defineFeature, loadFeature } from 'jest-cucumber';
import { jest } from '@jest/globals';
import * as path from 'path';
import { IReservation } from '../../types';
import { createReservation } from '../../services';
import * as BaseService from '../../services/base';

const feature = loadFeature(path.join(__dirname, './use-case.feature'));
defineFeature(feature, (test) => {
	test('Create an reservation', ({ given, when, then }) => {
		let start: Date;
		let end: Date;
		let reservation: IReservation;
		let email: string;
		let title: string;
		given('I provide valid reservation details', () => {
			//Arrange
			start = new Date();
			// end date is 1 hour after start date
			end = new Date(start.getTime() + 60 * 60 * 1000);
			email = 'y.abouelomoum09@gmail.com';
			title = 'Test';
		});

		when('I attempt to create an reservation', async () => {
			//Act
			// create a spy on the function that connects to the database
			const createOneSpy = jest.spyOn(BaseService, 'createOne');
			createOneSpy.mockReturnValue(
				Promise.resolve({ start, end, email, title })
			);

			reservation = await createReservation({
				start,
				end,
				email,
				title,
			});
		});

		then('the reservation should be saved successfully', () => {
			//Assert
			expect(reservation).toBeDefined();
			expect(reservation.start).toEqual(start);
			expect(reservation.end).toEqual(end);
			expect(reservation.email).toEqual(email);
			expect(reservation.title).toEqual(title);
		});

		afterEach(() => {
			// reset the mock after each test
			jest.resetAllMocks();
		});
	});

	test('Invalid reservation details', ({ given, when, then }) => {
		let start: Date;
		let end: Date;
		let reservation: IReservation;
		let email: string;
		let title: string;
		let err: Error;
		given('I provide invalid details', () => {
			//Arrange
			start = new Date();
			// end date is 1 hour after start date
			end = new Date(start.getTime() + 60 * 60 * 1000);
			email = '';
			title = '';
		});

		when('I attempt to create an reservation', async () => {
			//Act
			try {
				// create a spy on the function that connects to the database
				const createOneSpy = jest.spyOn(BaseService, 'createOne');
				createOneSpy.mockReturnValue(
					Promise.resolve({ start, end, email, title })
				);

				reservation = await createReservation({
					start,
					end,
					email,
					title,
				});
			} catch (error: any) {
				err = error;
			}
		});

		then('I should get invalid details error', () => {
			//Assert
			expect(reservation).toBeUndefined();
			expect(err).toBeDefined();
			expect(err.message).toEqual('Invalid details');
		});

		afterEach(() => {
			// reset the mock after each test
			jest.resetAllMocks();
		});
	});
});
