
import {Observable} from "rxjs";


/**
 * 哪些可以做iteration？
 * 1，args
 * 2，array
 * 3，return value
 * 4, object property, class
 *
 */

// 在嵌套时候infer U 每一层，都是一个新的声明，T extends Promise<infer U>的U与DeepUnwrapPromise<U>是不同的
type DeepUnwrapPromise<T> = T extends Promise<infer U>? DeepUnwrapPromise<U>: T;
type DeepUnwrapPromise_A = DeepUnwrapPromise<Promise<Promise<string>>> // string
type DeepUnwrapPromise_B = DeepUnwrapPromise<Promise<Observable<number>>>  // Observable<number>
type DeepUnwrapPromise_C = DeepUnwrapPromise<Observable<boolean>> // Observable<boolean>


// object property
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



// array
type FirstElementArray<T> = T extends [infer first,...any[]]?  first: never;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;
type Tail_A = Tail<[1, 2, 3]>; // → [2, 3]
type FirstElementArray_A = FirstElementArray<[1,2,3]> // 1


// Union to Tuple

/**
 *  第一步：
 *  Union A | B | C => (arg:A)=>void | (arg: B)=>void | (arg:C)=>void
 *  然后做一个infer （arg：infer I)=> void  I = A & B & C
 *  这样就把 A ｜ B ｜ C => A & B & C
 *
 *  第二步：
 *  得到Union最后一个值
 * ((x: string) => void) & ((x: number) => void) 这是一个函数重载，
 * 按照typescript，infer参数，只会得到最后一个函数的参数类型，number，这样就可以吧Union中的各个分离吧
 *
 * 第三步：
 * 使用递归，把分离的组成新的Tuple，注意技巧，type UnionToTuple<U, T extends any[]=[]> T声明已经有默认值，所以只需要输入U就可以了
 *
 */


type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends
    (x: infer I) => void ? I : never;

type Union_A = UnionToIntersection<string | number> // string & number => never

type LastInUnion<U> =
  UnionToIntersection<U extends any ? (x: U) => void : never> extends
    (x: infer Last) => void ? Last : never;

type Union_B = LastInUnion<string | number> // number

type ExcludeLast<U> = Exclude<U, LastInUnion<U>>;

type Union_c = ExcludeLast<string | number>; // string

type UnionToTuple<U, T extends any[]=[]> = [U] extends [never]? T : UnionToTuple<ExcludeLast<U>,[LastInUnion<U>,...T]>

type MyUnion = 'A' | 'B' | 'C' | 'D';
type MyTuple = UnionToTuple<MyUnion>  // ['A' , 'B' , 'C' , 'D']
