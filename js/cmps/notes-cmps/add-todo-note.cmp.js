'use strict'
export default {
    template: `
       <section>
            <section v-if="todos.length" >
                <div v-for="(todo,idx) in note.todos">
                   <button @click="editTodo(idx)">edit</button> 
                   <span :class="{'todo-done' : todo.isDone}" @click="toggleTodo(idx)">{{todo.txt}}</span> 
                   <button @click="deleteTodo(idx)">X</button>
                </div>
                </section>
                   <div>
                <input type="text" placeholder="What todo?" v-model="newTodo.txt" @keyup.enter="addTodo" />
                <input type="checkbox" v-model="newTodo.isDone"  /> Done?
                <input type="number" v-model.number="newTodo.priority" placeholder="Priority"  /> 
                <button @click="addTodo">Add</button>
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
            console.log(idx, this.todos[idx])
            this.newTodo = this.todos[idx];
            this.isEdited = true;
        },
        toggleTodo(idx){
            this.todos[idx].isDone = !this.todos[idx].isDone;
        }
    },
    created() {
        console.log(this.note);
        if (this.note.todos) {
            this.todos = this.note.todos;
        }
    }
}