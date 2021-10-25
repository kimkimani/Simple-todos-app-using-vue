<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 offset-sm-3">
                <form id="todo-form" method="post" @submit.prevent="checkForm" novalidate="true">
                  <div v-if="todo.error" class="form-group mt-1">
                    <div class="alert alert-danger">{{todo.error}}</div>
                  </div>
                  <div v-if="todo.message" class="form-group mt-1">
                    <div class="alert alert-success">{{todo.message}}</div>
                  </div>
                  <div class="form-group mt-3" style="text-align:left">
                    <label for="title" >Title</label>
                    <input v-model="todo.title" type="text" class="form-control" id="title"  placeholder="Enter todo's title">
                    <small id="titleHelp" class="form-text text-muted">E.g taking a walk.</small>
                  </div>
                  <div class="form-group mt-3" style="text-align:left">
                    <label for="description" >Description</label>
                    <textarea v-model="todo.description" class="form-control" name="description" id="description" placeholder="Todo's description"></textarea>
                    <small id="descriptionHelp" class="form-text text-muted">E.g A long walk around the estate.</small>
                  </div>
                  <div class="form-group mt-3">
                  <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
                  </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  data(){
    return {
    todo:{
      title:"",
      description:"",
      error:null,
      message:null
    }
    }
  },
  methods:{
    
    checkForm:async function(e){
      if(this.todo.title && this.todo.description){

        try {
          // send data to the server
          await this.$http.post("http://localhost:5000/api/todo",{
            "title":this.todo.title,
            "description":this.todo.description
          },
        );

        //reset the fields
        this.todo.title = "";
        this.todo.description = "";
        
        // set the message
        this.todo.message = "Todo added successfully";

        return;
        }catch(error){
            this.todo.error = error;
          return;
        }
      }
      this.todo.error = null;
      if(!this.todo.title){
        this.todo.error = "Title is required";
        return;
      }
      if(!this.todo.description){
        this.todo.error = "Description is required";
        return;
      }
      e.preventDefault();
    }
  }
};


</script>