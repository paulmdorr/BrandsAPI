interface IBrand {
  id: number
  name: string
  categoryId: number
}

class Brand implements IBrand {
  public id: number
  public name: string
  public categoryId: number

  constructor(data: any) {
    Object.assign(this, { categoryId: data.category_id }, data)
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
