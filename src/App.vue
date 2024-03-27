<template>
  <div id="body">
    <typewriter />
    <div id="mainBody" :class="{'wide': $route.name == 'Gallery'}">
      <div id="logo">
        <img
          src="/static/logo.png"
          alt="crabLogo"
          width="75px"
          height="75px"
          @click="toggleCoolGold"
        />
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/gallery#me">Gallery</router-link>
        <router-link to="/computer">Computer</router-link>
        <router-link to="/480">FXLT</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>


<script>
import Typewriter from "./components/TypeWriter.vue";
// import carusellue from "./components/carusellue.vue";

export default {
  name: "App",
  components: { Typewriter },
  data() {
    return {
      colorIdx: Math.floor(Math.random() * 2),
      t: undefined,
    };
  },
  methods: {
    toggleCoolGold: function () {
      if (this.t) clearTimeout(this.t);

      if (this.colorIdx == 0) {
        document.documentElement.style.setProperty(
          "--cool-gold",
          "141, 83, 255"
        );
      } else if (this.colorIdx == 1) {
        document.documentElement.style.setProperty(
          "--cool-gold",
          "41, 214, 185"
        );
      }

      this.colorIdx = 1 - this.colorIdx;
      this.t = setTimeout(this.toggleCoolGold, 30000);
    },
  },
  created() {
    this.toggleCoolGold();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  display: flex;
  right: 10px;
  top: 10px;
  position: absolute;
  background: transparent;
  flex-direction: column;
  font-size: 1.3rem;
  gap: 5px;
}

#nav a {
  font-weight: bold;
  color: rgb(var(--cool-gold));
  filter: saturate(30%) brightness(60%);
  background: transparent;
}

#nav a.router-link-exact-active {
  filter: saturate(100%) brightness(100%);
}

:root {
  --cool-gold: #29d6b9;
  /*--cool-gold: hsl(271, 96%, 44%);*/
  --background-color: black;
  /*font-size: 30px !important;*/
  width: 100%;
  height: 100%;
}

.coolGold {
  color: rgb(var(--cool-gold));
}

* {
  background-color: black;
  color: white;
  box-sizing: border-box;
  font-family: monospace;
}

a,
a * {
  color: rgb(var(--cool-gold));
}

#body {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 128vh;
  position: relative;
  margin: 0;
  padding: 0;
}

#logo img {
  filter: contrast(0.855);
  height: 75px;
  width: 75px;
}

#mainBody * {
  background-color: hsl(0, 0%, 7%);
}

#mainBody {
  background-color: hsl(0, 0%, 7%);
  /*max-width: 70ch;*/
  width: clamp(45ch, 80vw, 70ch);
  height: 100%;
  position: absolute;
  padding: 10px;
}

#mainBody.wide {
  width: clamp(45ch, 80vw, 90vw);
}

iframe {
  --width: clamp(45ch - 20px, 80vw - 20px, 70ch - 20px);
  width: var(--width);
  height: calc(var(--width) * 0.56);
  margin-left: auto;
  margin-right: auto;
}

h1 {
  padding-bottom: 0;
  padding-left: 2ch;
  margin-bottom: 0.4em;
}

hr {
  background-color: rgb(var(--cool-gold)) !important;
  border: none;
  height: 1px;
  padding: auto;
}

/*media query for mobile device*/
@media only screen and (max-width: 600px) {
  #logo {
    margin-bottom: 40px;
  }
}
</style>
