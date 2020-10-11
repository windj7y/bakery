<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light font-weight-bold">
      <div class="container">
        <router-link class="navbar-brand logo" to="/">Bakery</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">關於我們</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">商品介紹</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/favorite">
                <i class="fas fa-heart"></i>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link cart-link" to="/cart">
                <i class="fas fa-shopping-cart"></i>
                <span class="badge badge-pill badge-danger cart-num">{{ quantity }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view/>

    <div v-if="gotopFlag" class="gotop" @click="goTop">
      <i class="fa fa-angle-up"></i>
    </div>

    <footer class="footer">
      <div class="container d-flex justify-content-between">
        <ul class="d-flex text-center mb-0">
          <li class="mr-md-1">
            <a href="#" class="icon p-2" alt="facebook" title="facebook">
              <i class="fab fa-facebook-f fa-lg"></i>
            </a>
          </li>
          <li class="mr-md-1">
            <a href="#" class="icon p-2" alt="line" title="line">
              <i class="fab fa-line fa-lg"></i>
            </a>
          </li>
          <li>
            <a href="#" class="icon p-2" alt="instagram" title="instagram">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
          </li>
        </ul>
        <p class="mb-0">
          以上素材均由網路收集而來，僅為練習之用
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0,
      gotopFlag: false,
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.$http.get(url)
        .then((res) => {
          this.quantity = res.data.data.length;
        })
        .catch(() => {
          this.quantity = 0;
        });
    },
    goTop() {
      const timer = setInterval(() => {
        const ispeed = Math.floor(this.scrollTop / 5);
        document.body.scrollTop = this.scrollTop + ispeed;
        document.documentElement.scrollTop = document.body.scrollTop;
        if (this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (this.scrollTop > 60) {
        this.gotopFlag = true;
      } else {
        this.gotopFlag = false;
      }
    },
  },
  created() {
    this.getCart();
    this.$bus.$on('updateQuantity', (quantity, reset = 0) => {
      this.quantity = reset === 1 ? quantity : this.quantity + quantity;
    });
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop);
  },
};
</script>
