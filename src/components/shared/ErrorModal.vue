<template>
    <div class="h-screen absolute w-full z-10 flex justify-center items-start pt-[125px] bg-black/50">
        <div class="flex flex-col bg-white w-[80%] sm:w-[450px] px-6 py-4 rounded-md">
            <h1 class="text-lg mb-1 flex justify-center">Error</h1>
            <p class="text-lg m-12 flex justify-center">
                {{ errorMsg }}
            </p>
            <button @click="$emit('closeErrorModal')"
                class="self-center py-2 px-4 bg-red-500 text-white rounded-md text-sm ">
                Close
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
    errorMsg?: string
}>()

</script>