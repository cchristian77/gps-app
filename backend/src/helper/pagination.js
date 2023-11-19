export default class Pagination {
  constructor(page = 1, perPage = 10, total = 0) {
    this.page = page
    this.perPage = perPage
    this.total = total
  }

  getLimit() {
    return this.perPage
  }

  getOffset() {
    return (this.page - 1) * this.getLimit()
  }

  calculatePageCount() {
    return parseInt(Math.ceil(this.total / this.perPage))
  }

  getMeta() {
    return {
      page: this.page,
      per_page: this.perPage,
      page_count: this.calculatePageCount(),
      total: this.total
    }
  }
}

export const DEFAULT_PAGINATION = Object.freeze( {
  PAGE: 1,
  PER_PAGE: 5
})
