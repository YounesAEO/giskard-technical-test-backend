import { start } from './app';

const env = process.env.NODE_ENV || 'development';
start(env);
