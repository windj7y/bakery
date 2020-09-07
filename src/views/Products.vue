<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <banner :bannerData="bannerData"></banner>

    <div class="p-4">
      <div class="container">
        <div class="list-group list-group-horizontal text-center font-weight-bold">
          <a href="#all" class="list-group-item list-group-item-action active product-item" data-toggle="list">
            <i class="fas fa-store"></i> 全部商品
          </a>
          <a href="#hot" class="list-group-item list-group-item-action product-item" data-toggle="list" @click.prevent="getList('hot')">
            <i class="fab fa-hotjar"></i> 人氣商品
          </a>
          <a href="#new" class="list-group-item list-group-item-action product-item" data-toggle="list" @click.prevent="getList('new')">
            <i class="fas fa-star"></i> 精選新品
          </a>
          <a href="#bread" class="list-group-item list-group-item-action product-item" data-toggle="list" @click.prevent="getList('bread')">
            <i class="fas fa-bread-slice"></i> 麵包系列
          </a>
          <a href="#cake" class="list-group-item list-group-item-action product-item" data-toggle="list" @click.prevent="getList('cake')">
            <i class="fas fa-birthday-cake"></i> 甜點蛋糕
          </a>
          <a href="#pie" class="list-group-item list-group-item-action product-item" data-toggle="list" @click.prevent="getList('pie')">
            <i class="fas fa-chart-pie"></i> 手工派塔
          </a>
        </div>
      </div>
    </div>

    <div class="bg-light-gray p-4">
      <div class="container pt-4">
        <div class="tab-content mb-4">
          <div class="tab-pane active" id="all">
            <div class="row mb-4">
              <div class="col-md-3 mb-4" v-for="item in products" :key="item.id">
                <div class="card text-center border-0 h-100 shadow-sm">
                  <img :src="item.imageUrl[0]" class="card-img-top py-3" alt="...">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <p class="card-text font-weight-bold price">NT$ {{ item.price | money }}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" @click="goProduct(item.id)">了解更多</button>
                    <button type="button" class="btn btn-primary" @click="addCart(item.id)" :disabled="loadingItem === item.id">
                      <span v-if="loadingItem === item.id" >
                        <span class="spinner-border spinner-border-sm"></span>
                        加入中
                      </span>
                      <span v-else>加入購物車</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <pagination :pages="pagination" @update="getProducts"></pagination>
          </div>
          <div class="tab-pane" id="hot">
            <div class="row">
              <div class="col-md-3 mb-4" v-for="item in productType.hot" :key="item.id">
                <div class="card text-center border-0 h-100 shadow-sm">
                  <img :src="item.imageUrl[0]" class="card-img-top py-3" alt="...">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <p class="card-text font-weight-bold price">NT$ {{ item.price | money }}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" @click="goProduct(item.id)">了解更多</button>
                    <button type="button" class="btn btn-primary" @click="addCart(item.id)" :disabled="loadingItem === item.id">
                      <span v-if="loadingItem === item.id" >
                        <span class="spinner-border spinner-border-sm"></span>
                        加入中
                      </span>
                      <span v-else>加入購物車</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="new">
            <div class="row">
              <div class="col-md-3 mb-4" v-for="item in productType.new" :key="item.id">
                <div class="card text-center border-0 h-100 shadow-sm">
                  <img :src="item.imageUrl[0]" class="card-img-top py-3" alt="...">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <p class="card-text font-weight-bold price">NT$ {{ item.price | money }}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" @click="goProduct(item.id)">了解更多</button>
                    <button type="button" class="btn btn-primary" @click="addCart(item.id)" :disabled="loadingItem === item.id">
                      <span v-if="loadingItem === item.id" >
                        <span class="spinner-border spinner-border-sm"></span>
                        加入中
                      </span>
                      <span v-else>加入購物車</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="bread">
            <div class="row">
              <div class="col-md-3 mb-4" v-for="item in productType.bread" :key="item.id">
                <div class="card text-center border-0 h-100 shadow-sm">
                  <img :src="item.imageUrl[0]" class="card-img-top py-3" alt="...">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <p class="card-text font-weight-bold price">NT$ {{ item.price | money }}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" @click="goProduct(item.id)">了解更多</button>
                    <button type="button" class="btn btn-primary" @click="addCart(item.id)" :disabled="loadingItem === item.id">
                      <span v-if="loadingItem === item.id" >
                        <span class="spinner-border spinner-border-sm"></span>
                        加入中
                      </span>
                      <span v-else>加入購物車</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="cake">
            <div class="row">
              <div class="col-md-3 mb-4" v-for="item in productType.cake" :key="item.id">
                <div class="card text-center border-0 h-100 shadow-sm">
                  <img :src="item.imageUrl[0]" class="card-img-top py-3" alt="...">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <p class="card-text font-weight-bold price">NT$ {{ item.price | money }}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" @click="goProduct(item.id)">了解更多</button>
                    <button type="button" class="btn btn-primary" @click="addCart(item.id)" :disabled="loadingItem === item.id">
                      <span v-if="loadingItem === item.id" >
                        <span class="spinner-border spinner-border-sm"></span>
                        加入中
                      </span>
                      <span v-else>加入購物車</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="pie">
            <div class="row">
              <div class="col-md-3 mb-4" v-for="item in productType.pie" :key="item.id">
                <div class="card text-center border-0 h-100 shadow-sm">
                  <img :src="item.imageUrl[0]" class="card-img-top py-3" alt="...">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <p class="card-text font-weight-bold price">NT$ {{ item.price | money }}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" @click="goProduct(item.id)">了解更多</button>
                    <button type="button" class="btn btn-primary" @click="addCart(item.id)" :disabled="loadingItem === item.id">
                      <span v-if="loadingItem === item.id" >
                        <span class="spinner-border spinner-border-sm"></span>
                        加入中
                      </span>
                      <span v-else>加入購物車</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <noticeModal :notice="notice"></noticeModal>
  </div>
