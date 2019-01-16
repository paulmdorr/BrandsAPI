interface IBrand {
  id: number
  name: string
  categoryId: number
}

class Brand implements IBrand {
  public id: number
  public name: string
  public categoryId: number

  constructor(data: IBrand) {
    Object.assign(this, data)
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      categoryId: this.categoryId,
    }
  }
}

export default Brand
