<template>
  <div>
    <h1>Photos</h1>
    <hr />
    <div class="flex">
      <img v-for="img in images.length" v-bind:key="images[img - 1]"  :src="images[img - 1]" alt="WC1308-EAL" :class="{'span': img % 3 == 1}"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      images: [],
    };
  },
    created() {
      console.log("Gallery created");
      
      var files = require.context(
        '@/assets/photography',
        true,
        /^.*\.jpg$/
      ).keys();
      for(let file of files){
        console.log(file);
        this.images.push(require('@/assets/photography/' + file.substring(2)));
      }
    },
};


</script>


<style scoped>
.flex {
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;

  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 1em;
}

img {
  width: 100%;
}

.span {
  grid-column: span 2;
}

</style>