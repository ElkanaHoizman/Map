<template>
    <div class="h-screen relative">
        <ErrorModal v-if="errorMsg" :errorMsg="errorMsg" @closeErrorModal="closeErrorModal" />
        <MapComponent @openErrorModal="openErrorModal" />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from 'vue';
import MapComponent from "@/components/features/MapComponent.vue";
import ErrorModal from "@/components/shared/ErrorModal.vue";
import { GeoData } from "@/types/GeoData";
import { ref, onMounted } from "vue";

const searchData = ref<GeoData[] | null>(null);

const errorMsg = ref<string>('');

const openErrorModal = (msg: string) => {

    errorMsg.value = msg;
};

const closeErrorModal = () => {
    errorMsg.value = '';
};

</script>

<style lang="scss"></style>