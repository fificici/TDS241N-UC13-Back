export enum Sex {
    M = "Male",
    F = "Female",
    m = "Male",
    f = "Female"
}

export class Parents {

    public id!: number
    public name: string
    public breed: string
    public sex: Sex
    public age: string

    constructor(name: string, breed: string, age: string, sex: Sex) {
        this.name = name
        this.breed = breed
        this.age = age
        this.sex = sex
    }

}
