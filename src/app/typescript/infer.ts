import {Observable} from "rxjs";

//

/**
 *  这里需要使用Observable<infer R> 没有infer 会出现错误
 *  Infer起到的是在等号右边声明变量的作用,就像等式左边的声明一样, 但是Infer 使用有限制，只能在Extend语句中使用
 *
 */
type UnwrapObservable<T> = T extends Observable<infer R>? R:T;

type UnwrapObservable_A = UnwrapObservable<Observable<number>> // number

type UnwrapObservable_B = UnwrapObservable<Promise<string>> // Promise<string>


// function return value
type FunctionReturnValue<T> = T extends  (...args:any[])=>infer R? R: never;


type FunctionReturnValue_A = FunctionReturnValue<(num:number)=>Observable<number>> // Observable<number>


// constructor params: class 也是一个构造函数
class Person {
  constructor(public name:string, public age:number) {}
}

type ConstructorParams<T> = T extends new (...args: infer R)=>any?R:never;

type PersonArgs = ConstructorParams<typeof Person> // [name: string, age: number] 所以函数结构以后是数组哦




//

const formSchema = {
  name:[1],
  age: 0,
  address: {
    city: '',
    zip: ''
  }
};


type FormSchema<T> = {
  [K in keyof T]: T[K] extends object? FormSchema<T[K]>:T[K]
}

type FormValue = FormSchema<typeof formSchema>

const formValue :FormValue ={address: {city: '',zip:''}, age: 0, name: [1]}







