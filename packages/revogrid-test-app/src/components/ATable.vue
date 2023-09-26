<template>
  <div class="container">
    <VGrid class="table" :resize="false" :readonly="true" :source="rows" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VGrid from '@revolist/vue3-datagrid';

function generateFakeDataRows(rowsNumber: number) {
  const result: any = [];
  const all = rowsNumber;
  for (let j = 0; j < all; j++) {
    let row = j;
    if (!result[row]) {
      result[row] = {};
    }
    result[row]['myRow'] = `I am row ${row}`;
  }
  return result;
}

const rows = ref<any>(generateFakeDataRows(10000));
const columns = ref<any>([
  {
    prop: 'myRow',
  },
]);
</script>

<style>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
.list .row {
  display: flex;
}

.container {
  height: 50rem;
}

.list .row .data-cell,
.data-header-cell {
  position: relative !important;
  width: auto !important;
}

revogr-focus,
.selection-border-range,
.edit-input-wrapper {
  width: 100% !important;
}
.header-wrapper {
  display: none;
}

.row,
.header-row {
  display: flex;
}

.row .data-cell,
.data-header-cell {
  position: relative !important;
  width: auto !important;
}

.table {
  width: 100%;
}

.rgCell {
  line-height: 1rem;
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
}

.checkbox-cell {
  justify-content: center;
  padding: 0;
}

revo-grid[theme='default'] revogr-header .header-rgRow,
revo-grid[theme='default'] revogr-header .group-rgRow {
  text-transform: none;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
}
revo-grid[theme='default'] revogr-data .rgRow {
  box-shadow: none;
}

.viewports {
  width: 100%;
}
</style>
