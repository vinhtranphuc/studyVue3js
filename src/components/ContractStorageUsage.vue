<template>
  <div class="wrap-contract-storage" v-if="isShow">
    <div class="progress-storage">
      <h6>ストレージ利用状況</h6>
      <p>
        {{ utils.formatBytes(usedSize) }}{{
          limitStorage === 0 ? '' : '/' + limitStorage + 'GB'
        }}
      </p>
      <div class="custom-progress-wrap" v-if="limitStorage !== 0">
        <div class="custom-progress" :style="{ width: percent + '%' }"></div>
      </div>
      <h6 style="margin-top: 20px;">書き起こし利用状況</h6>
      <p>
        {{ utils.convertDurationToHour(duration) }}時間
        <!-- {{
          utils.calTranscriptPlan(duration)
        }}円 -->
      </p>
      <!-- <div class="custom-progress-wrap">
        <div
          class="custom-progress"
          :style="{ width: percentDuration + '%' }"
        ></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Utils from '@/utils/Utils'
import { computed, ref, watch } from 'vue'
export default {
  name: 'ContractStorageUsage',
  components: {},
  setup() {
    const utils = Utils
    const store = useStore()
    const percent = ref(0)
    const percentDuration = ref(0)
    const isShow = ref(false)
    const usedSize = computed(() => {
      return store.state.common.storageInfo.usedSize
    })
    const duration = computed(() => {
      return store.state.common.storageInfo.duration
    })
    const limitStorage = computed(() => {
      return store.state.common.storageInfo.limitStorage
    })

    watch(
      () => store.getters.getStorageInfo,
      (newValue, prevValue) => {
        percent.value = (
          (Utils.formatBytesToGb(usedSize.value) / limitStorage.value) *
          100
        ).toFixed(2)
        const hours = (duration.value / 3600).toFixed(2)

        if (Number(hours) === 0) {
          percentDuration.value = 0
        } else {
          percentDuration.value =
            (Number(hours) / (10 * Math.ceil(Number(hours) * 0.1))) * 100
        }

        isShow.value = store.state.common.storageInfo.isShow
      },
      { deep: true },
    )

    return {
      usedSize,
      duration,
      limitStorage,
      utils,
      percent,
      percentDuration,
      isShow,
    }
  },
}
</script>

<style scoped>
.wrap-contract-storage {
  padding: 0 1rem;
  padding-bottom: 20px;
}
h6 {
  color: #000000;
  font-weight: bold;
}
p {
  color: #000000;
  font-size: 14px;
  margin-bottom: 5px;
}
.custom-progress-wrap {
  height: 8px;
  width: 100%;
  background-color: #eeeeee;
  border-radius: 20px;
  margin-bottom: 15px;
}
.custom-progress {
  height: 8px;
  border-radius: 20px;
  background-color: #10b9f2;
  max-width: 100%;
}
</style>
