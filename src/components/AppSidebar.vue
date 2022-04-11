<template>
  <CSidebar
    class="border-end"
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarBrand>
      <CImage
        :class="'sidebar-brand-full'"
        :src="ImgLogo"
        style="max-height: 55px"
      />
    </CSidebarBrand>
    <AppSidebarNav />
    <!-- <ContractStorageUsage /> -->
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import ContractStorageUsage from './ContractStorageUsage.vue'
// import ImgLogo from '@/assets/images/logo.png'
import ImgLogo from '@/assets/images/logo_pink.svg'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
    ContractStorageUsage,
  },
  setup() {
    const store = useStore()
    return {
      ImgLogo,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>
