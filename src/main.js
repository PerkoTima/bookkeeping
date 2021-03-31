import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta';
import firebase from 'firebase/app';
import dateFilter from '@/filters/date.filter';
import Paginate from 'vuejs-paginate';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import Loader from '@/components/app/Loader.vue';
import tooltipDirective from '@/directives/tooltip.directive';
import messagePlugin from '@/utils/message.plugin';
import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: 'AIzaSyB31trYIJ5cnt8Pw85p2uayiPBG6F-Mdk0',
  authDomain: 'vue-project-ca00c.firebaseapp.com',
  databaseURL: 'https://vue-project-ca00c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vue-project-ca00c',
  storageBucket: 'vue-project-ca00c.appspot.com',
  messagingSenderId: '413515164445',
  appId: '1:413515164445:web:c5320b9250019016254ff4',
  measurementId: 'G-TXCQN6N266',
});
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
