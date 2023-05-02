<template>
  <div id="mapRoot"></div>
</template>

<script setup>
import 'ol/ol.css';
import * as ol from 'ol';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { getCenter } from 'ol/extent.js';

import { Icon, Style } from 'ol/style.js';
import { Point } from 'ol/geom.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector } from 'ol/source.js';

import ImageLayer from 'ol/layer/Image.js'
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';

import { ref, onMounted, onUnmounted, computed } from 'vue';

import { useLoadingStore } from '@/stores/LoadingStore'
import { InfluxDB } from '@influxdata/influxdb-client'

const loadingStore = useLoadingStore()

const extent = [0, 0, 2153, 1604]
const projection = new Projection({
  code: 'my-custom-projection',
  units: 'pixels',
  extent: extent,
})

const markers = ref([])

const queryApi = new InfluxDB({ url: 'http://64.226.117.91:8086', token: '32KaIOSNxXgcOzzDenFMfX34DeJlVVbzkGL9Nv0PIhCCJP5T9iIqoX8EaY4hE_LunHRh3f2k25ntm1k6lCHA2w==' }).getQueryApi('zoo');


const query = `from(bucket: "zoo")
  |> range(start: -20s)
  |> filter(fn: (r) => r["_measurement"] == "position")
  |> filter(fn: (r) => r["_field"] == "x" or r["_field"] == "94A408B2EE24" or r["_field"] == "94A408B60B80" or r["_field"] == "94A408B60BAC" or r["_field"] == "y")
  |> last()
  |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
  |> drop(columns: ["_start", "_stop", "_measurement", "beacon_id"]) `


const resultQuery = ref()

async function getLocation() {
  const pixelPerMeter = 198.5
  const res = await queryApi.collectRows(query)

  resultQuery.value = computed(() => {
      const x = res[0].x * pixelPerMeter
      const y = res[0].y * pixelPerMeter
      return {x,y}
    }
  )

  console.log(res)
  markers.value =
    [
      new ol.Feature({
        geometry: new Point([resultQuery.value.x, resultQuery.value.y]), // adjust the coordinates to match your marker
      })
    ]
  markerLayer2.getSource().addFeatures(feature)
}
let intervalQuery

onMounted(() => {
  intervalQuery = setInterval(getLocation, 2000)
  const markerLayer2 = new VectorLayer({
    source: new Vector({
      features: [],
    }),
    style: new Style({
      image: new Icon({
        src: require('../../assets/map/marker-orange.png'), // adjust the path to match the location of your marker image
        anchor: [0.5, 1],
      }),
    }),
  });
  const map = new Map({
    layers: [],
    target: 'mapRoot',
    view: new View({
      extent: extent,
      showFullExtent: true,
      projection: projection,
      center: getCenter(extent),
      zoom: 0,
      minZoom: 0,
      maxZoom: 6,
    })
  });

  //create image layer
  const imgLayer = new ImageLayer({
    source: new Static({
      attributions: '© <a href="https://google.com">SCBD HABITAT ZOO</a>',
      url: require('../../assets/map/demo-overlay.png'),
      projection: projection,
      imageExtent: extent,
    }),
  })

  map.addLayer(imgLayer); // add the layer to the map

  map.once('rendercomplete', () => {
    console.log('Map rendering is complete!');
    loadingStore.stopLoading()
  })

  //create marker layer
  const markerLayer = new VectorLayer({
    source: new Vector({
      features: [
        new ol.Feature({
          geometry: new Point([794, 200]), // adjust the coordinates to match your marker
        }),
        new ol.Feature({
          geometry: new Point([0, 1604]), // adjust the coordinates to match your marker
        }),
        new ol.Feature({
          geometry: new Point([2153, 1604]), // adjust the coordinates to match your marker
        }),
        new ol.Feature({
          geometry: new Point([2153, 0]), // adjust the coordinates to match your marker
        }),
      ]
    }),
    style: new Style({
      image: new Icon({
        src: require('../../assets/map/marker.png'), // adjust the path to match the location of your marker image
        anchor: [0.5, 1],
      }),
    }),
  });


  map.addLayer(markerLayer); // add the layer to the map



});

onUnmounted(() => {
  clearInterval(intervalQuery)
})




</script>

<style scoped>
#mapRoot {
  @apply w-full h-full px-4 pb-20 pt-4;
}
</style>