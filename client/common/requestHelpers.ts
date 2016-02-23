import * as Q from 'q';
import { SuperAgentRequest } from 'superagent';

export function requestToPromise<T>(req: SuperAgentRequest): Q.Promise<T> {
  var deferred = Q.defer<T>();
  req.end((err, res) => {
      if(err){
        deferred.reject(err);
      } else {
        deferred.resolve(res.body);
      }
    });
  return deferred.promise;
}
