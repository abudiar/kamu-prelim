<template>
  <v-container class="fill-height login" fluid>
    <v-card class="login-card" flat>
      <div class="login-form">
        <v-form ref="form" v-model="valid" :lazy-validation="true">
          <p class="logo-title">K A M U</p>
          <p class="title">Register an account</p>
          <p class="subtext">to continue</p>

          <v-row>
            <v-col cols="12" sm="6" class="padded-col">
              <v-text-field
                v-model="firstName"
                :rules="firstNameRules"
                label="First Name"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" class="padded-col">
              <v-text-field
                v-model="lastName"
                :rules="lastNameRules"
                label="Last Name"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>

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

          <v-row>
            <v-col cols="12" sm="6" class="padded-col">
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

            <v-col cols="12" sm="6" class="padded-col">
              <v-text-field
                v-model="passwordConfirm"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordConfirmRules]"
                :type="passwordShow ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm Password"
                outlined
                dense
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="padded">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              outlined
              dense
              required
            ></v-text-field>
          </div>

          <div class="padded">
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="Phone Number"
              outlined
              dense
              required
            ></v-text-field>
          </div>

          <div class="padded">
            <v-select
              v-model="preferredColor"
              :items="colors"
              :rules="[v => !!v || 'Preferred color is required']"
              label="Preferred Color"
              outlined
              dense
              required
            ></v-select>
          </div>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4 btn"
            @click="validate"
          >
            Register
          </v-btn>
          <p class="btn-hint">
            Already have an account?
            <NuxtLink to="/login">
              Login
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
    firstName: "",
    firstNameRules: [
      v => !!v || "Required",
      v => (v && v.length >= 2) || "Must be more than 1 character"
    ],
    lastName: "",
    lastNameRules: [
      v => !!v || "Required",
      v => (v && v.length >= 2) || "Must be more than 1 character"
    ],
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
    passwordConfirm: "",
    email: "",
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "Must be valid"
    ],
    phone: "",
    phoneRules: [
      v => !!v || "Required",
      v => /^[+]?[0-9]+$/.test(v) || "Must be valid eg. +6281211112222"
    ],
    preferredColor: null,
    colors: ["Red", "Blue", "Green"]
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    passwordConfirmRules(v) {
      if (!v) return "Required";
      else return v == this.password || "Doesn't match password";
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
      }
    }
  }
}
</style>
