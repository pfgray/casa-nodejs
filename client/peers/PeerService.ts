import * as request from 'superagent';
import * as Q from 'q';

import Peer from './Peer.ts';

export default class PeerService {
  getPeers() {
    var deferred = Q.defer<Peer[]>();
    request.get('/api/peers')
      .end((err, res) => {
        if(err){
          deferred.reject(err);
        } else {
          deferred.resolve(res.body);
        }
      });
    return deferred.promise;
  }
  createPeer(peer: Peer) {
    var deferred = Q.defer();
    request.post('/api/peers')
      .send(peer)
      .end((err, res) => {
        if(err){
          deferred.reject(err);
        } else {
          deferred.resolve(res.body);
        }
      });
    return deferred.promise;
  }
}
