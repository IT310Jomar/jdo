import { setupCache } from 'axios-cache-interceptor';
import axios from 'axios';

export const api = setupCache(axios);