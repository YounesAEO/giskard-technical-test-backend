import request from 'supertest';
import { start, stop, app } from '@/app';

describe('POST /api/reservations', () => {
	beforeAll(async () => {
		await start('test');
	});

	it('should return 200 OK', () => {
		return request(app)
			.post('/api/reservations')
			.send({
				start: '2021-01-01T00:00:00.000Z',
				end: '2021-01-01T01:00:00.000Z',
				email: 'y.abouelomoum09@gmail.com',
				title: 'test',
				name: 'Youssef',
			})
			.expect(200)
			.then((response: any) =>
				expect(response.body).toEqual(
					expect.objectContaining({
						success: true,
						data: expect.objectContaining({
							start: '2021-01-01T00:00:00.000Z',
							end: '2021-01-01T01:00:00.000Z',
							email: 'y.abouelomoum09@gmail.com',
							title: 'test',
							name: 'Youssef',
						}),
					})
				)
			);
	});

	it('should return 400 Bad Request', () => {
		return request(app)
			.post('/api/reservations')
			.send({
				start: '2021-01-01T00:00:00.000Z',
				end: '2021-01-01T01:00:00.000Z',
				email: '',
				title: 'test',
				name: 'Youssef',
			})
			.expect(400)
			.then((response: any) =>
				expect(response.body).toEqual({
					success: false,
					message: 'Invalid details',
				})
			);
	});

	afterAll(() => {
		stop();
	});
});
