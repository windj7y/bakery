<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Banner :bannerData="bannerData"></Banner>

    <div class="bg-light-gray p-4">
      <div class="container pt-4">
        <div v-if="favorites.length === 0" class="mb-5">
          <p class="h3 text-center">
            您的收藏目前是空的，快前往<router-link class="buy" to="/products">商品區</router-link>逛逛吧！
          </p>
        </div>

        <div v-else>
          <h3 class="favorite-title pb-3 mb-5">收藏清單</h3>
          <div class="row mb-4">
            <div class="col-md-3 mb-4" v-for="item in favorites" :key="item.id">
              <div class="card text-center border-0 h-100 shadow-sm">
                <a href="#" class="heart-icon" @click.prevent="removeFavorite(item.id)">
                  <i class="fas fa-heart fa-lg"></i>
                </a>
                <img :src="item.imageUrl[0]" class="card-img-top py-3" :alt="item.title">
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

        <h3 class="mb-4 pl-2 product-title">人氣商品</h3>
        <div class="mb-4">
          <VueSlickCarousel v-bind="settings" v-if="hotProducts.length">
            <div class="p-3" v-for="item in hotProducts" :key="item.id">
              <div class="card text-center border-0 h-100 shadow-sm">
                <router-link class="product" :to="`/product/${item.id}`">
                  <img :src="item.imageUrl[0]" class="card-img-top py-3" :alt="item.title">
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

    <NoticeModal :notice="notice"></NoticeModal>
  </div>
</template>

<script>
/* global $ */

import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import Banner from '@/components/Banner.vue';
import NoticeModal from '@/components/modal/NoticeModal.vue';

export default {
  components: {
    VueSlickCarousel,
    Banner,
    NoticeModal,
  },
  data() {
    return {
      products: [],
      hotProducts: [],
      favorites: [],
      favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || [],
      notice: {
        msg: '',
        class: '',
      },
      bannerData: {
        title: '我的收藏',
        class: 'cart-banner',
      },
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
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`;

      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data;
          this.products = JSON.parse(JSON.stringify(this.products.sort((a, b) => a.options.order - b.options.order)));
          this.hotProducts = this.products.filter((item) => item.options.isHot);
          this.getFavorites();
          this.isLoading = false;
        })
        .catch(() => {
          this.notice.msg = '無法取得商品清單';
          this.notice.class = 'error';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
          }, 1000);

          this.isLoading = false;
        });
    },
    getFavorites() {
      this.favorites = this.products.filter((item) => this.favoriteList.indexOf(item.id) > -1);
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
    removeFavorite(id) {
      const favoriteId = this.favoriteList.indexOf(id);

      if (favoriteId !== -1) {
        this.favoriteList.splice(favoriteId, 1);
        this.getFavorites();
        this.notice.msg = '已取消收藏。';
        this.notice.class = 'success';
      }
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));

      $('#noticeModal').modal('show');

      setTimeout(() => {
        $('#noticeModal').modal('hide');
      }, 1000);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
