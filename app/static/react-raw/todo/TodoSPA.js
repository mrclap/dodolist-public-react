'use strict';
const e = React.createElement;

class TodoSPA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded:false,
      todoList:[]
    };
  }

  //get todolist with api
  ajaxGetTodo() {
    let url = "/api/todos/"
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          todoList: result
        });
      },
      (error) => {
          console.log('api error')
      }
    )  
  }

  componentWillMount() {
    this.ajaxGetTodo()
  }

  refreshTodoList() {
    this.ajaxGetTodo()
  }

  // shouldComponentUpdate(nextProps, nextState) {    
  //   // return false 하면 업데이트를 안함
  //   // return this.props.checked !== nextProps.checked
  //   return true;
  // }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  // }

  render() {
    return (
      <div className="d-flex flex-column align-items-stretch p-3 my-3 text-black-50 rounded shadow-sm">
        <TodoCreate refreshHandler={this.refreshTodoList.bind(this)}></TodoCreate>
        <TodoList todoList={this.state.todoList} refreshHandler={this.refreshTodoList.bind(this)}></TodoList>
      </div>
    );
  }
}

const domContainer = document.querySelector('#main-container');
ReactDOM.render(e(TodoSPA), domContainer);

// Tempus Dominus - datepicker
$('#datetimepicker-create').datetimepicker({'format': 'YYMMDD HHmm'});