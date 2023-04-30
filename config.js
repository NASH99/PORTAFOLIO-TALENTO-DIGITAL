import {config} from 'dotenv'

config()
export const apiURL = process.env.apiURL || 'http://localhost:3001/api';
export const PORT = process.env.PORT || 3000;
