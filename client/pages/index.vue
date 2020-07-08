<template>
  <v-container class="fill-height" fluid>
    <v-card>
      <v-card-title class="headline">
        Welcome to the Vuetify + Nuxt.js template
      </v-card-title>
      <v-card-text>
        <p>
          Vuetify is a progressive Material Design component framework for
          Vue.js. It was designed to empower developers to create amazing
          applications.
        </p>
        <p>
          For more information on Vuetify, check out the
          <a
            href="https://vuetifyjs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation </a
          >.
        </p>
      </v-card-text>
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
  }
};
</script>
