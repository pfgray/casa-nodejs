import * as request from 'superagent';
import * as Q from 'q';

import { requestToPromise } from '../common/requestHelpers';
import Storefront from './Storefront.ts';

const apiUrl = '/api/storefronts';

export default class StorefrontService {
  getStorefronts() {
    return requestToPromise(request.get(apiUrl));
  }
  getStorefront(id: string) {
    return requestToPromise(request.get(`${apiUrl}/${id}`));
  }
  updateStorefront(id: string, storefront: Storefront){
    return requestToPromise(
      request
      .post(`${apiUrl}/${id}`)
      .send(storefront));
  }
  createStorefront(storefront: Storefront) {
    return requestToPromise(
      request
      .post('/api/storefronts')
      .send(storefront));
  }
}
