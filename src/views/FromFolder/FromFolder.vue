<template>
  <div>
    <div class="flex">
      <hover-image class="hover-image" v-for="img in images.length" v-bind:key="images[img - 1]"  :src="images[img - 1]" :class="{'span': (img - 1) % 5 <= 1}" :name="images[img - 1]"/>
    </div>
  </div>
</template>

<script>
import HoverImage from "./HoverImage.vue";
export default {
  name: "FromFolder",
  components: { HoverImage },
  props: {

    files: {
      type: Array,
      required: true,
    },
    folder: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      images: [],
    };
  },

    created() {
    
      for(let file of this.files){
        this.images.push(require('@/assets/' + this.folder + '/' + file.substring(2)));
      }
    },
};


</script>

<style scoped>
.flex {
  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1em;

  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 1em;

  align-items: center;
  
}

.hover-image {
  grid-column: span 2;
}

.hover-image.span {
  grid-column: span 3;
}

</style>