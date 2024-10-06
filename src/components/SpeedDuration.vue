<script setup>
import { humanize } from "@/api/utils.js";

const props = defineProps({
  speed: String,
  seconds: Number,
  label: String,
});

const clacDuration = () => humanize(props.seconds / parseFloat(props.speed));
</script>

<template>
  <p>
    <span v-if="label" class="dim">{{ label }}:</span>
    <span v-else class="dim">{{ speed }}x:</span>
    {{ clacDuration() }}
  </p>
</template>
