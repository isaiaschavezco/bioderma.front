<template>
     <a-modal
      :visible="false"
      class="modal-validity"
      v-model="validityModalForm"
      :closable="false"
      width="60%"
      centered
      :bodyStyle="{
        height: '300px'
      }"
    >
      <h4>{{_title}}</h4>

      <div class="modal-validity__form">
        <span>{{_subtitle}}</span>
        <a-date-picker
            disabledTime
          format="DD-MM-YYYY"
          v-model="_newDateBlogPost"
          placeholder="Nueva fecha"
        />
  
      </div>

      <template slot="footer">
        <div class="validity-form__buttons">
          <a-button
            class="validity-form__button"
            type="primary"
            size="large"
            @click="onCancel"
          >Cancelar</a-button>
          <a-button
            class="validity-form__button"
            type="primary"
            size="large"
            @click="onSubmit"
          >{{_titleButton}}</a-button>
        </div>
      </template>
    </a-modal>
</template>

<script>
import moment from "moment";

export default {
    data(){
        return {
            _newDateBlogPost:0,
            validityModalForm:false
        }
    },
    created() {
        alert("HOl")

    },
    props: {
        _title:String,
        _subtitle:String,
        _titleButton:String,
    },
    methods: {
        moment,
        onCancel(){
            alert("Cancelar")

        },
        onSubmit(){
            alert("Submit")
            console.log("_newDateBlogPost",_newDateBlogPost)
        },

    }
}
</script>

<style>

</style>