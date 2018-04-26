import Vue from 'vue'
import Vuex from 'vuex'

require('./bootstrap');


window.Vue = Vue;
window.Vuex = Vuex;


Vue.use(Vuex);