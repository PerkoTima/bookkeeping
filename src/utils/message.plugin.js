import M from 'materialize-css';
import localizeFilter from '@/filters/localize.filter';

export default {
  install(Vue, options) {
    const fnVue = Vue;
    fnVue.prototype.$message = function fn(html) {
      M.toast({ html });
    };
    console.log(options);
    fnVue.prototype.$error = function fn1(html) {
      M.toast({ html: `[${localizeFilter('Error')}]: ${html}` });
    };
  },
};
