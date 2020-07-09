<template>
  <div class="fill-height main">
    <div class="topbar">
      <div class="center-vertical logo">
        <p class="logo-title">K A M U</p>
      </div>
      <div class="center-vertical btn">
        <a @click="logout">
          Logout
        </a>
      </div>
      <div class="center-vertical avatar">
        <v-avatar
          :color="preferredColor ? preferredColor.toLowerCase() : ''"
          size="48"
        >
          <span class="white--text headline">
            {{ firstName ? firstName[0].toUpperCase() : ""
            }}{{ lastName ? lastName[0].toUpperCase() : "" }}
          </span>
        </v-avatar>
      </div>
    </div>
    <div class="content">
      <div class="card-container">
        <v-card class="main-card" flat>
          <p class="card-title">Registered Data</p>
          <v-row>
            <v-col cols="12" sm="6" class="padded-col">
              <v-text-field
                class="text"
                :value="
                  firstName
                    ? firstName[0].toUpperCase() + firstName.slice(1)
                    : ''
                "
                label="First Name"
                readonly
                dense
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" class="padded-col">
              <v-text-field
                class="text"
                :value="
                  lastName ? lastName[0].toUpperCase() + lastName.slice(1) : ''
                "
                label="Last Name"
                readonly
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="padded">
            <v-text-field
              class="text"
              :value="username"
              label="Username"
              readonly
              dense
              outlined
            ></v-text-field>
          </div>

          <div class="padded">
            <v-text-field
              class="text"
              :value="email"
              label="Email"
              readonly
              dense
              outlined
            ></v-text-field>
          </div>

          <div class="padded">
            <v-text-field
              class="text"
              :value="phone"
              label="Phone Number"
              readonly
              dense
              outlined
            ></v-text-field>
          </div>

          <div class="padded">
            <v-text-field
              class="text"
              :value="preferredColor"
              label="Preferred Color"
              readonly
              dense
              outlined
            ></v-text-field>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({}),
  computed: {
    firstName() {
      return this.$store.state.firstName;
    },
    lastName() {
      return this.$store.state.lastName;
    },
    username() {
      return this.$store.state.username;
    },
    email() {
      return this.$store.state.email;
    },
    phone() {
      return this.$store.state.phone;
    },
    preferredColor() {
      return this.$store.state.preferredColor;
    }
  },
  methods: {
    logout() {
      this.$router.push("/login");
      window.$nuxt.$cookiz.remove("access_token");
      this.$store.commit("updateUser", {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        preferredColor: ""
      });
    }
  },
  mounted() {
    this.$store.dispatch("checkLoggedIn");
    this.$store.dispatch("getUser");
  },
  middleware: ["auth"]
};
</script>

<style lang="scss">
.main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "topbar" "content";
  height: 100%;
  .topbar {
    grid-area: topbar;
    border-bottom: 1px solid #dadce0;
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: auto 1fr auto 1rem auto;
    grid-template-rows: 1fr;
    grid-template-areas: "title . btn . avatar";
    .logo {
      grid-area: title;
      .logo-title {
        margin: 0 !important;
      }
    }
    .btn {
      grid-area: btn;
    }
    .avatar {
      grid-area: avatar;
    }
    .center-vertical {
      display: flex;
      align-items: center;
    }
  }
  .content {
    grid-area: content;
    padding: 1rem;
    .card-container {
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .main-card {
        max-width: 40em;
        width: 100%;
        border-radius: 0.5rem;
        border: 1px solid #dadce0;
        padding: 2rem;
        padding-bottom: 0;
        .v-input--is-readonly {
          input {
            color: black !important;
          }
          label {
            color: rgb(105, 105, 105) !important;
          }
          fieldset {
            border: none !important;
          }
        }
        .card-title {
          font-size: 1.7rem;
          padding-left: 0.8rem;
          padding-bottom: 1rem;
        }
        .padded {
          padding: 0.2rem 0;
        }
        .padded-col {
          padding: 0.2rem 12px;
        }
      }
    }
  }
}
</style>
