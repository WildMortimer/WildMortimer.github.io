<template>
  <div>
    <h1>Photos</h1>
    <hr />
    <div class="flex">
      <carusellue
        :title="'Lovett'"
        :images="[
          require('@/assets/lovett/1.jpeg'),
          require('@/assets/lovett/2.jpeg'),
          require('@/assets/lovett/3.jpeg'),
        ]"
      ></carusellue>
      <carusellue
        :title="'Galveston \'22'"
        :images="[
          require('@/assets/galveston/1.jpeg'),
          require('@/assets/galveston/2.jpeg'),
          require('@/assets/galveston/3.jpeg'),
          require('@/assets/galveston/4.jpeg'),
          require('@/assets/galveston/5.jpeg'),
        ]"
      ></carusellue>
    </div>
    <h1>Art</h1>
    <hr />
    <div class="flex">
      <carusellue
        :title="'Birds'"
        :images="[
          require('@/assets/birds/1.jpeg'),
          require('@/assets/birds/2.jpeg'),
        ]"
      ></carusellue>
      <carusellue
        :title="'Crabs'"
        :images="[require('@/assets/logo.png')]"
      ></carusellue>
    </div>
  </div>
</template>

<script>
import carusellue from "../components/carusellue.vue";
export default {
  components: { carusellue },
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 1em;
}
</style>