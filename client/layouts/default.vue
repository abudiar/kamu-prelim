<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
html {
  overflow: auto;
}

.container,
.content {
  background: rgb(243, 243, 243);
}

.logo-title {
  font-size: 1.5rem;
  margin-bottom: 0.2rem !important;
}
.title {
  margin: 0 !important;
}
.subtext {
  margin-bottom: 1.5rem !important;
}
</style>
