<template>
  <div class="row">
    <!--菜单-->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
        <tr>
          <th>尺寸</th>
          <th>价格</th>
          <th>加入</th>
        </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
        <tr>
          <td><strong>{{item.name}}</strong></td>
        </tr>
        <tr v-for="option in item.options" :key="option.price">
          <td>{{option.size}}</td>
          <td>{{option.price}}RMB</td>
          <td>
            <button
              class="btn btn-sm btn-outline-success"
              @click="addToBasket(item,option)">
              +
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--购物车-->
    <div class="col-sm-12 col-md-4">
      <div v-if="baskets.length>0">
        <table class="table">
          <thead class="thead-default">
          <tr>
            <th>数量</th>
            <th>产品</th>
            <th>价格</th>
          </tr>
          </thead>
          <tbody v-for="item in baskets" :key="item.name">
          <tr>
            <td>
              <button class="btn btn-sm" @click="decreaseQuantity(item)">-</button>
              <span>{{item.quantity}}</span>
              <button class="btn btn-sm" @click="increaseQuantity(item)">+</button>
            </td>
            <td>{{item.name}}{{item.size}}寸</td>
            <td>{{item.price * item.quantity}}RMB</td>
          </tr>
          </tbody>
        </table>
        <p>总价：{{total}}RMB</p>
        <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>
        {{basketText}}
      </div>
    </div>
  </div>
</template>
<script>
//  import axios from 'axios';
import vuex from 'vuex';
  export default {
    created(){
      this.fetchData();
    },
    data() {
      return {
        baskets: [],
        basketText: '购物车没有任何商品',
//        getMenuItem: {}
      }
    },
    computed:{
      getMenuItems(){
        // 在vuex中获取数据
//        return this.$store.state.menuItems;
        return this.$store.getters.getMenuItems;
      },
      total(){
        let totalCost = 0;
        for (let index in this.baskets) {
          let individualItem = this.baskets[index];
          totalCost += individualItem.quantity * individualItem.price;
        }
        return totalCost;
      }
    },
    methods: {
      fetchData(){
//        fetch('https://wd2468178309upkmpi.wilddogio.com/users/menu.json')
//          .then(res => res.json())
//          .then((data)=> {
//            this.getMenuItem = data;
//          })
//        axios.get('menu.json')
//          .then((res) => {
////            console.log(res);
//            this.getMenuItem = res.data;
//          })
//        this.http.get('menu.json')
//          .then((res) => {
//            console.log(res);
//            this.getMenuItem = res.data;
//          })

        //将请求下来的数据存储到vuex中
        this.http.get('menu.json')
          .then((res) => {
//          console.log(res);
            this.$store.commit("setMenuItems", res.data);
          })
      },
      increaseQuantity(item){
        item.quantity++;
      },
      decreaseQuantity(item){
        item.quantity--;
        if (item.quantity<=0){
          this.removeFromBasket(item);
        }
      },
      removeFromBasket(item){
        this.baskets.splice(this.baskets.indexOf(item),1)
      },
      addToBasket(item, option) {
        let basket = {
          name: item.name,
          size: option.size,
          price: option.price,
          quantity: 1
        };
        // 如果购物车里面有值
        if (this.baskets.length > 0){
          // 过滤
          let result = this.baskets.filter((basket) => {
            return (basket.name === item.name && basket.price === option.price);
          });
          if (result != null && result.length > 0){
            result[0].quantity++;
          } else {
            this.baskets.push(basket);
          }
        } else {
          this.baskets.push(basket);
        }
      }
    }
  }
</script>
