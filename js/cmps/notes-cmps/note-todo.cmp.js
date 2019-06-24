

export default {

    template: `
        <section class="todo-app">
            <ul>
                <li v-for="(todo, i) in todos" class="todo-item" :class="{'todo-done' : todo.isDone}">
                   {{todo.txt}} Priority: {{todo.priority}}
                </li>
            </ul>
          
        </section>
    `,
    data() {
        return {
        }
    },
    props:['todos'],
    methods: {
        keyUp(ev) {
            if (ev.key === 'Enter') {
                this.addTodo();
            }
        }
    },
    mounted(){
    }



}