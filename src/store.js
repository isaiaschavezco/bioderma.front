import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatEmails: new Map()
  },
  mutations: {
    setNewEmailToList(state, email) {
      // console.log("- - - AGREGO USUARIO");
      state.chatEmails.set(email, true);
    },
    deleteEmailFromList(state, email) {
      state.chatEmails.delete(email);
    }
  },
  actions: {},
  getters: {
    emailsList: state => state.chatEmails
  }
});
