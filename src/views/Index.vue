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

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="card-group text-center">
            <div class="card border-0 p-3 feature">
              <div class="card-body feature-border">
                <i class="fas fa-utensils fa-5x mb-3"></i>
                <h5 class="card-title">嚴選的天然食材</h5>
                <p class="card-text">讓你吃得安心又健康</p>
              </div>
            </div>
            <div class="card border-0 p-3 feature">
              <div class="card-body feature-border">
                <i class="fas fa-bread-slice fa-5x mb-3"></i>
                <h5 class="card-title">多種的麵包選擇</h5>
                <p class="card-text">滿足顧客不同需求的味蕾</p>
              </div>
            </div>
            <div class="card border-0 p-3 feature">
              <div class="card-body feature-border">
                <i class="fas fa-truck fa-5x mb-3"></i>
                <h5 class="card-title">線上訂購新鮮送達</h5>
                <p class="card-text">每口都是幸福的滋味</p>
              </div>
            </div>
          </div>
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

        <h3 class="mb-4 pl-2 product-title">精選新品</h3>
        <div class="mb-4">
          <VueSlickCarousel v-bind="settings" v-if="newProducts.length">
            <div class="p-3" v-for="item in newProducts" :key="item.id">
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
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      products: [],
      hotProducts: [],
      newProducts: [],
      quantity: 0,
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
          this.isLoading = false;
          this.products = res.data.data;

          this.newProducts = JSON.parse(JSON.stringify(this.products));
          this.newProducts = this.newProducts.filter((item, index) => index < 6);

          this.products = this.products.sort((a, b) => a.options.order - b.options.order);
          this.hotProducts = this.products.filter((item) => item.options.isHot);
        })
        .catch(() => {
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
