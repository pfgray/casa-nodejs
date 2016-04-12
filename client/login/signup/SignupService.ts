import * as request from 'superagent';
import * as Q from 'q';
import { requestToPromise } from '../../common/requestHelpers';

export interface SignupForm {
  email: string,
  password: string
}

export interface SingupReceipt {
  success: boolean
}

export default class SignupService {
  signup(form: SignupForm): Q.Promise<SingupReceipt> {
    return requestToPromise<any>(
      request.post('/api/signup/').send(form)
    );
  }
}
