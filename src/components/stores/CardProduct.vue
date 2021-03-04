<template>
  <a-card style="min-height: 30rem;">
    <div class="campaing__header">
      <a-row :gutter="12">
        <a-col :lg="{ span: '24' }" :xl="{ span: '15' }">
          <h2>
            {{
              item.title.length > 19
                ? item.title.substring(0, 18) + "..."
                : item.title
            }}
          </h2>
        </a-col>
        <a-col :lg="{ span: '24' }" :xl="{ span: '9' }">
          <a-row class="camapaing__actions" type="flex" justify="space-between">
            <a-col span="8">
              <a-icon
                class="campaing__action"
                type="edit"
                @click="
                  gettingId(item.id),
                    gettingData(
                      item.title,
                      item.description,
                      item.points,
                      item.image
                    )
                "
              />
            </a-col>

            <a-col span="8">
              <a-icon
                class="campaing__action"
                type="delete"
                @click="onDeleteProductModal(), gettingId(item.id)"
              />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <a-divider />
    <p class="center">
      <strong>{{ item.points }} puntos</strong>
    </p>
    <div style="height:9rem; text-align:center;">
      <img class="campaing__img" alt="example" :src="item.image" />
    </div>
    <div style="height: 5rem;" class="productDescription">
      <span style="font-weight: 700;">{{ item.description }}</span>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {
    item: Object,
    gettingId: Function,
    gettingData: Function,
    deleteProductModal: Boolean,
    onDeleteProductModal: Function
  }
};
</script>

<style></style>
