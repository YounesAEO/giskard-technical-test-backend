import request from 'supertest';
import { start, stop, app } from '@/app';

describe('DELETE /api/reservations/:id', () => {
	let id: string;
	beforeEach(async () => {
		id = '63f48b97df1cd47815d59347';
		await start();
	});

	it('should return 200 OK', () => {
		return request(app)
			.delete(`/api/reservations/${id}`)
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
			.expect(400)
			.then((response: any) =>
				expect(response.body).toEqual({
					success: false,
					message: 'No reservation found',
				})
			);
	});

	beforeEach(() => {
		stop();
	});
});
