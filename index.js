var TODOS = [];

window.addEventListener('load', function () {
  let Todos = localStorage.getItem('todos');
  if (Todos) {
    TODOS = JSON.parse(Todos);
    DisplayTodos();
  }
});

document.getElementById('add-task-btn').addEventListener('click', addTask);

function UpdateLocalStorage() {
    let TodoString = JSON.stringify(TODOS);
    localStorage.setItem('todos', TodoString);
}

function addTask(event) {
    document.getElementById('err_msg').innerHTML = ''
    event.preventDefault();
    let TaskText = document.getElementById('todo-text').value;
    let TaskTime = document.getElementById('todo-time').value;
    if(TaskTime == '' || TaskText == ''){
        document.getElementById('err_msg').innerHTML = 'Fill All The input Field'
    }else{
        TODOS.push([TaskText,TaskTime]);
        UpdateLocalStorage();
        DisplayTodos();
        document.getElementById('todo-text').value = '';
        document.getElementById('todo-time').value = '';
    }
}

function DisplayTodos() {
    TODOLIST = ``;
    TODOS.forEach((todo, index) => {
      console.log(todo)
      TODOLIST += `
          <tr>
          <td class="task-index">
              ${index + 1}
            </td>
            <td class="task-text">
              ${todo[0]}
            </td>
            <td class="task-time">
              ${todo[1]} Minutes
            </td>
            <td>
            <button type="button" class="dlt-btn" onclick="DeleteTodo(${index})"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24" height="24"
            viewBox="0 0 24 24"
            style=" fill:#e21010"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path></svg></button>
            </td>
          </tr>`;
    });
    document.getElementById('task-containing-div').innerHTML = TODOLIST;
  }


function DeleteTodo(index) {
    TODOS.splice(index, 1);
    UpdateLocalStorage();
    DisplayTodos();
    ShowAlert('Todo deleted successfully &#128578;', 'danger');
}