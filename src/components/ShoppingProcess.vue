<template>
  <div class="cart-step p-4 mb-5">
    <h3 class="text-center mb-4">購物流程</h3>
    <div class="row text-center">
      <div class="col-12 col-sm d-flex justify-content-center">
        <div :class="`alert ${ process[0] } alert-round p-4`" role="alert">
          <i class="fas fa-shopping-cart fa-3x mb-2"></i>
          <p class="mb-0">1. 購物車</p>
        </div>
      </div>
      <div class="col-12 col-sm d-flex justify-content-center">
        <div :class="`alert ${ process[1] } alert-round p-4`" role="alert">
          <i class="fas fa-edit fa-3x mb-2 pl-2"></i>
          <p class="mb-0">2. 填寫資料</p>
        </div>
      </div>
      <div class="col-12 col-sm d-flex justify-content-center">
        <div :class="`alert ${ process[2] } alert-round p-4`" role="alert">
          <i class="fas fa-file-alt fa-3x mb-2 pl-2"></i>
          <p class="mb-0">3. 訂購完成</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['process'],
};
</script>
