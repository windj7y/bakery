<template>
  <div class="modal fade" id="noticeModal" tabindex="-1" role="dialog" aria-labelledby="noticeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body text-center msg-color">
          <i v-if="notice.class === 'success'" class="far fa-check-circle fa-3x mt-3 text-success"></i>
          <i v-else class="fas fa-exclamation-circle fa-3x mt-3 text-danger"></i>
          <p class="mt-3 font-weight-bold">{{ notice.msg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['notice'],
};
</script>
