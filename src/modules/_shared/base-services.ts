import { Model } from 'mongoose';

type ModelType = Model<any>;
export type BaseServiceFnType = (
	Model: ModelType,
	data: IBaseServiceDataProp
) => Promise<any>;

export interface IBaseServiceDataProp {
	id?: string;
	query?: object;
	payload?: any;
	sort?: string[] | object;
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
	const { id } = data;

	return Model.findByIdAndDelete(id);
};

const createMany = async (Model: ModelType, data: IBaseServiceDataProp) => {
	let { payload } = data;

	const result = await Model.insertMany(payload);
	return result;
};

export const deleteAll = async (Model: ModelType) => {
	return Model.deleteMany({});
};

const fetchAll = async (Model: ModelType, data: IBaseServiceDataProp) => {
	const { query, sort } = data;
	//@ts-ignore
	return Model.find(query, null, {
		sort: sort || { createdAt: -1 },
	});
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
		createMany: wrapHelper(Model, createMany),
		fetchAll: wrapHelper(Model, fetchAll),
		deleteAll: wrapHelper(Model, deleteAll),
	};
}
