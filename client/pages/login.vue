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
    <v-snackbar v-model="toast" :color="toastColor" :timeout="3000" :top="true">
      {{ toastText }}
    </v-snackbar>
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
    toast: false,
    toastText: "",
    toastColor: "red",
    username: "",
    usernameRules: [v => !!v || "Required"],
    password: "",
    passwordShow: false,
    passwordRules: [v => !!v || "Required"]
  }),

  methods: {
    validate() {
      const self = this;
      if (self.$refs.form.validate())
        self.$store
          .dispatch("login", {
            username: self.username,
            password: self.password
          })
          .then(() => {
            self.toastColor = "green";
            self.toastText = "Login Success!";
            self.toast = true;
            self.$router.push("/");
          })
          .catch(err => {
            self.toastColor = "red";
            self.toastText = err.response.data.message;
            self.toast = true;
          });
    }
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
        a {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
