import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearUser(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
    login({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_API_URL}/users/login`, userData)
          .then(response => {
            const token = response.data.token;
            commit('setToken', token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    logout({ commit }) {
      commit('clearUser');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user
  }
});
