<template>
  <div :class="`jumbotron jumbotron-fluid d-flex align-items-end ${ bannerData.class } mb-0`">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="bg-bright p-3">
            <h2 class="text-center products-banner-text mb-0">{{ bannerData.title }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bannerData'],
};
</script>
