<template>
  <div class="container-blog">
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container">
          <a-tabs type="card" @change="onChangeTab" style="elevation: 30deg;">
            <a-tab-pane tab="BLOG NAOS" key="1">
              <a-input-search placeholder="Buscar blog" @search="onSearchBlog" enterButton />
              <a-table :columns="columns" :dataSource="blogList" style="margin-top: 1rem;">
                <span slot="tags" slot-scope="tags">
                  <a-tag v-for="tag in tags" color="green" :key="tag.id">{{tag.name}}</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a-button
                    shape="circle"
                    icon="info"
                    size="large"
                    @click="editArticle(record.id)"
                  />
                  <a-divider type="vertical" />
                  <a-button
                    shape="circle"
                    icon="delete"
                    size="large"
                    @click="showDeleteConfirm(record.id, onDeleteBlog)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
            <a-tab-pane tab="BLOG FARMACIA" key="2">
              <a-input-search placeholder="Buscar blog" @search="onSearchBlog" enterButton />
              <a-table :columns="columns" :dataSource="blogList" style="margin-top: 1rem;">
                <span slot="tags" slot-scope="tags">
                  <a-tag v-for="tag in tags" color="green" :key="tag.id">{{tag.name}}</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a-button
                    shape="circle"
                    icon="info"
                    size="large"
                    @click="editArticle(record.id)"
                  />
                  <a-divider type="vertical" />
                  <a-button
                    shape="circle"
                    icon="delete"
                    size="large"
                    @click="showDeleteConfirm(record.id, onDeleteBlog)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
            <!--Nuevo-->
            <a-tab-pane tab="BLOG ESTHEDERM" key="4">
              <a-input-search placeholder="Buscar blog" @search="onSearchBlog" enterButton />
              <a-table :columns="columns" :dataSource="blogList" style="margin-top: 1rem;">
                <span slot="tags" slot-scope="tags">
                  <a-tag v-for="tag in tags" color="green" :key="tag.id">{{tag.name}}</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a-button
                    shape="circle"
                    icon="info"
                    size="large"
                    @click="editArticle(record.id)"
                  />
                  <a-divider type="vertical" />
                  <a-button
                    shape="circle"
                    icon="delete"
                    size="large"
                    @click="showDeleteConfirm(record.id, onDeleteBlog)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
            <!--Nuevo-->
            <a-tab-pane tab="BIODERMA GAMES" key="3">
              <a-input-search placeholder="Buscar blog" @search="onSearchBlog" enterButton />
              <a-table :columns="columns" :dataSource="blogList" style="margin-top: 1rem;">
                <span slot="tags" slot-scope="tags">
                  <a-tag v-for="tag in tags" color="green" :key="tag.id">{{tag.name}}</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a-button
                    shape="circle"
                    icon="info"
                    size="large"
                    @click="editArticle(record.id)"
                  />
                  <a-divider type="vertical" />
                  <a-button
                    shape="circle"
                    icon="delete"
                    size="large"
                    @click="showDeleteConfirm(record.id, onDeleteBlog)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
            <!---TODOS -->
            <a-tab-pane tab="TODOS" key="5">
              <a-input-search placeholder="Buscar blog" @search="onSearchBlog" enterButton />
              <a-table :columns="columns" :dataSource="blogList" style="margin-top: 1rem;">
                <span slot="tags" slot-scope="tags">
                  <a-tag v-for="tag in tags" color="green" :key="tag.id">{{tag.name}}</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a-button
                    shape="circle"
                    icon="info"
                    size="large"
                    @click="editArticle(record.id)"
                  />
                  <a-divider type="vertical" />
                  <a-button
                    shape="circle"
                    icon="delete"
                    size="large"
                    @click="showDeleteConfirm(record.id, onDeleteBlog,5)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col class="column-right" :xs="{ span: 2 }" style="text-align:center;">
        <div>
          <a-row style>
            <a-col>
              <a-button shape="circle" icon="plus" size="large" @click="() => blogNewModal = true" />
            </a-col>
            <a-col class="title-span-tag">Crear nueva entrada</a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>

    <a-modal title="NUEVA ENTRADA"  v-model="blogNewModal">
      <a-form :form="fileBlogForm">
        <a-form-item>
          <a-input
            placeholder="Ingresa el título de la entrada"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item>
          <div class="dropbox">
            <a-upload-dragger
              v-decorator="[
                'upload',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Favor de cargar una imagen'
                    }
                  ]
                }
              ]"
              name="upload"
              action="https://bioderma-desarrollo.herokuapp.com/upload/4"
              accept=".png, .jpg, jpge"
              @change="handleChangeFileUpload"
              :beforeUpload="beforeUpload"
              :fileList="fileList"
              listType="picture"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="picture" />
              </p>
              <p
                class="ant-upload-text"
              >Selecciona o suelta una imagen para el thumbnail de la entrada</p>
              <p class="ant-upload-hint">Únicamente archivos .png, .jpg o .jpge</p>
            </a-upload-dragger>
          </div>
        </a-form-item>
        <a-form-item>
              <BlogFilter 
                :resetFilters="blogNewModal"
               @updateFilters="updateFilters" 
               :isBlogEsthederm="this.isBlogEsthederm" :isBiodermaGame="this.isBiodermaGame" 
                :isBlogNaos="this.isBlogNaos" :isAll="this.isAll" 

              />
        </a-form-item>


      </a-form>
      <a-divider :style="{ margin: '10px 0px', border: '1px solid rgba(0,0,0,0.1)' }" />
      <FormFilter />
      <template slot="footer">
        <a-button
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          @click="onSubmitBlog"
        >SIGUIENTE</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import BlogFilter from "../components/forms/filters/BlogFilter.vue";


