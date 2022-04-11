<template>
  <CModalHeader>
    <CModalTitle>プラン履歴の一覧</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <div class="list">
      <div class="item-header">
        <p class="text-center">No</p>
        <p>プラン</p>
        <p class="text-center">開始日</p>
      </div>
      <div class="item-body">
        <div class="item" v-for="(item, index) in listHistory" :key="item">
          <p class="text-center">{{ index + 1 }}</p>
          <p>{{ item.m_plan.name }}</p>
          <p class="text-center">
            {{ utils.convertDateToFormatJP(item.startDate) }}
          </p>
        </div>
      </div>
    </div>
  </CModalBody>
</template>

<script>
import { ref, onMounted } from 'vue'
import Repository from '@/repositories/Repository.vue'
import Constants from '@/utils/Constants'
import Utils from '@/utils/Utils'
export default {
  name: 'PlanHistory',
  props: ['contractId'],
  setup(props) {
    const listHistory = ref([])
    const utils = Utils
    const getListHistory = () => {
      let api = `${Constants.API.GET_PLAN_HISTORY_API}`
      Repository.get(`${api}?contractId=${props.contractId}`).then((res) => {
        console.log(res)
        if (res != undefined && res.success) {
          listHistory.value = res.data
        } else {
          if (res != undefined) {
            Utils.showToast(res.message)
          } else {
            Utils.showToast(
              'システムエラーが発生しました。再度操作してください。',
            )
          }
        }
      })
    }

    onMounted(() => {
      getListHistory()
    })

    return { listHistory, utils }
  },
}
</script>
<style scoped>
.list .item,
.list .item-header {
  display: grid;
  grid-template-columns: 100px auto 140px;
  grid-gap: 20px;
}
.item p,
.item-header p {
  margin-bottom: 0;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.item-header {
  background-color: #e3dfdf;
  padding: 7px 5px;
}
.item-body .item {
  padding: 7px 5px;
}
.item-body {
  max-height: 400px;
  overflow-y: auto;
}
.item-body .item:nth-child(2n) {
  background-color: #e3dfdf;
}
</style>