</template>

<script>
/* global $ */

import banner from '@/components/Banner.vue';
import noticeModal from '@/components/modal/NoticeModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  components: {
    banner,
    noticeModal,
    pagination,
  },
  data() {
    return {
      products: [],
      productsOrder: [],
      productType: {
        hot: [],
        new: [],
        bread: [],
        cake: [],
        pie: [],
      },
      notice: {
        msg: '',
        class: '',
      },
      bannerData: {
        title: '商品介紹',
        class: 'products-banner',
      },
      pagination: {},
      isLoading: false,
      loadingItem: '',
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
          this.productType.new = JSON.parse(JSON.stringify(this.products));
          this.productsOrder = JSON.parse(JSON.stringify(this.products.sort((a, b) => a.options.order - b.options.order)));
          this.products = this.calculatePage(page, this.productsOrder);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    getList(type) {
      switch (type) {
        case 'hot':
          this.productType.hot = this.productsOrder.filter((item) => item.options.isHot);
          break;
        case 'new':
          this.productType.new = this.productType.new.filter((item, index) => index < 6);
          break;
        default: {
          const condition = {
            bread: '麵包',
            cake: '蛋糕',
            pie: '手工派',
          };
          this.productType[type] = this.productsOrder.filter((item) => item.category === condition[type]);
          break;
        }
      }
    },
    goProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    addCart(id) {
      this.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity: 1,
      };

      this.$http.post(url, cart)
        .then(() => {
          this.loadingItem = '';

          this.notice.msg = '已加入購物車，請點選上方購物車進行結帳。';
          this.notice.class = 'success';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
          }, 1000);

          this.$bus.$emit('updateQuantity', cart.quantity);
        })
        .catch((error) => {
          this.loadingItem = '';

          [this.notice.msg] = error.response.data.errors;
          this.notice.class = 'error';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
          }, 1000);
        });
    },
    calculatePage(page, data) {
      const alldataTotal = data.length;
      const eachdataTotal = 12;
      const pageTotal = Math.ceil(alldataTotal / eachdataTotal);

      let currentPage = page;
      if (currentPage > pageTotal) {
        currentPage = pageTotal;
      }

      const minNumber = currentPage * eachdataTotal - eachdataTotal + 1;
      const maxNumber = currentPage * eachdataTotal;

      const pageData = [];
      data.forEach((item, index) => {
        const number = index + 1;
        if (number >= minNumber && number <= maxNumber) {
          pageData.push(item);
        }
      });

      this.pagination = {
        current_page: currentPage,
        total_pages: pageTotal,
      };

      return pageData;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
