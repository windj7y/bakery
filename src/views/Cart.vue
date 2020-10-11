<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Banner :bannerData="bannerData"></Banner>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <ShoppingProcess :process="process"></ShoppingProcess>

          <div v-if="cart.length === 0">
            <p class="h3 text-center">
              您的購物車目前是空的，快去<router-link class="buy" to="/products">選購商品</router-link>吧！
            </p>
          </div>

          <table v-else class="table cart-list mb-4">
            <thead>
              <tr>
                <th colspan="2" scope="col">商品名稱</th>
                <th scope="col">售價</th>
                <th scope="col">數量</th>
                <th scope="col">小計</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.product.id">
                <td width="120px">
                  <img class="img-fluid" :src="item.product.imageUrl[0]" :alt="item.product.title">
                </td>
                <td class="text-left">
                  {{ item.product.title }}
                </td>
                <td>
                  NT$ {{ item.product.price | money }}
                </td>
                <td class="text-right">
                  <input type="number" name="數量" class="form-control m-auto quantity" min="1" v-model="item.quantity" @change="updateCart(item.product.id, item.quantity)">
                </td>
                <td>
                  NT$ {{ item.product.price * item.quantity | money }}
                </td>
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" title="刪除" @click="removeCart(item.product.id)" :disabled="loadingItem === item.product.id">
                    <span v-if="loadingItem === item.product.id" class="spinner-border spinner-border-sm"></span>
                    <i v-else class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="coupon && coupon.enabled">
                <td></td>
                <td colspan="3" class="text-left">折扣</td>
                <td>- NT$ {{ discount | money }}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="3">
                <td colspan="3" class="text-right">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="code">
                    <div class="input-group-append">
                      <button class="btn btn-outline-primary" type="button" @click="checkCode" :disabled="code === ''">套用</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="text-center font-weight-bold">
                  總計
                </td>
                <td colspan="2" class="text-center">
                  <span class="font-weight-bold">NT$ {{ cartTotal | money }}</span>
                </td>
              </tr>
            </tfoot>
          </table>

          <div v-if="cart.length !== 0" class="d-flex justify-content-between">
            <button type="button" class="btn btn-outline-secondary" @click="goProducts">
              <i class="fas fa-angle-left"></i> 繼續購物
            </button>
            <button type="button" class="btn btn-primary" @click="goCheckout">
              我要結帳 <i class="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <NoticeModal :notice="notice"></NoticeModal>
  </div>
</template>

<script>
/* global $ */

import Banner from '@/components/Banner.vue';
import ShoppingProcess from '@/components/ShoppingProcess.vue';
import NoticeModal from '@/components/modal/NoticeModal.vue';

export default {
  components: {
    Banner,
    ShoppingProcess,
    NoticeModal,
  },
  data() {
    return {
      cart: [],
      cartTotal: 0,
      code: '',
      discount: '',
      coupon: {},
      notice: {
        msg: '',
        class: '',
      },
      bannerData: {
        title: '購物車',
        class: 'cart-banner',
      },
      process: ['alert-now', 'alert-wait', 'alert-wait'],
      isLoading: false,
      loadingItem: '',
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data;
          this.cartTotal = 0;

          this.cart.forEach((item) => {
            const subTotal = item.product.price * item.quantity;
            this.cartTotal += subTotal;
          });

          if (this.coupon && this.coupon.enabled) {
            this.discount = Math.round(this.cartTotal * (1 - this.coupon.percent / 100));
            this.cartTotal -= this.discount;
          }

          this.isLoading = false;
        })
        .catch(() => {
          this.notice.msg = '無法取得購物車清單';
          this.notice.class = 'error';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
          }, 1000);

          this.isLoading = false;
        });
    },
    updateCart(id, num) {
      if (num <= 0) {
        this.notice.msg = '數量不可小於1';
        this.notice.class = 'error';
        $('#noticeModal').modal('show');

        setTimeout(() => {
          $('#noticeModal').modal('hide');
          this.getCart();
        }, 1000);

        return;
      }

      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity: num,
      };

      this.$http.patch(url, cart)
        .then(() => {
          this.notice.msg = '更新數量成功';
          this.notice.class = 'success';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
            this.getCart();
          }, 1000);
        })
        .catch(() => {
          this.notice.msg = '更新數量失敗';
          this.notice.class = 'error';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
          }, 1000);
        });
    },
    removeCart(id) {
      this.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;

      this.$http.delete(url)
        .then(() => {
          this.loadingItem = '';
          this.notice.msg = '刪除商品成功';
          this.notice.class = 'success';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
            this.$bus.$emit('updateQuantity', -1);
            this.getCart();
          }, 1000);
        })
        .catch(() => {
          this.loadingItem = '';
          this.notice.msg = '刪除商品失敗';
          this.notice.class = 'error';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
          }, 1000);
        });
    },
    checkCode() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      const codeData = {
        code: this.code,
      };
      this.$http.post(url, codeData)
        .then((res) => {
          this.coupon = res.data.data;

          // 取得現在時間戳
          const timestamp = Date.parse(new Date()) / 1000;
          this.notice.msg = '';

          switch (true) {
            case (this.coupon.enabled === false):
              this.notice.msg = '此優惠碼尚未啟用。';
              this.coupon = '';
              break;
            case (timestamp > this.coupon.deadline.timestamp):
              this.notice.msg = '此優惠碼已過期。';
              this.coupon = '';
              break;
            default:
              break;
          }

          if (this.notice.msg !== '') {
            this.notice.class = 'error';
            $('#noticeModal').modal('show');

            setTimeout(() => {
              $('#noticeModal').modal('hide');
              this.getCart();
            }, 1000);
          } else {
            this.getCart();
          }

          this.isLoading = false;
        })
        .catch(() => {
          this.notice.msg = '無此優惠碼。';
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
    goCheckout() {
      this.$router.push('/checkout');
    },
  },
  created() {
    this.getCart();
  },
  beforeDestroy() {
    if (this.coupon && this.coupon.enabled) {
      this.$bus.$emit('sendCoupon', this.coupon.code);
    }
  },
};
</script>
