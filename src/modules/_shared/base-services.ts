import { PaginateModel } from 'mongoose';

type ModelType = PaginateModel<any>;
export type BaseServiceFnType = (
	Model: ModelType,
	data: IBaseServiceDataProp
) => Promise<any>;

export interface IBaseServiceDataProp {
	id?: string;
	query?: object;
	sort?: object | string;
	payload?: any;
	selection?: string[] | object;
	populate?: string[] | object;
	page?: number;
	limit?: number;
}

export const createOne: BaseServiceFnType = async (
	Model: ModelType,
	data: IBaseServiceDataProp
) => {
	let { payload } = data;

	const result = await Model.create(payload);

	return result;
};

const deleteById = async (Model: ModelType, data: IBaseServiceDataProp) => {
	const { id, selection } = data;

	return Model.findByIdAndDelete(id).select(selection);
};

const wrapHelper =
	(Model: ModelType, fn: BaseServiceFnType) =>
	async (data: IBaseServiceDataProp) => {
		return fn(Model, data);
	};

export default function BaseService(Model: ModelType) {
	return {
		createOne: wrapHelper(Model, createOne),
		deleteById: wrapHelper(Model, deleteById),
	};
}
