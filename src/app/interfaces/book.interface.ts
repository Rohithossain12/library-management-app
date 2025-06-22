
export interface IBook {
    title:string,
    author:string,
    genre:"SCIENCE" |  "BIOGRAPHY"|  "FANTASY"|  "PHILOSOPHY"| "HISTORY"|"POETRY"| "FICTION",
    isbn:string,
    description:string,
    copies:number,
    available:boolean


}