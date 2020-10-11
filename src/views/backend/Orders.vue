<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-12">
        <h3><i class="far fa-list-alt"></i> 訂單列表</h3>
      </div>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col" class="text-left" width="220">購買時間</th>
          <th scope="col" class="text-left">購買款項</th>
          <th scope="col" width="120">付款方式</th>
          <th scope="col" width="120">應付金額</th>
          <th scope="col" width="150">是否付款</th>
          <th scope="col" width="100">客戶資料</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td class="text-left">
            {{ item.created.datetime }}
          </td>
          <td class="text-left">
            <ul class="list-unstyled mt-3">
              <li v-for="(product, key) in item.products" :key="key" class="pb-1">
                【{{ product.product.title }}】
                數量：{{ product.quantity }}{{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>
            {{ item.payment }}
          </td>
          <td>
            {{ item.amount | money }}
          </td>
          <td>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.paid" @change="updatePaid(item.id, item.paid)">
              <label class="custom-control-label" :for="item.id">
                <span v-if="item.paid">已付款</span>
                <span v-else>待付款</span>
              </label>
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-outline-info btn-sm" title="檢視" @click="getOrder(item.id)" :disabled="loadingItem === item.id">
              <i v-if="loadingItem === item.id" class="spinner-border spinner-border-sm"></i>
              <i v-else class="fas fa-search"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @update="getOrders"></Pagination>
    <OrderModal :client="client"></OrderModal>
  </div>
</template>

<script>
/* global $ */

import OrderModal from '@/components/modal/OrderModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    OrderModal,
    Pagination,
  },
  data() {
    return {
      orders: [],
      client: {},
      pagination: {},
      paged: 10,
      isLoading: false,
      loadingItem: '',
    };
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}&paged=${this.paged}`;

      this.$http.get(url)
        .then((res) => {
          this.orders = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.$toastr.e('無法顯示訂單列表');
          this.isLoading = false;
        });
    },
    getOrder(id) {
      this.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;

      this.$http.get(url)
        .then((res) => {
          this.loadingItem = '';
          this.client = res.data.data.user;
          $('#orderModal').modal('show');
        })
        .catch(() => {
          this.loadingItem = '';
          this.$toastr.e('無法取得客戶資料');
        });
    },
    updatePaid(id, status) {
      this.isLoading = true;
      const parm = status ? 'paid' : 'unpaid';
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}/${parm}`;

      this.$http.patch(url)
        .then(() => {
          this.$toastr.s('更新付款狀態成功');
          this.getOrders();
          this.isLoading = false;
        })
        .catch(() => {
          this.$toastr.e('更新付款狀態失敗');
          this.getOrders();
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
