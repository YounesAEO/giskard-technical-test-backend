import request from 'supertest';
import { start, stop, app } from '@/app';

describe('POST /api/availabilities', () => {
	beforeAll(async () => {
		await start('test');
	});

	it('should return 200 OK', () => {
		return request(app)
			.post('/api/availabilities')
			.send({
				start: { hours: 9, minutes: 0 },
				end: { hours: 17, minutes: 0 },
				days: [1, 2, 3],
			})
			.expect(200)
			.then((response: any) =>
				expect(response.body).toEqual(
					expect.objectContaining({
						success: true,
						data: expect.objectContaining({
							start: { hours: 9, minutes: 0 },
							end: { hours: 17, minutes: 0 },
							days: [1, 2, 3],
						}),
					})
				)
			);
	});

	it('should return 400 Bad Request', () => {
		return request(app)
			.post('/api/availabilities')
			.send({
				start: 'wrong',
				end: { hours: 17, minutes: 0 },
				days: [1, 2, 3],
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
