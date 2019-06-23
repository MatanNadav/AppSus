
// CRUDL
export default {
    getEmptyTodo,
    query,
    add,
    toggle
}

var gTodos = [];
_createTodos();

function query() {
    return gTodos;
}
function add(todo) {
    todo.id = makeId();
    gTodos.unshift(todo)
}
function toggle(todo) {
    todo.isDone = !todo.isDone;
}


function _createTodos() {
    add(getEmptyTodo('Wash your mouth'))
    add(getEmptyTodo('D the homework'))
    
}



function makeId(length = 5)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < length; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}