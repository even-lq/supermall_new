import axios from 'axios'

//1.最简洁的办法
export function request(config) {
  //axios.create方法返回一个Promise类型

  //1.创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/z8',
      timeout: 5000
    })
  //2.axios拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config =>{
    //console.log(config);
    //请求拦截的例子：
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    // 3.某些网络请求(比如登录(token)),必须携带一些特殊的信息

    //拦截请求后必须要返回去
    return config
  },error => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    //console.log(res);
    //拦截响应后必须要返回去
    return res.data
  },err => {
    console.log(err);
  })
  //3.发送真正的网络请求
    return instance(config)
}

//2.返回整个Promise
/*export function request(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/n3',
      timeout: 5000
    })

    instance(config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}*/

//3.使用一个参数的回调函数，调用回调的属性
/*export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  instance(config.baseConfig).then(res => {
    //console.log(res);
    config.success(res)
  }).catch(err => {
    //console.log(err);
    config.failure(err)
  })
}*/

//4.使用3个参数的回调函数，回调方法
/*export function request(config, success, failure) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  instance(config).then(res => {
    //console.log(res);
    success(res)
  }).catch(err => {
    //console.log(err);
    failure(err)
  })
}*/

//5.直接在封装的模块里面测试
/*export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  instance(config).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}*/
