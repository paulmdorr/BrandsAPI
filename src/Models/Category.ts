interface ICategory {
  id: number
  name: string
}

class Category implements ICategory {
  public id: number
  public name: string

  constructor(data: ICategory) {
    Object.assign(this, data)
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
    }
  }
}

export default Category
