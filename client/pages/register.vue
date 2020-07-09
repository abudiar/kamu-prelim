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
              label="Username"
              :rules="[usernameRules]"
              outlined
              dense
              required
            >
              <template v-slot:append>
                <img
                  v-if="loadingUsername"
                  width="24"
                  height="24"
                  src="@/assets/LoadingIcon.svg"
                />
                <img
                  v-else-if="usernameExists"
                  width="24"
                  height="24"
                  src="@/assets/alert.svg"
                />
                <!-- <img v-else width="24" height="24" src="@/assets/check.svg" /> -->
              </template>
            </v-text-field>
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
              :rules="[v => !!v || 'Required']"
              label="Preferred Color"
              outlined
              dense
              required
            ></v-select>
          </div>

          <v-btn
            :disabled="!valid || loading"
            color="success"
            class="mr-4 btn"
            @click="validate"
          >
            <img
              v-if="loading"
              width="24"
              height="24"
              src="@/assets/LoadingIcon.svg"
            />
            <p v-else>
              Register
            </p>
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
    <v-snackbar v-model="toast" color="red" :timeout="3000" :top="true">
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
    loading: false,
    toast: false,
    toastText: "",
    toastColor: "red",
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
    loadingUsername: false,
    usernameExists: false,
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
      const self = this;
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("register", {
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.username,
            password: this.password,
            email: this.email,
            phone: this.phone,
            color: this.preferredColor
          })
          .then(() => {
            this.loading = false;
            self.toastColor = "green";
            self.toastText = "Registration Success!";
            self.toast = true;
            self.$router.push("/");
          })
          .catch(err => {
            this.loading = false;
            self.toastColor = "red";
            self.toastText = err.response.data.message;
            self.toast = true;
          });
      }
    },
    passwordConfirmRules(v) {
      if (!v) return "Required";
      else return v == this.password || "Doesn't match password";
    },
    usernameRules(v) {
      if (!v) return "Required";
      else {
        if (v.length < 2) return "Must be more than 1 character";
        else if (v.length > 16) return "Must be less 16 characters or less";
        clearTimeout(this.debounce);
        const self = this;
        self.loadingUsername = true;
        this.debounce = setTimeout(async () => {
          let usernameExists = await self.$store.dispatch("checkUsername", {
            username: self.username
          });
          self.loadingUsername = false;
          self.usernameExists = usernameExists.data.exists;
          if (usernameExists.data.exists) return "Username already exists";
        }, 600);
      }
      return true;
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
        .v-btn__content {
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            margin: 0;
          }
        }
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
