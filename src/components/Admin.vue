<template>
  <div class="row">
    <div class="col-md-8 col-sm-12">
      <!--new pizza-->
      <app-new-pizza></app-new-pizza>
    </div>
    <div class="col-md-4 col-sm-12">
      <!--品种展示-->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table table-default">
        <thead>
          <tr>
            <th>品种</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td>{{item.name}}</td>
            <td>
              <button class="btn btn-outline-danger btn-sm" @click="deleteData(item)">&times;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import NewPizza from './newPizza'
  export default {
    name: 'Admin',
    data(){
      return {
//        getMenuItems:[],
      }
    },
    computed:{
      getMenuItems:{
        get() {
//          return this.$store.state.menuItems;
          return this.$store.getters.getMenuItems;
        },
        set(){

        },
      },
    },
    components:{
      appNewPizza: NewPizza,
    },
    created(){
      fetch('https://wd2468178309upkmpi.wilddogio.com/menu.json')
//        这步fetch拿到的是一个可读的数据流
        .then((res) => {
          return res.json();
        })
        .then((data)=> {
          let menuArray = [];
          for (let key in data) {
//            console.log(key);
//            console.log(data[key])
            // 往数组中添加一个id字段作为每组数据的唯一标识；
            data[key].id = key;
            menuArray.push(data[key]);
          }
          console.log(menuArray);
//          this.getMenuItems = menuArray;
          // 数据同步
          this.$store.commit("setMenuItems", menuArray);
        })
    },
    methods:{
      deleteData(item){
        fetch('https://wd2468178309upkmpi.wilddogio.com/menu/'+item.id+'/.json',{
          method:"DELETE",
          headers:{
            'Content-type': 'application/json',
          }
        })
          .then((res)=> res.json())
          .then((data) =>{
//            console.log(data);
//            this.$router.push({
//              name:'menuLink'
//            })
            this.$store.commit('removeMenuItem', item);
          })
          .catch((err)=>{
            console.log(err);
          })
      },
    },
//    data(){
//      return {
//        name: 'Henry',
//      }
//    },
//    beforeRouteEnter(to, from, next){
//      // 执行在data渲染之前
////      alert("Hello" + this.name);
//      next((vm)=>{
//        // 异步执行
//        alert("Hello" + vm.name);
//      });
//    },
//    beforeRouteLeave(to, from, next){
//      if (confirm("确定离开吗")){
//        next();
//      } else {
//        next(false);
//      }
//    },
  }
</script>
<style>

</style>
