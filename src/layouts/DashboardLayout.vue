<template>
  <div>
    <AppSidebar />
    <!-- <div class="wrapper d-flex flex-column min-vh-100 bg-light"> -->
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer fluid>
          <router-view />
        </CContainer>
      </div>
      <!-- <AppFooter /> -->
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

export default {
  name: 'MenuLayout',
  components: {
    // AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
  },
}
</script>
