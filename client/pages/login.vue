<template>
  <v-container class="fill-height login" fluid>
    <v-card class="login-card" flat>
      <div class="login-form">
        <v-form ref="form" v-model="valid" :lazy-validation="true">
          <p class="logo-title">K A M U</p>
          <p class="title">Login</p>
          <p class="subtext">to continue</p>

          <div class="padded">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              outlined
              dense
              required
            ></v-text-field>
          </div>

          <div class="padded">
              <v-text-field
                v-model="password"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="passwordShow ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                outlined
                dense
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </v-col>
          </div>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4 btn"
            @click="validate"
          >
            Login
          </v-btn>
          <p class="btn-hint">
            Already have an account?
            <NuxtLink to="/register">
              Register
            </NuxtLink>
          </p>
        </v-form>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      v => !!v || "Required",
      v => (v && v.length >= 2) || "Must be more than 1 character",
      v => (v && v.length <= 16) || "Must be less 16 characters or less"
    ],
    password: "",
    passwordShow: false,
    passwordRules: [
      v => !!v || "Required",
      v => v.length >= 8 || "Min 8 characters"
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  .login-card {
    max-width: 40em;
    width: 100%;
    border: 1px solid #dadce0;
    border-radius: 0.5rem;
    .login-form {
      padding: 2rem;
      .padded {
        padding: 0.2rem 0;
      }
      .padded-col {
        padding: 0.2rem 12px;
      }
      .btn {
        width: 100%;
      }
      .btn-hint {
        text-align: center;
        margin: 0;
        margin-top: 1rem;
      }
    }
  }
}
</style>
