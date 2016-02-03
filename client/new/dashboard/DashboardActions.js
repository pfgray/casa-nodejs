import request from 'superagent';

export const RECEIVE_DASHBOARD = 'RECEIVE_DASHBOARD';

export const fetchDashboard = () => {
  return dispatch =>
    request.get('/api/dashboard')
      .end((err, res) => {
        dispatch({
          type: RECEIVE_DASHBOARD,
          dashboard: res.body
        });
      });
};
