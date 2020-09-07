<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-4">
      <div class="row mb-4">
        <div class="col-md-6 mb-4">
          <img :src="product.imageUrl[0]" class="img-fluid" alt="">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center px-5">
          <h2 class="font-weight-bold mb-4">{{ product.title }}</h2>
          <p class="about-desc">
            {{ product.description }}
          </p>
          <div class="text-right mb-3">
            <p v-if="product.origin_price" class="origin-price mb-0">NT$ {{ product.origin_price | money }}</p>
            <p v-if="product.price" class="font-weight-bold price price-size">NT$ {{ product.price | money }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <input type="number" name="數量" class="form-control quantity w-50 mr-4" min="1" v-model="quantity">
            <button type="button" class="btn btn-primary w-50" @click="addCart(product.id)" :disabled="loadingItem === product.id">
              <span v-if="loadingItem === product.id" >
                <span class="spinner-border spinner-border-sm"></span>
                加入中
              </span>
              <span v-else>加入購物車</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-light-gray p-5">
      <div class="container">
        <h3 class="mb-4 pl-2 product-title">你可能也會喜歡</h3>
        <div class="mb-4">
          <VueSlickCarousel v-bind="settings" v-if="products.length">
            <div class="p-3" v-for="item in products" :key="item.id">
              <div class="card text-center border-0 h-100 shadow-sm">
                <router-link class="product" :to="`/product/${item.id}`">
                  <img :src="item.imageUrl[0]" class="card-img-top py-3" alt="...">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <p class="card-text font-weight-bold price">NT$ {{ item.price | money }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </div>

    <noticeModal :notice="notice"></noticeModal>
  </div>
</template>

<script>
/* global $ */

import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import noticeModal from '@/components/modal/NoticeModal.vue';

export default {
  components: {
    VueSlickCarousel,
    noticeModal,
  },
  data() {
    return {
      products: [],
      product: {
        imageUrl: [],
      },
      notice: {
        msg: '',
        class: '',
      },
      quantity: 1,
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 623,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      isLoading: false,
      loadingItem: '',
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.data;
          this.getProducts(this.product.category, this.product.id);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    getProducts(type, id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;

          this.products = this.products.sort((a, b) => a.options.order - b.options.order);
          this.products = this.products.filter((item) => item.category === type && item.id !== id);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    addCart(id) {
      this.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity: this.quantity,
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

          this.$bus.$emit('updateQuantity', 1);
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
  },
  created() {
    this.getProduct();
  },
  watch: {
    $route() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.getProduct();
    },
  },
};
</script>
