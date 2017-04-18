export default class User {
  favor = []
  constructor(id, name) {
    this.id = id
    this.name = name
  }
  hello(target) {
    return `Hello ${target}, I am ${this.name}.`
  }
  report() {
    const { id, name, favor } = this
    return { id, name, favor }
  }
  addFavor(favor) {
    this.favor.push(favor)
  }
}
