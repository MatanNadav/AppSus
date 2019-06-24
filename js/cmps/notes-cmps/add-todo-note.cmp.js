'use strict'
export default {
    template: `
       <section class="add-todo-container flex">
            <section class="todo-command-container"  v-if="todos.length" >
                <div v-for="(todo,idx) in todos">
                   <button class="edit-todo-btn" @click="editTodo(idx)">edit</button> 
                   <span :class="{'todo-done' : todo.isDone}" @click="toggleTodo(idx)">{{todo.txt}}</span> 
                   <button class="remove-todo-btn" @click="deleteTodo(idx)">X</button>
                </div>
            </section>
            <div>
                <input class="add-todo-input input" type="text" placeholder="What todo?" v-model="newTodo.txt" @keyup.enter="addTodo" />
                <label class="is-done-todo-container">
                    <input class="is-done-todo-check" type="checkbox" v-model="newTodo.isDone"  />
                    <span class="is-done-checkbox"></span>
                </label>
                  <input class="add-todo-priority input" type="number" v-model.number="newTodo.priority" placeholder="Priority"  /> 
                <button class="add-todo-btn btn" @click="addTodo">Add</button>
            </div>
        </section>
`,
    data() {
        return {
            todos: [],
            newTodo: this.getEmptyTodo()
        }
    },
    props: ['note'],
    computed: {
    },
    methods: {
        addTodo() {
            if (!this.isEdited) this.todos.push(this.newTodo);
            this.newTodo = this.getEmptyTodo();
            this.$emit('todos-changed', this.todos);
            this.isEdited = false;
        },
        getEmptyTodo(txt = '') {
            return { txt, isDone: false, priority: 0 }
        },
        deleteTodo(idx) {
            this.todos.splice(idx, 1)
        },
        editTodo(idx) {
            this.newTodo = this.todos[idx];
            this.isEdited = true;
        },
        toggleTodo(idx){
            this.todos[idx].isDone = !this.todos[idx].isDone;
        }
    },
    created() {
        if (this.note && this.note.todos) {
            this.todos = this.note.todos;
        }
    }
}