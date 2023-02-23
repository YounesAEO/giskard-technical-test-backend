import request from 'supertest';
import { start, stop, app } from '@/app';

describe('DELETE /api/reservations/:id', () => {
	let id: string;
	let email: string;
	beforeAll(async () => {
		id = '63f48bbe362a3aaad0c94140';
		email = 'y.abouelomoum09@gmail.com';
		await start('test');
	});

	it('should return 200 OK', () => {
		return request(app)
			.delete(`/api/reservations/${id}`)
			.query({ email })
			.expect(200)
			.then((response: any) =>
				expect(response.body).toEqual(
					expect.objectContaining({
						success: true,
						data: expect.objectContaining({
							_id: id,
						}),
					})
				)
			);
	});

	it('should return 400 Bad Request', () => {
		return request(app)
			.delete(`/api/reservations/${id}`)
			.query({ email })
			.expect(400)
			.then((response: any) =>
				expect(response.body).toEqual({
					success: false,
					message: 'No reservation found',
				})
			);
	});

	afterAll(() => {
		stop();
	});
});
