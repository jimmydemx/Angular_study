



class MyPromise {
    // 问题1: js中传递函数也只能传递一个参数，不能传递 function a(resolve,reject)
    constructor(func) {

        this.state = "pending";
        this.functionArrayResolved =[]
        this.functionArrayRejected =[]
        this.resolve = (value)=>{
            this.state = 'fullfilled'
            this.resolved = value
            this.functionArrayResolved.pop()(this.resolved)
        }
        this.reject =(reason)=>{
            this.state = 'rejected'
            this.rejected = reason
        }

        try {
            // 问题2: 传入prmomise的 函数类型规定为 function (a,b){.... a(value1), ...b(value2)} ，
            // 也就是MyPromise定义的函数，传递到方程中执行
            func(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    // 问题3: then 的时候传入还是函数, (this.resolved)=>{...return value}, return的value可以传入下一个then,链式操作
    then(resolvedfunc, rejectedfunc){
        if(this.state=='fullfilled'){
            this.resolved = resolvedfunc(this.resolved)
            // 返回的是一个实例 
            return this
        }
        
        if(this.state == 'rejected'){
           try{
            this.rejected = rejectedfunc(this.rejected) 
           } catch(e){
            this.rejected = e; 
           }
            return this
        }
        resolvedfunc? this.functionArrayResolved.push(resolvedfunc): null
        rejectedfunc? this.functionArrayRejected.push(rejectedfunc): null
    }

}


var a =new MyPromise(function(resolve,reject){resolve(2000)}).then(val=>val+1).then(val=>console.log("yyy"+val));
var b =new MyPromise(function(resolve,reject){
   setTimeout(() => {
    resolve(2000)
   }, 1000); 
}).then(val=>console.log(val))

console.log()

