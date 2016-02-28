import * as request from 'superagent';
import * as Q from 'q';
import { requestToPromise } from '../../common/requestHelpers';

import { App } from './App.ts';

export default class AppStoreService {
  getAppStore(id): Q.Promise<App[]> {
    return requestToPromise<any>(
      request.get(`/api/storefronts/${id}/appStore`)
    ).then(apps => apps.map(app => ({
      casaDescriptor: app
    })));
  }
}
