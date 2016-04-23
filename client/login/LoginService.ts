import * as request from 'superagent';
import * as Q from 'q';
import { requestToPromise } from '../common/requestHelpers';

export default class LoginService {
  login(email: string, password: string): Q.Promise<Boolean> {
    return requestToPromise<any>(
      request.post('/api/login/').send({
        email: email,
        password: password
      })
    );
  }
}
