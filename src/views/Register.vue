<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">{{'HomeBookkeeping' | localize}}</span>
    <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) ||
            ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'MessageForEmail' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'MessageForEmail2' | localize}}</small>
      </div>
    <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) ||
            ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{'Password' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >{{'PasswordLonger' | localize}} {{$v.password.$params.minLength.min}} {{'Characters' |
         localize}} {{password.length}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.required"
        >{{'PasswordRequire' | localize}}</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
      >
      <label for="name">{{'Name' | localize}}</label>
      <small
        class="helper-text invalid"
        v-if="$v.name.$dirty && !$v.name.required"
      >{{'EnterName' | localize}}</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree"/>
        <span>{{'AcceptRules' | localize}}</span>
      </label>
    </p>
  </div>
    <div class="card-action">
      <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        {{'LogIn' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </div>

      <p class="center">
        {{'HasAccount' | localize}}
        <router-link to="/login">{{'LogUp' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'register',
  metaInfo() {
    return {
      title: localizeFilter('Register'),
    };
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
</script>
