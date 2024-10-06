<template>

    <search-queries :selectedResult="selectedResult" :searchData="searchData" @plotResult="plotResult"
        @removeResult="removeResult" @toggleSearchResults="toggleSearchResults" @getGeolocation="getGeolocation"
        @setSelectedResult="setSelectedResult" :initSearch="initSearch" />
    <div id="map" class="h-full z-[1]"></div>

</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits } from "vue";
import geoApi from '@/services/geoApi';

import leaflet from "leaflet";
import SearchQueries from "./SearchQueries.vue";
import { GeoData, Properties } from "@/types/GeoData";
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const route = useRoute()
const searchResults = ref<boolean>(false);
const searchData = ref<GeoData[] | null>(null);
const selectedResult = ref<Properties | null>(null);
const coords = ref<Array<number> | null>(null);
const initSearch = ref<boolean>(false);

const geoMarker = ref(null);

const emit = defineEmits(['openErrorModal'])
let map = ref<leaflet.Map>();
onMounted(() => {
    const ACCESS_KEY = process.env.VUE_APP_MAPBOX_ACCESS_KEY
    map.value = leaflet.map('map').setView([28.538336, -81.379234], 13);
    leaflet
        .tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESS_KEY}`,
            {
                maxZoom: 18,
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken: ACCESS_KEY,
            }
        )
        .addTo(map.value);

    // map.on("moveend", () => {
    //     closeSearchResults();
    // });

    if (route.query.zipcode) {
        getGeolocation(route.query.zipcode, true)
    }

});
const resultMarker = ref(null);

const plotResult = () => {

    if (!coords.value || !searchData.value || !searchData.value.length) {
        emit("openErrorModal", "Invalid ZIP code.");
        return
    }

    if (resultMarker.value) {
        map.value.removeLayer(resultMarker.value);
    }
    const marker = leaflet.icon({
        iconUrl: require("../../assets/img/map-marker-blue.svg"),
        iconSize: [35, 35],
    });
    resultMarker.value = leaflet
        .marker([coords.value[1], coords.value[0]], { icon: marker })
        .bindTooltip(selectedResult.value?.city, { permanent: true, direction: 'bottom', className: 'marker-tooltip', offset: [0, 16] })
        .addTo(map.value);
    map.value.setView([coords.value[1], coords.value[0]], 13);
};

const getGeolocation = async (query: string, isInit = false) => {
    initSearch.value = false

    if (query.length < 2) return

    let data = await geoApi.getData(query)
    searchData.value = data.features
    if (isInit) {
        let features = searchData?.value?.length ? searchData.value[0] : searchData.value
        setSelectedResult(features)
        plotResult()
    }
    // navigator.geolocation.getCurrentPosition(setCoords, getLocError)
};

const removeResult = () => {
    router.push({ path: route.path });
    selectedResult.value = null;
    searchData.value = []
    initSearch.value = true
    map.value.removeLayer([]);
};
const toggleSearchResults = () => {
    searchResults.value = !searchResults.value;
};
const setSelectedResult = (result: GeoData) => {
    router.push({ path: route.path, query: { zipcode: result?.properties?.zipCode } });
    selectedResult.value = result.properties;
    let coord = result?.geometry?.coordinates?.length ? result.geometry.coordinates[0] : null;
    coords.value = coord?.length ? coord[Math.round(coord.length / 2)] : null
};
</script>

<style scoped></style>
