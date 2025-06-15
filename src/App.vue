<template>
  <div class="app__wrapper">
    <HeaderComponent/>
    <router-view/>
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Gilroy", sans-serif;
}

#app {
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.app__wrapper {
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: linear-gradient(135deg,rgba(0, 1, 26, 1) 0%, rgba(15, 15, 15, 1) 100%);
}

.container {
  min-width: 1170px;
  max-width: 1170px;
}

a {
  text-decoration: none;
}

@media (max-width: 1200px){
  .container {
    min-width: 1000px;
    max-width: 1000px;
  }
}
@media (max-width: 991px){
  .container {
    min-width: 850px;
    max-width: 850px;
  }
}
@media (max-width: 768px){
  .container {
    min-width: 400px;
    max-width: 400px;
  }
}
@media (max-width: 375px){
  .container {
    min-width: 350px;
    max-width: 350px;
  }
}
</style>
