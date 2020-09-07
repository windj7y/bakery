<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <banner :bannerData="bannerData"></banner>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <shoppingProcess :process="process"></shoppingProcess>

          <div class="card border-0">
            <h4 class="card-header order-title pb-3">訂購者資訊</h4>
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="createOrder">
                <div class="card-body">
                  <div class="form-group">
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                      <label for="username">姓名</label>
                      <input type="text" class="form-control" :class="classes" name="姓名" id="username" v-model="form.name">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider rules="required|email" v-slot="{ errors, classes }">
                      <label for="email">信箱</label>
                      <input type="email" class="form-control" :class="classes" name="信箱" id="email" v-model="form.email">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider rules="required|min:8" v-slot="{ errors, classes }">
                      <label for="phone">電話</label>
                      <input type="tel" class="form-control" :class="classes" name="電話" id="phone" v-model="form.tel">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                      <label for="address">地址</label>
                      <input type="text" class="form-control" :class="classes" name="地址" id="address" v-model="form.address">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <label for="payment">付款方式</label>
                    <select class="form-control" name="payment" id="payment" v-model="form.payment" required>
                      <option value="" disabled>
                          請選擇
                      </option>
                      <option value="WebATM">
                          WebATM
                      </option>
                      <option value="ATM">
                          ATM
                      </option>
                      <option value="CVS">
                          CVS
                      </option>
                      <option value="Barcode">
                          Barcode
                      </option>
                      <option value="Credit">
                          Credit
                      </option>
                      <option value="ApplePay">
                          ApplePay
                      </option>
                      <option value="GooglePay">
                          GooglePay
                      </option>
                    </select>
                  </div>
                  <div class="form-group mb-0">
                    <label for="message">留言</label>
                    <textarea class="form-control" name="message" id="message" cols="30" rows="6" v-model="form.message">
                    </textarea>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <button type="button" class="btn btn-outline-secondary" @click="goCart">
                    <i class="fas fa-angle-left"></i> 回上一步
                  </button>
                  <button class="btn btn-primary" :disabled="invalid">
                    送出訂單 <i class="fas fa-angle-right"></i>
                  </button>
                </div>
              </form>
            </validation-observer>
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
import shoppingProcess from '@/components/ShoppingProcess.vue';
import noticeModal from '@/components/modal/NoticeModal.vue';

export default {
  components: {
    banner,
    shoppingProcess,
    noticeModal,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        coupon: '',
        message: '',
      },
      notice: {
        msg: '',
        class: '',
      },
      bannerData: {
        title: '結帳',
        class: 'cart-banner',
      },
      process: ['alert-wait', 'alert-now', 'alert-wait'],
      isLoading: false,
    };
  },
  methods: {
    goCart() {
      this.$router.push('/cart');
    },
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/orders`;

      this.$http.post(url, this.form)
        .then((res) => {
          this.isLoading = false;

          this.notice.msg = '恭喜你完成訂單。';
          this.notice.class = 'success';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
            this.$bus.$emit('updateQuantity', 0, 1);
            this.$router.push(`/complete/${res.data.data.id}`);
          }, 1000);
        })
        .catch(() => {
          this.isLoading = false;

          this.notice.msg = '建立訂單失敗。';
          this.notice.class = 'error';
          $('#noticeModal').modal('show');

          setTimeout(() => {
            $('#noticeModal').modal('hide');
          }, 1000);
        });
    },
  },
  created() {
    this.$bus.$on('sendCoupon', (code) => {
      this.form.coupon = code;
    });
  },
  beforeDestroy() {
    this.$bus.$off('sendCoupon');
  },
};
</script>
