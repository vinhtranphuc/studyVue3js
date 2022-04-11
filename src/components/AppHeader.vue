<template>
  <CHeader position="sticky">
    <CContainer fluid>
      <div class="ps-1"></div>
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CContainer fluid v-show="!isHome">
      <div class="ps-1"
        v-for="item in titles"
        :key="item" style="width: 100%; display: flex; align-items: center;">
        <div style="width: 4rem; height: 4rem; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: #10B9F2; margin-right: 1.5rem; color: #fff; text-align: center">
          <CIcon :icon="item.icon" size='3xl' />
        </div>
        <div style="width: 60%; display: inline-block">
          <div class="screenHeader">{{item.screenName}}</div>
          <div class="screenDescription">{{item.description}}</div>
        </div>
      </div>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid v-show="!isHome">
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
import router from '@/router'
import { onMounted, ref } from 'vue'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    const titles = ref()

    const getTitles = () => {
      return router.currentRoute.value.matched.map((route) => {
        console.log(route)
        return {
          active: route.path === router.currentRoute.value.fullPath,
          name: route.name,
          screenName: route.meta.name,
          path: `${router.options.history.base}${route.path}`,
          description: route.meta.description,
          icon: route.meta.icon
        }
      })
    }

    router.afterEach(() => {
      titles.value = [getTitles()[0]]
    })

    onMounted(() => {
      titles.value = [getTitles()[0]]
    })
    return {
      logo,
      titles,
    }
  },
  data() {
    return {
      isHome: false,
    }
  },
  mounted() {
    this.isHome = router.currentRoute.value.fullPath === "/home"
  },
}
</script>
<style scoped>
.screenHeader {
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 140%;
  color: #1C234E;
  width: 100%;
}

.screenDescription {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 160%;
  color: #1C234E;
}
</style>
