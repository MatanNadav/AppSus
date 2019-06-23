

export default {

    template: `
        <section class="todo-app">
            <h3>TodosSS</h3>
            <ul>
                <li v-for="(todo, i) in todos" :class="{'todo-done' : todo.isDone}">
                    {{i+1}} {{todo.txt}} Priority: {{todo.priority}}
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
        // addTodo(){
        //     todoService.add(this.newTodo);
        //     this.newTodo = todoService.getEmptyTodo();
        //     console.log(this.todos);
        // },
        // toggleTodo(todo) {
        //     console.log('TOGGLING TODO');
        //     todoService.toggle(todo);
        // },

        // deleteTodo(todoIdx) {
        //     // console.log('Ev', ev);
        //     this.todos.splice(todoIdx, 1)
        // },
        keyUp(ev) {
            if (ev.key === 'Enter') {
                this.addTodo();
            }
        }
    },
    mounted(){
    }



}