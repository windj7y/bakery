<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <banner :bannerData="bannerData"></banner>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
        <shoppingProcess :process="process"></shoppingProcess>

          <h4 class="order-title-complete pl-2">訂單明細</h4>
          <table class="table cart-list mb-4">
            <thead>
              <tr>
                <th colspan="2" scope="col">商品名稱</th>
                <th scope="col">售價</th>
                <th scope="col">數量</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td width="120px">
                  <img class="img-fluid" :src="item.product.imageUrl[0]">
                </td>
                <td class="text-left">
                  {{ item.product.title }}
                </td>
                <td v-if="item.product.price">
                  NT$ {{ item.product.price | money }}
                </td>
                <td>
                  {{ item.quantity }}
                </td>
                <td>
                  NT$ {{ item.product.price * item.quantity | money }}
                </td>
              </tr>
              <tr v-if="order.coupon && order.coupon.enabled">
                <td></td>
                <td colspan="3" class="text-left">折扣</td>
                <td>- NT$ {{ discount | money }}</td>
                <td></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-center font-weight-bold">
                  總計
                </td>
                <td colspan="2" class="text-center">
                  <span v-if="order.amount" class="font-weight-bold">NT$ {{ order.amount | money }}</span>
                </td>
              </tr>
            </tfoot>
          </table>

          <h4 class="order-title-complete pl-2 mb-4">訂購者資訊</h4>
          <div class="row justify-content-center mb-5">
            <div class="col-8">
              <div class="row mb-2">
                <div class="col-4">姓名</div>
                <div class="col-8">{{ order.user.name }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4">信箱</div>
                <div class="col-8">{{ order.user.email }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4">電話</div>
                <div class="col-8">{{ order.user.tel }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4">地址</div>
                <div class="col-8">{{ order.user.address }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4">付款方式</div>
                <div class="col-8">{{ order.payment }}</div>
              </div>
              <div class="row mb-2" v-if="order.message">
                <div class="col-4">留言</div>
                <div class="col-8">{{ order.message }}</div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="goProducts">
              繼續購物
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '@/components/Banner.vue';
import shoppingProcess from '@/components/ShoppingProcess.vue';

export default {
  components: {
    banner,
    shoppingProcess,
  },
  data() {
    return {
      order: {
        user: {},
      },
      cartTotal: 0,
      discount: '',
      bannerData: {
        title: '訂購完成',
        class: 'cart-banner',
      },
      process: ['alert-wait', 'alert-wait', 'alert-now'],
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/orders/${id}`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.order = res.data.data;

          if (this.order.coupon && this.order.coupon.enabled) {
            this.order.products.forEach((item) => {
              const subTotal = item.product.price * item.quantity;
              this.cartTotal += subTotal;
            });
            this.discount = this.cartTotal - this.order.amount;
          }
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
    this.getOrder();
  },
};
</script>
