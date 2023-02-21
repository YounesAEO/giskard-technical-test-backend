import request from 'supertest';
import { start, stop, app } from '@/app';

describe('DELETE /api/availabilities', () => {
	let id: string;
	beforeAll(async () => {
		id = '63f41547d2903cae7238b7bb';
		await start();
	});

	it('should return 200 OK', () => {
		return request(app)
			.delete(`/api/availabilities/${id}`)
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
			.delete(`/api/availabilities/${id}`)
			.expect(400)
			.then((response: any) =>
				expect(response.body).toEqual({
					success: false,
					message: 'No availability found',
				})
			);
	});

	afterAll(() => {
		stop();
	});
});
