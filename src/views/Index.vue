<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="jumbotron jumbotron-fluid d-flex align-items-center text-dark index-banner mb-0">
      <div class="container">
        <div class="bg-bright p-5">
          <h2 class="display-4">來場麵包饗宴吧！</h2>
          <p class="lead">早晨，就從美味又可口的麵包開始，保證讓你的一天活力滿滿。</p>
          <button type="button" class="btn btn-primary" @click="goProducts">立即選購</button>
        </div>
      </div>
    </div>

    <div class="bg-light-gray p-5">
      <div class="container">
        <h3 class="mb-4 pl-2 product-title">最新消息</h3>
        <div class="my-3 p-3 bg-white rounded shadow-sm">
          <ul class="list-unstyled my-2">
            <li class="media">
              <svg class="bd-placeholder-img mr-3 rounded-lg" width="64" height="64" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 64x64">
                <rect width="100%" height="100%" fill="#ed7d31" />
                <text fill="#fff">
                  <tspan x="25%" y="40%">節日</tspan>
                  <tspan x="25%" y="80%">優惠</tspan>
                </text>
              </svg>
              <div class="media-body border-bottom">
                <p class="mt-0 mb-1">2020-10-08</p>
                <p>歡慶雙十節！現在輸入優惠碼【double10】，結帳享 8 折優惠</p>
              </div>
            </li>
            <li class="media my-4">
              <svg class="bd-placeholder-img mr-3 rounded-lg" width="64" height="64" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 64x64">
                <rect width="100%" height="100%" fill="#ed7d31" />
                <text fill="#fff">
                  <tspan x="25%" y="40%">節日</tspan>
                  <tspan x="25%" y="80%">優惠</tspan>
                </text>
              </svg>
              <div class="media-body border-bottom">
                <p class="mt-0 mb-1">2020-09-28</p>
                <p>中秋節大放送，現在輸入優惠碼【autumn7】，結帳享 7 折優惠</p>
              </div>
            </li>
            <li class="media my-4">
              <svg class="bd-placeholder-img mr-3 rounded-lg" width="64" height="64" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 64x64">
                <rect width="100%" height="100%" fill="#ff4d4d" />
                <text fill="#fff">
                  <tspan x="25%" y="40%">活動</tspan>
                  <tspan x="25%" y="80%">促銷</tspan>
                </text>
              </svg>
              <div class="media-body border-bottom">
                <p class="mt-0 mb-1">2020-09-15</p>
                <p>來店使用振興卷，結帳滿 300 元，現折 20 元</p>
              </div>
            </li>
            <li class="media">
              <svg class="bd-placeholder-img mr-3 rounded-lg" width="64" height="64" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 64x64">
                <rect width="100%" height="100%" fill="#ab6135" />
                <text fill="#fff">
                  <tspan x="25%" y="40%">系統</tspan>
                  <tspan x="25%" y="80%">公告</tspan>
                </text>
              </svg>
              <div class="media-body border-bottom">
                <p class="mt-0 mb-1">2020-09-07</p>
                <p>Bakery 電商正式啟用，歡迎大家多多支持</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <ul class="card-group text-center">
            <li class="card border-0 p-3 feature">
              <div class="card-body feature-border">
                <i class="fas fa-utensils fa-5x mb-3"></i>
                <h5 class="card-title">嚴選的天然食材</h5>
                <p class="card-text">讓你吃得安心又健康</p>
              </div>
            </li>
            <li class="card border-0 p-3 feature">
              <div class="card-body feature-border">
                <i class="fas fa-bread-slice fa-5x mb-3"></i>
                <h5 class="card-title">多種的麵包選擇</h5>
                <p class="card-text">滿足顧客不同需求的味蕾</p>
              </div>
            </li>
            <li class="card border-0 p-3 feature">
              <div class="card-body feature-border">
                <i class="fas fa-truck fa-5x mb-3"></i>
                <h5 class="card-title">線上訂購新鮮送達</h5>
                <p class="card-text">每口都是幸福的滋味</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-light-gray p-5">
      <div class="container">
        <h3 class="mb-4 pl-2 product-title">人氣商品</h3>
        <div class="mb-5">
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

        <h3 class="mb-4 pl-2 product-title">精選新品</h3>
        <div class="mb-4">
          <VueSlickCarousel v-bind="settings" v-if="newProducts.length">
            <div class="p-3" v-for="item in newProducts" :key="item.id">
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

    <div class="container my-5">
      <div class="row">
        <div class="col-md-3 col-6 d-flex flex-column align-items-center">
          <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/tqGh52hWVmHhddneG97RsBEENnSEQSSCnjRdXmPLmZ3Z0j8Ygvpx7lBCWtyXL0MMXdGK1TZDkvafM3NUEghl6AxSR8rDUUn0C4AF1MmTAIydWVAYRjaT52qOmb0vdqZ2.jpg" alt="portrait" class="img-fluid mb-3">
          <h5 class="font-weight-bold text-center">台北市 李先生</h5>
          <p>麵包新鮮又好吃，價格實惠，會讓人再度光臨的好店家！</p>
        </div>
        <div class="col-md-3 col-6 d-flex flex-column align-items-center">
          <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/1oJkYpCqaFkDe6mmJ4pzGBpzsOuvGMWb5pZr3qNrNlVIZaHnYcIomtAZcLCEwjPome6LzBYl6xGPK8NMH0CAbvZBYqIaO2ay3oTD7LHaIo4GPCdaQZmfnpiYqbAdJzTP.jpg" alt="portrait" class="img-fluid mb-3">
          <h5 class="font-weight-bold text-center">新北市 陳小姐</h5>
          <p>麵包、蛋糕口味多樣，不會很甜，推薦給大家吃看看。</p>
        </div>
        <div class="col-md-3 col-6 d-flex flex-column align-items-center">
          <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/8LH2zNduz5tJHRy8TIyQI28qIXMlCsSMjOWsxnNsMuOycNBOGwLOW13epqYU7bCM0c3GzpL1VywclBg9TwEcnvDBkgrNC5ayDXMDWc19oSPnp2uHb3gDw1MQt98YKBKb.jpg" alt="portrait" class="img-fluid mb-3">
          <h5 class="font-weight-bold text-center">台南市 林先生</h5>
          <p>用料實在，就算隔夜冰過，口感依然存在。</p>
        </div>
        <div class="col-md-3 col-6 d-flex flex-column align-items-center">
          <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Ei0GdQYraPBuBAJEYmM9vn76jMxBQAldJbSJeLKpFc9fjp5Cmqv5yquJqNW57f3JbFPs6ve2cAitn4cK8ddu7ovrEITXG600JPOZZqtTchhBKJUbf9lkQ3c9woY5yLqT.jpg" alt="portrait" class="img-fluid mb-3">
          <h5 class="font-weight-bold text-center">高雄市 黃小姐</h5>
          <p>最喜歡奶香葡萄乾麵包，淡淡的奶香和微酸的葡萄乾是絕配，讓我想一吃再吃。</p>
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
import NoticeModal from '@/components/modal/NoticeModal.vue';

export default {
  components: {
    VueSlickCarousel,
    NoticeModal,
  },
  data() {
    return {
      products: [],
      hotProducts: [],
      newProducts: [],
      quantity: 0,
      notice: {
        msg: '',
        class: '',
      },
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
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
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`;

      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data;

          this.newProducts = JSON.parse(JSON.stringify(this.products));
          this.newProducts = this.newProducts.filter((item, index) => index < 6);

          this.products = this.products.sort((a, b) => a.options.order - b.options.order);
          this.hotProducts = this.products.filter((item) => item.options.isHot);

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
    goProducts() {
      this.$router.push('/products');
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
