<template>
  <div>
    <div id="carrosell">
      <div id="title">{{ title }}</div>
      <div class="arrow noselect" id="back" @click="moveBack">&lt;</div>
      <img :src="images[frontImage]" :class="{ transitioning: transition }" />
      <div class="arrow noselect" id="forward" @click="moveForward">></div>
      <div
        class="arrow noselect"
        id="toggle"
        @mousemove="captureMouse"
        @click="
          (e) => {
            captureMouse(e);
            togglegalleryModal();
          }
        "
      >
        ↖
      </div>
      <div
        id="galleryModal"
        :class="{ inactive: !galleryModal, derender: gone }"
        @click="
          (e) => {
            togglegalleryModal();
          }
        "
      >
        <img class="v" v-for="i in images.length" :key="i" :src="images[i - 1]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypeWriter",
  components: {},
  props: {
    title: String,
    images: Array,
  },
  data() {
    return {
      frontImage: 0,
      galleryModal: false,
      gone: false,
      gsize: undefined,
      transition: false,
      tt: undefined,
    };
  },
  methods: {
    togglegalleryModal: function () {
      if (this.galleryModal) {
        setTimeout(() => {
          this.gone = true;
        }, 1000);
      } else {
        this.gone = false;
      }
      setTimeout(() => {
        this.galleryModal = !this.galleryModal;
      }, 0);
    },
    captureMouse(event) {
      document.documentElement.style.setProperty(
        "--mouse-x",
        event.clientX + "px"
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        event.clientY + "px"
      );
      console.log(event.clientX, event.clientY);
    },
    moveBack() {
      if (this.tt) clearTimeout(this.tt);
      this.transition = true;
      this.tt = setTimeout(() => {
        this.frontImage =
          (this.frontImage - 1 + this.images.length) % this.images.length;
        this.transition = false;
      }, 250);
    },
    moveForward() {
      if (this.tt) clearTimeout(this.tt);
      this.transition = true;
      this.tt = setTimeout(() => {
        this.frontImage = (this.frontImage + 1) % this.images.length;
        this.transition = false;
      }, 250);
    },
  },
  created: function () {
    this.gsize = Math.ceil(Math.sqrt(this.images.length));
    this.gone = true;
  },
};
</script>

<style scoped>
#carrosell {
  --size: 18em;
  /* --transparent-color: hsla(0, 0%, 22%, 0.8); */
  height: var(--size);
  width: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  /* outline: 10px solid var(--transparent-color); */
  /* background-color: var(--transparent-color); */
  position: relative;
  /* transform: scale(1); */
  transition: 0.2s;
  padding-top: 1em;
  background-color: transparent;
}

#carrosell:not(:hover) > .arrow {
  opacity: 0;
}

#carrosell img {
  max-width: 75%;
  max-height: 75%;
  transition: 0.25s;
  filter: blur(0);
  outline: rgba(var(--cool-gold), 0.5) 1px solid;
  outline-offset: 1px;
  transform: scale(1);
}

#carrosell:hover img:not(.v) {
  transform: scale(1.05);
}

.transitioning {
  filter: blur(10px) !important;
  opacity: 25%;
}

.arrow {
  position: absolute;
  background-color: #7575755e !important;
  border: none;
  color: white;
  padding: 5px;
  /* text-align: center; */
  text-decoration: none;
  display: flex;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  height: 12%;
  transition: 0.25s;
  cursor: pointer;
  z-index: 1;
}

.arrow:hover {
  background-color: #757575 !important;
}

#back {
  left: 0.4em;
}
#forward {
  right: 0.4em;
}
#toggle {
  right: 0.4em;
  top: 60%;
}

#title {
  align-self: flex-start;
  top: 0.4em;
  position: absolute;
  font-size: 2em;
  background-color: transparent;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

#galleryModal {
  background-color: #000000de;
  position: fixed;
  inset: 0;
  padding: 10px;
  flex-wrap: wrap;
  z-index: 5;
  transition: 0.5s;
  display: grid;
  grid-template-rows: repeat(v-bind(gsize), 1fr);
  grid-template-columns: repeat(v-bind(gsize), 1fr);
  height: 100vh;
  place-items: center;
  border: rgba(var(--cool-gold), 1) 2px solid;
}

#galleryModal img {
  max-width: calc(90vmin / v-bind(gsize));
  max-height: calc(90vmin / v-bind(gsize));
  transition: 0.5s;
}

#galleryModal.inactive {
  opacity: 0;
  top: var(--mouse-y);
  left: var(--mouse-x);
  right: calc(100% - var(--mouse-x));
  bottom: calc(100% - var(--mouse-y));
}

.derender {
  display: none !important;
}
/* 
#galleryModal.inactive img {
  height: 0px;
} */
</style>
