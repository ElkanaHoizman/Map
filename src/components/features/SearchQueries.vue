<template>
    <div
        class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-transparent">

        <div class="relative flex-1 md:min-w-[350px]">
            <input class="pl-9 pr-4 py-3 text-[14px] focus:outline-none w-full shadow-md rounded-md" type="text"
                placeholder="Start your search..." v-model="searchQuery" @input="search"
                @focus="emit('toggleSearchResults')" />
            <!-- Search Icon -->
            <div class="absolute top-0 left-[8px] h-full flex items-center">
                <i class="fas fa-search"></i>
            </div>
            <!-- Search Results -->
            <div class="absolute mt-[8px] w-full">
                <!-- Search Queries -->
                <div v-if="searchQuery" class=" bg-white rounded-md">
                    <LoadSpinner v-if="!searchData" />
                    <div v-else>
                        <div class="px-4 py-2 flex justify-center gap-x-2" v-if="!searchData.length">No results found
                        </div>
                        <div v-else class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white"
                            v-for="(result, index) in searchData" :key="index" @click="selectResult(result)">
                            <i class="fas fa-map-marker-alt"></i>
                            <p class="text-[12px]">{{ result?.properties?.city }}, {{ result?.properties?.country }}</p>
                        </div>
                    </div>
                </div>
                <!-- Selected Search Result -->
                <div v-if="selectedResult" class="mt-[8px] px-4 py-3 bg-white rounded-md">
                    <i @click="removeResult" class="flex justify-end far fa-times-circle"></i>
                    <h1 class="text-lg">{{ selectedResult?.city }}</h1>
                    <p class="text-xs mb-1">
                        {{ selectedResult.country }}, {{ selectedResult.state }},
                        {{ selectedResult.zipCode }}
                    </p>
                </div>
            </div>

        </div>
        <div class="px-4 bg-white flex items-center shadow-md rounded-md min-h-[45px] cursor-pointer"
            @click="emit('plotResult')">
            <i class="fas fa-location-arrow 'text-slate-600' text-[18px]"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, watch } from 'vue';
import useDebouncedRef from '@/composables/useDebouncedRef.vue'
import { GeoData } from '@/types/GeoData';
import LoadSpinner from '@/components/shared/LoadSpinner.vue'
const searchQuery = useDebouncedRef('', 400);

// const coords = ref<Array<number> | null>(null);

const emit = defineEmits(['plotResult', 'removeResult', 'toggleSearchResults', 'getGeolocation', 'setSelectedResult'])
import { defineProps } from 'vue'

const props = defineProps<{
    searchData?: GeoData[] | null,
    selectedResult?: Array<number> | null,
    initSearch: boolean
}>()
const search = async () => {
    emit('getGeolocation', searchQuery.value)
};

const selectResult = (result: GeoData) => {
    searchQuery.value = result?.properties?.city
    emit('setSelectedResult', result)
};

const removeResult = () => {
    emit("removeResult");
};

watch(() => props.initSearch, (newVal, oldVal) => {
    if (newVal) {
        searchQuery.value = ''
    }
});

</script>