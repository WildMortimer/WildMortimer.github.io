<template>
        <div class="hover-image">
                <img :src="src" :alt="name" />
                <div class="overlay">
                        <div class="text">{{ name }}</div>
                </div>
        </div>
</template>

<script>
export default {
        props: {
                src: {
                        type: String,
                        required: true,
                },
                name: {
                        type: String,
                        required: true,
                },
        },
}
</script>

<style scoped>
.hover-image {
        position: relative;
}

.overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: 0.5s ease;
        background-color: rgba(0, 0, 0, 0.5);
}

.hover-image:hover .overlay {
        opacity: .9;
}

.text {
        color: white;
        font-size: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
}

.hover-image img {
        width: 100%;
        height: auto;
}

</style>