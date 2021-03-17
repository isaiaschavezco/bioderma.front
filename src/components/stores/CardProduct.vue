<template>
  <a-card style="min-height: 20rem;  overflow:hidden;">
    <div class="campaing__header">
      <a-row :gutter="12" type="flex" justify="space-around">
        <h2>
          {{
            item.title.length > 19
              ? item.title.substring(0, 18) + "..."
              : item.title
          }}
        </h2>
        <!-- @change="onChange" -->
        <a-checkbox
          v-if="!isEditStoreTitleVisible"
          @change="onChangeCheckbox"
        />
      </a-row>
    </div>
    <a-divider />
    <p class="center">
      <strong>{{ item.price }} pesos</strong>
    </p>
    <div style="width:100%; height:10rem; text-align:center;">
      <img class="campaing__imgd" alt="example" :src="item.image" />
    </div>
    <a-space
      align="center"
      style="height: 5rem; margin:0;"
      class="productDescription"
    >
      <span style="font-weight: 700;">{{ item.description }}</span>
    </a-space>
    <template slot="actions" class="ant-card-actions"> </template>
  </a-card>
</template>

<script>
export default {
  props: {
    item: Object,
    selectProduct: Function,
    isEditStoreTitleVisible: Boolean
  },
  methods: {
    onChangeCheckbox(e) {
      this.selectProduct(this.item.id, e.target.checked);
    }
  }
};
</script>

<style>
.campaing__imgd {
  width: 10rem;
  height: 10rem;
}
</style>
