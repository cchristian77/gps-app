export default class Pagination {
  constructor(page = 1, perPage = 10, pageCount = 0, total = 0) {
    this.page = page
    this.perPage = perPage
    this.pageCount = pageCount
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
}
