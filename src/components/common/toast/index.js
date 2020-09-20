import Toast from "./Toast";
const obj = {}

obj.install = function (Vue) {

  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  //2.new的方式，根据组件构造器可以创建出一个对象
  const toast = new toastConstructor()

  //3.将组件对象手动挂载到某一个元素上面
  toast.$mount(document.createElement('div'))

  //3.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast

}
export default obj
