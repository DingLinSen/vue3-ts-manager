<template>
    <i v-if="icon && icon.includes('icon-')" :class="icon" class="icons"></i>
    <icon v-else :icon="icon" class="icons" />
</template>
<script setup lang="ts">
defineProps(['icon'])
</script>
<style>
.icons {
  width: 16px;
  height: 16px;
  font-size: 16px;
  margin-right: 6px;
}
</style>
