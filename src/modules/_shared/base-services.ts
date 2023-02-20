import { PaginateModel, Document, HydratedDocumentFromSchema } from 'mongoose';

type ModelType = PaginateModel<any>;
export type BaseServiceFnType = (
	Model: ModelType,
	data: IBaseServiceDataProp,
	config: IBaseServiceConfigProp
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

export interface IBaseServiceConfigProp {
	throwIfNoResult?: boolean;
	decorator?(data: object): object;
}

const defaultConfig = {
	throwIfNoResult: false,
	decorator: (data: Document) => data,
};

function _mergeDefaultConfig(config: IBaseServiceConfigProp = defaultConfig) {
	return {
		...defaultConfig,
		...config,
	};
}

export const createOne: BaseServiceFnType = async (
	Model: ModelType,
	data: IBaseServiceDataProp,
	config: IBaseServiceConfigProp
) => {
	let { payload, selection: _selection, populate } = data;

	const { decorator } = _mergeDefaultConfig(config);
	const result = await Model.create(payload);

	if (result) {
		return decorator(result);
	}

	return result;
};

const wrapHelper =
	(Model: ModelType, fn: BaseServiceFnType) =>
	async (
		data: IBaseServiceDataProp,
		config: IBaseServiceConfigProp = defaultConfig
	) => {
		return fn(Model, data, config);
	};

export default function BaseService(Model: ModelType) {
	return {
		createOne: wrapHelper(Model, createOne),
	};
}
