import * as request from 'superagent';
import * as Q from 'q';

import Peer from './Peer.ts';


function requestToPromise<T>(req: request.SuperAgentRequest): Q.Promise<T> {
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

export default class PeerService {
  getPeers() {
    return requestToPromise<Peer[]>(request.get('/api/peers'));
  }
  getPeer(id: string) {
    return requestToPromise(request.get(`/api/peers/${id}`));
  }
  updatePeer(id: string, peer: Peer){
    return requestToPromise(
      request
      .post(`/api/peers/${id}`)
      .send(peer));
  }
  createPeer(peer: Peer) {
    return requestToPromise(
      request
      .post('/api/peers')
      .send(peer));
  }
  syncPeer(id: string) {
    console.log('yep, were syncinc:', id)
    return requestToPromise(
      request
      .post(`/api/peers/${id}/sync`));
  }
}
