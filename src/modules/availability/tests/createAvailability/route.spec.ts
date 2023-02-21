import request from 'supertest';
import { start, stop, app } from '@/app';

describe('POST /api/availabilities', () => {
	beforeAll(async () => {
		await start();
	});

	it('should return 200 OK', () => {
		return request(app)
			.post('/api/availabilities')
			.send({
				start: '2021-01-01T00:00:00.000Z',
				end: '2021-01-01T00:00:00.000Z',
				days: [true, true, true, true, true, true, true],
			})
			.expect(200)
			.then((response: any) =>
				expect(response.body).toEqual(
					expect.objectContaining({
						success: true,
						data: expect.objectContaining({
							start: '2021-01-01T00:00:00.000Z',
							end: '2021-01-01T00:00:00.000Z',
							days: [true, true, true, true, true, true, true],
						}),
					})
				)
			);
	});

	it('should return 400 Bad Request', () => {
		return request(app)
			.post('/api/availabilities')
			.send({
				start: 'test',
				end: '2021-01-01T00:00:00.000Z',
				days: [true, true, true, true, true, true, true],
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
