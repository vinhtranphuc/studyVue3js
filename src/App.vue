<template>
  <router-view />
  <Spinners :is-visible="isLoading" />
  <CToaster placement="top-center">
    <CToast v-for="(toast, index) in msgList" :key="index" color="dark" class="text-white" autohide>
      <CToastBody>
        {{ toast }}
      </CToastBody>  
    </CToast>
  </CToaster>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import Spinners from '@/components/Spinners.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { Spinners },
  setup() {
    const store = useStore()

    const isLoading = ref(store.state.common.isLoading)
    const msgList = store.state.common.msgList
    watch(
      () => store.getters.checkLoading,
      (newValue, prevValue) => {
        isLoading.value = newValue
      },
    )
    return { isLoading, msgList }
  },
})
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
