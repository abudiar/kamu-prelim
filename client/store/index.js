
import axios from 'axios';
const serverUrl = 'http://localhost:3001';

export const state = () => ({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  preferredColor: '',
})

export const mutations = {
  setToken: (state, payload) => {
    state.access_token = payload.access_token;
  },
  updateUser: (state, payload) => {
    for (let i in payload) {
      if (i != 'type') {
        state[i] = payload[i];
      }
    }
  }
}

export const actions = {
  checkLoggedIn: ({ dispatch, commit }) => {
    let access_token = window.$nuxt.$cookiz.get('access_token');
    if (access_token) {
      commit({
        type: 'setToken',
        access_token
      });
      dispatch('getUser');
    }
  },
  login: ({ dispatch }, payload) => {
    return axios({
      url: `${serverUrl}/login`,
      method: 'POST',
      data: payload,
    })
      .then((res) => {
        dispatch('setToken', { access_token: res.data.access_token });
      })
      .catch((err) => {
        throw err;
      })
  },
  register: ({ dispatch }, payload) => {
    return axios({
      url: `${serverUrl}/register`,
      method: 'POST',
      data: payload,
    })
      .then((res) => {
        dispatch('setToken', { access_token: res.data.access_token });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
  },
  setToken: ({ commit, dispatch }, { access_token }) => {
    window.$nuxt.$cookiz.set('access_token', access_token, {
      path: '/',
    })
    if (access_token) {
      commit({
        type: 'setToken',
        access_token
      });
      dispatch('getUser');
    }
  },

  getUser: ({ commit }) => {
    let access_token = window.$nuxt.$cookiz.get('access_token');
    if (!access_token) {
      return;
    }
    return axios({
      url: `${serverUrl}/user`,
      method: 'GET',
      headers: { access_token }
    })
      .then((res) => {
        commit({
          type: 'updateUser',
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phone,
          preferredColor: res.data.color
        });
      })
      .catch((err) => {
        console.log(err);
        window.$nuxt.$cookiz.remove('access_token');
        throw err;
      })
  }
}
