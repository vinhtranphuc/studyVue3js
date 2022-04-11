<template>
  <CRow>
    <CCol>
      <CPagination align="end" aria-label="Page navigation">
        <div class="align-self-center me-5"  >
          <span>
            {{ totalRecords }}件中{{ fromRecord + 1 }} ~ {{ toRecord }}件表示
          </span>
        </div>
        <div class="me-4"  >
          <select class="form-select box-shadow-cus" :xs="2" v-model="perPage"
             @change.prevent="onChangePageOption()">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <CPaginationItem
          aria-label="First"
          href="#"
          @click.prevent="!isInFirstPage && onClickFirstPage()"
          :disabled="isInFirstPage"
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>

        <CPaginationItem
          aria-label="Previous"
          href="#"
          @click.prevent="!isInFirstPage && onClickPreviousPage()"
          :disabled="isInFirstPage"
        >
          <span aria-hidden="true">&lsaquo;</span>
        </CPaginationItem>
        <template v-for="page in pages" :key="page.name">
          <CPaginationItem
            href="#"
            @click.prevent="onClickPage(page.name)"
            :active="isPageActive(page.name)"
          >
            {{ page.name }}
          </CPaginationItem>
        </template>
        <CPaginationItem
          aria-label="Next"
          href="#"
          @click.prevent="!isInLastPage && onClickNextPage()"
          :disabled="isInLastPage"
        >
          <span aria-hidden="true">&rsaquo;</span>
        </CPaginationItem>
        <CPaginationItem
          aria-label="Last"
          href="#"
          @click.prevent="!isInLastPage && onClickLastPage()"
          :disabled="isInLastPage"
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'Paginations',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalRecords: {
      type: Number,
      required: true,
    },
    fromRecord: {
      type: Number,
      required: true,
    },
    toRecord: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1
      }

      // When on the last page
      // if (this.currentPage === this.totalPages) {
      //   return this.totalPages - this.maxVisibleButtons + 1
      // }

      // When inbetween
      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages,
      )
    },
    pages() {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1, this.perPage)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1, this.perPage)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page, this.perPage)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1, this.perPage)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages, this.perPage)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
    onChangePageOption() {
      this.$emit('pagechanged', 1, this.perPage)
    },
  },
}
</script>
<style scoped>
.box-shadow-cus{
  box-shadow: 0 1px black;
  border: none !important;
  border-radius: unset !important;
}
</style>