const columns = [
  {
    dataIndex: "title",
    key: "title",
    title: "Nombre de blog",
    align: "center"
  },
  {
    title: "Etiquetas",
    dataIndex: "tags",
    key: "tags",
    align: "center",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Fecha",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    sorter: (a, b) => {
      if (a.profile < b.profile) {
        return -1;
      }
      if (a.profile > b.profile) {
        return 1;
      }
      return 0;
    }
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    title: "HYDRABIO GEL-CREMA PREMIO COSMÉTICA GQ 2018",
    date: "01/01/2000",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    key: "2",
    title: "HYDRABIO GEL-CREMA PREMIO COSMÉTICA GQ 2018",
    label: "prueba@inmersys.com",
    date: "01/01/2000",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    key: "3",
    title: "HYDRABIO GEL-CREMA PREMIO COSMÉTICA GQ 2018",
    label: "prueba@inmersys.com",
    date: "01/01/2000",
    tags: ["tag1", "tag2", "tag3"]
  }
];

export default {
  components:{
    BlogFilter
  },
  data() {
    return {
      collapsed: false,
      data,
      blogs: [],
      columns,
      value: 1,
      activeTab: 1,
      fileBlogForm: this.$form.createForm(this),
      fileList: [],
      blogNewModal: false,
      inviteUserLoading: false,
      isBiodermaGame: false,
      isBlogEsthederm: false,
      isBlogNaos: true,
      isAll: false,
      blogList: [],
      deleteFilters: false,
      filters: []
    };
  },
  methods: {
    onSubmitBlog() {

      if(this.filters.length === 0){
        this.showNotification(
            "warning",
            "Debes selecionar al menos un filtro",
            "Por favor selecciona un filtro"
          );
      }

      this.fileBlogForm.validateFields(async (err, values) => {
        if (!err) {
          console.log("this.fileBlogForm: ", this.fileBlogForm);
          this.$router.push({
            name: "newblog",
            params: {
              title: values.title,
              image: values.upload.fileList[0].response,
              isBiodermaGame: this.isBiodermaGame,
              isBlogNaos: this.isBlogNaos,
              isBlogEsthederm: this.isBlogEsthederm,
              isAll: this.isAll,
              filters: this.filters
            }
          });
        }
      });
    },
    handleChangeFileUpload(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
    beforeUpload(file) {
      let status = true;
      this.fileBlogForm.validateFields((err, values) => {
        if (err) {
          if (err.menu || err.submenu || err.title) {
            status = false;
          }
        }
      });
      return status;
    },
    onChangeTab(activeTabKey) {
      //TENGO QUE MODIFICA LA BASE DE DATOS PARA COLOCAR EN NULL EL CAMPO ESTHEDERM
      //DE AQUELLOS POSTS QUE SEAN DE BIODEMAGAME
      //También colocar en false quellos que no sean de biodermagame ni blogesthederm
      this.activeTab = activeTabKey;
      switch (activeTabKey) {
        case "1":
          this.isBiodermaGame = false;
          this.isAll = false;
          this.isBlogEsthederm = false;
          this.isBlogNaos = true;
          this.getBlogList();
          break;
        case "2":
          this.isBiodermaGame = false;
          this.isBlogNaos = false;
          this.isBlogEsthederm = false;
          this.isAll = false;
          this.getBlogList();
          break;
        case "3":
          this.isBiodermaGame = true;
          this.isBlogNaos = false;
          this.isBlogEsthederm = false;
          this.isAll = false;
          this.getBlogList();
          break;
        case "4":
          this.isBiodermaGame = false;
          this.isBlogNaos = false;
          this.isBlogEsthederm = true;
          this.isAll = false;
          this.getBlogList();
          break;
        case "5":
          this.isBiodermaGame = false;
          this.isBlogNaos = false;
          this.isBlogEsthederm = false;
          this.isAll = true;
          this.getBlogList();
          break;
        default:
          break;
      }
    },
    showDeleteConfirm(blogId, onDelete,blogType) {
      this.$confirm({
        title: "¿Estás seguro que deseas eliminar esta entrada?",
        okText: "ELIMINAR",
        okType: "danger",
        cancelText: "CANCELAR",
        centered: true,
        onOk() {
          onDelete(blogId,blogType);
        },
        onCancel() {}
      });
    },
    async onDeleteBlog(blogId,typeBlog) {
      try {
        const response = await this.$axios.delete(`article/${blogId}`);
        if (response.data.status == 0) {

          typeBlog !== 5 ? this.getBlogList() : this.getAllBlogs() 
          this.showNotification(
            "success",
            "Entrada eliminada",
            "La entrada ha sido eliminada exitosamente."
          );
        }
      } catch (err) {
        this.showNotification(
          "error",
          "Error al eliminar entrada",
          "Ha ocurrido un error al intentar eliminar la entrada."
        );
      }
    },
    showNotification(type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      });
    },
    async getBlogList() {
      const request = {
        isBiodermaGame: this.isBiodermaGame,
        isBlogNaos: this.isBlogNaos,
        isBlogEsthederm: this.isBlogEsthederm,
        isAll: this.isAll
      }
      console.log("request", request);
      const responseblogList = await this.$axios.post("article/list", request);
      this.blogs = responseblogList.data.blogs;
      this.blogList = this.blogs;
      console.log(responseblogList);
    },
    async getAllBlogs(){
      const responseblogList = await this.$axios.get("article");
      this.blogs = responseblogList.data.blogs;
      this.blogList = this.blogs;
      console.log("ALL:",this.blogList);
    },
    onSearchBlog(value) {
      const newBlog = this.blogs.filter(element => {
        return element.title.toUpperCase().indexOf(value.toUpperCase()) >= 0;
      });
      //console.log(newBlog);
      if (newBlog.length == 0) {
        this.showNotification(
          "info",
          "No se encontraron coincidencias",
          "No se encontraron registros para esta búsqueda."
        );
      } else {
        this.blogList = newBlog;
      }
    },
    editArticle(articleId) {
      console.log("articleId: ", articleId);
      this.$router.push({
        name: "newblog",
        query: {
          blogId: articleId
        }
      });
    },
     updateFilters(filters, resetFilters) {
       this.filters = filters.slice();
      this.deleteFilters = resetFilters;
       console.log("SE ACUTALIZARON LOS FILTROS",filters);
    },
  },
  async mounted() {
    this.getBlogList();
  }
};
</script>
<style>
.column-right {
  margin-top: 65px;
}

.item-modal {
  margin-right: 30px;
  color: #526987;
  font-weight: 500;
}
</style>
