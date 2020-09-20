import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })
      if(oldProduct){
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('加入购物车成功！')
      }else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('新的商品加入购物车成功！')
      }
    })
    /*state.cartList.push(payload)*/
    //payload添加新商品：判断有没有该商品，有则直接数量+1，否则让新商品数量+1同时把新商品加入到数组中
    //方法一：
    /*let oldProduct = null
    for (let item of state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item
      }
    }
    if(oldProduct) {
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.cartList.push(payload)
    }*/

    //方法二：不可行
    /*let index = state.cartList.indexOf(payload)
    if(index !== -1) {
      let oldProduct = state.cartList[index]
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.cartList.push(payload)
    }*/

    //方法三：最佳方法
    //数组的find方法会查找条件匹配的元素，查找到该元素后返回该元素

  }
}
