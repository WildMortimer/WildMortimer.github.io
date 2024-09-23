<template>
        <div>
        <h1>Gallery</h1>
        <hr />
        
        <!-- nav bar for all the different folders -->
        <div id="gallery-nav">
                <router-link v-for="files in componentsFiles" :key="files[1]" :to="'#' + files[1]" :class="{'fade': $route.hash.substring(1) != files[1]}">{{ files[1] }}</router-link>
        </div>

        <from-folder v-for="files in componentsFiles" :key="files[0]" :id="files[1]"  :files="files[0]" :folder="files[1]" class="from-folder" :class="{'show': $route.hash.substring(1) == files[1]}" />
        </div>
</template>

<script>
import FromFolder from './FromFolder/FromFolder.vue';

export default {
        name: 'Gallery',
        components: { FromFolder },

        data() {
                return {
                        componentsFiles: [],
                };
        },
        created() {
                this.componentsFiles.push([require.context(
                        '@/assets/me',
                        true,
                        /^.*\.jpg$/
                ).keys(), "me"]);
                this.componentsFiles.push([require.context(
                        '@/assets/birds',
                        true,
                        /^.*\.jpg$/
                ).keys(), "birds"]);
                this.componentsFiles.push([require.context(
                        '@/assets/landscape',
                        true,
                        /^.*\.jpe?g$/
                ).keys(), "landscape"]);
                // this.componentsFiles.push([require.context(
                //         '@/assets/portriats',
                //         true,
                //         /^.*\.jpe?g$/
                // ).keys(), "portriats"]);

        },
};
</script>

<style>
        .from-folder {
                display: none;
        }

        .from-folder.show {
                display: block;
        }

        #gallery-nav {
                display: flex;
                justify-content: space-evenly;
                width: 100%;
        }

        #gallery-nav a {
                font-size: 1.2em;
                font-weight: bold;
        }

        #gallery-nav a.fade {
                filter: brightness(0.8);
        }
</style>