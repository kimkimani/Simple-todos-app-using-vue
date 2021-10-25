<template>
  <div class="todos">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">

          <!-- Showing the added todos -->

            <div v-if="todos.length == 0">
            <div class="card mt-2 mb-2">
                  <div class="card-body">
                    <h4 class="card-title">You do not have any saved todo</h4>
                    <div class="d-flex justify-content-between">
                      <a class="btn btn-info text-white" href="/add-todo">Add todo</a>
                    </div>
                  </div>
                </div>
            </div>
          
            <div v-else-if="todos.length > 0" v-for="todo in todos" v-bind:key="todo.id">
       
                <div class="card mt-2 mb-2">
                  <div class="card-body">
                    <h4 class="card-title">{{todo.title}}</h4>
                    <p class="card-text">{{todo.description}}</p>
                    <div class="d-flex justify-content-between">
                      <button class="btn btn-info text-white" @click="editTodo(todo.id)">Edit</button>
                      <button class="btn btn-danger" @click="deleteTodo(todo.id)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  
</template>

<script>
export default {
 data(){
   return {
     todos:[]
   }
 },
  methods: {
    async getData(){
      try{
        const response = await this.$http.get('http://localhost:5000/api/todo');
        this.todos = response.data;
      }catch(error){
        console.log(error);
      }
    },
    async editTodo(todoId){
      this.$router.push({
        path: `/edit-todo/${todoId}`
      });
      return;
    },
    async deleteTodo(todoId){
      let confirmation = confirm("Do you want to delete this todo?");

      if(confirmation){
        try{
        await this.$http.delete(`http://localhost:5000/api/todo/${todoId}`);
        // refresh the todos
        this.getData();
      }catch(error){
        console.log(error)
      }
      }      
    }
  },

  created(){
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card-body{
  text-align: left;
}
.todos {
  margin-top: 10px;
}
</style>
