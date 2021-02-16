import Vue from 'vue';
import App from './App.vue';
import Validations from 'vuelidate';
import './assets/styles/index.css';

Vue.config.productionTip = false;
Vue.use(Validations);

new Vue({
    render: (h) => h(App),
}).$mount('#app');
