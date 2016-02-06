import request from 'superagent';

export const RECEIVE_PEERS = 'RECEIVE_PEERS';
export const FETCH_PEERS = 'FETCH_PEERS';

export const fetchPeers = () => {
  return dispatch => {
      request.get('/api/peers')
        .end((err, res) => {
          dispatch({
            type: RECEIVE_PEERS,
            peers: res.body
          });
        });
      dispatch({type: FETCH_PEERS});
    };
};
