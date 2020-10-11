<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-6">
        <h3><i class="fas fa-star-and-crescent"></i> 產品列表</h3>
      </div>
      <div class="col-6 text-right">
        <button type="button" class="btn btn-info" @click="showModal('', 'productModal')">新增產品</button>
      </div>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col" class="text-left" width="150">分類</th>
          <th scope="col" class="text-left">產品名稱</th>
          <th scope="col" width="120">原價</th>
          <th scope="col" width="120">售價</th>
          <th scope="col" width="100">是否啟用</th>
          <th scope="col" width="100">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="text-left">{{ item.category }}</td>
          <td class="text-left">{{ item.title }}</td>
          <td>{{ item.origin_price | money }}</td>
          <td>{{ item.price | money }}</td>
          <td>
            <span class="icon-green" v-if="item.enabled"><i class="fas fa-check"></i></span>
            <span class="icon-red" v-else><i class="fas fa-times"></i></span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-primary btn-sm mr-1" title="編輯" @click="showModal(item, 'productModal')" :disabled="loadingItem === item.id">
              <i v-if="loadingItem === item.id" class="spinner-border spinner-border-sm"></i>
              <i v-else class="fas fa-pen"></i>
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" title="刪除" @click="showModal(item, 'removeModal')"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @update="getProducts"></Pagination>
    <ProductModal :tempProduct="tempProduct" @update="getProducts"></ProductModal>
    <RemoveModal :tempProduct="tempProduct" @update="getProducts"></RemoveModal>
  </div>
</template>

<script>
/* global $ */

import ProductModal from '@/components/modal/ProductModal.vue';
import RemoveModal from '@/components/modal/RemoveModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    ProductModal,
    RemoveModal,
    Pagination,
  },
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: [],
        options: {
          isHot: false,
          order: 999,
        },
      },
      pagination: {},
      paged: 10,
      isLoading: false,
      loadingItem: '',
    };
  },
  methods: {
    showModal(item, modalName) {
      this.tempProduct = item === '' ? { imageUrl: [], options: { isHot: false, order: 999 } } : JSON.parse(JSON.stringify(item));

      if (this.tempProduct.id && modalName === 'productModal') {
        this.getProduct(this.tempProduct.id);
        return;
      }
      $(`#${modalName}`).modal('show');
    },
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}&paged=${this.paged}`;

      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.$toastr.e('無法顯示產品列表');
          this.isLoading = false;
        });
    },
    getProduct(id) {
      this.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;

      this.$http.get(url)
        .then((res) => {
          this.loadingItem = '';
          this.tempProduct = res.data.data;
          $('#productModal').modal('show');
        })
        .catch(() => {
          this.loadingItem = '';
          this.$toastr.e('無法取得產品資料');
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
