import { Sex } from "./Parents"

export class Dogs {

    public id!: number
    public name: string
    public breed: string
    public sex: Sex
    public age: string
    public price: number
    public idMom: number
    public idDad: number

    constructor(name: string, breed: string, age: string, sex: Sex, price: number, idMom: number, idDad: number) {
        this.name = name
        this.breed = breed
        this.age = age
        this.sex = sex
        this.price = price
        this.idMom = idMom
        this.idDad = idDad
    }

}