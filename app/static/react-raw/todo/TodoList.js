'use strict';
const e = React.createElement;

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList:this.props.todoList,
      isLoaded: false,
    };
    this.ajaxGetTodo = this.props.refreshHandler
  }

  arrIndexChanger(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    this.setState({todoList:arr})
    this.getOrderList()
  }

  getOrderList() {
    let todoList = this.state.todoList
    let orderList = []
    for (let idx in todoList) {
        if (todoList[idx].completed === 0) {
            orderList.push(todoList[idx].id)
        }
    }
    return orderList
  }

  getCSRFToken() {
    return Cookies.get('csrftoken');
  }

  // ajaxGetTodo() {
  //   console.log('refresh')
  //   let url = "/api/todos/"
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
        
  //       this.setState({
  //         isLoaded: true,
  //         todoList: result
  //       });
  //     },
  //     (error) => {
  //         console.log('api error')
  //     }
  //   )  
  // }

  ajaxUpdateOrder(orderList) {
    let _orderId = orderId //global variable
    let order = {'order' : orderList}
    let csrfToken = this.getCSRFToken()

    let data = {
        'order_json' : JSON.stringify(order)
    }
    let headers = new Headers({
            'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken' : csrfToken
    })
    data = JSON.stringify(data)
    let url = "/api/orders/" + _orderId + "/"  

    fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: data
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('order update!')
      },
      (error) => {
        console.log('api error')
      }
    )  
  }
  
ajaxUpdateCompleted(id, completed) {
    let _id = id    
    let data = {
        'completed' : completed
    }

    let csrfToken = this.getCSRFToken()
    let headers = new Headers({
            'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken' : csrfToken
    })
    data = JSON.stringify(data)
    let url = "/api/todos/" + _id + "/"  

    fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: data
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('completed update!')
      },
      (error) => {
        console.log('api error')
      }
    ).then(() => {
      this.ajaxGetTodo()
    })
  }

  toggleComplete(id) {
    let todoList = this.state.todoList
    for (let idx in todoList) {
      if (todoList[idx].id === id) {
        let completed = todoList[idx].completed ? 0 : 1
        if(todoList[idx].completed === 0){
          console.log('if')
          // orderList에서 해당 todo index 삭제
          let orderList = this.getOrderList()
          let pos = orderList.indexOf(id)
          orderList.splice(pos, 1)
          this.ajaxUpdateOrder(orderList)
          
          // todo completed = 1 변경
          this.ajaxUpdateCompleted(id, completed)
        }else{
          // orderList에 해당 id 가장 마지막에 삽입
          let orderList = this.getOrderList()
          orderList.push(id)
          this.ajaxUpdateOrder(orderList)
          
          // todo completed = 0 변경
          this.ajaxUpdateCompleted(id, completed)
        }
      }
    }
    // this.ajaxGetTodo()
  }

  componentDidMount() {
    const sortable = new Draggable.Sortable(document.querySelectorAll('div#todo-container'), {
        draggable: 'div.todo',
        delay: 200
      });
    sortable.on('sortable:stop', (e) => {
        this.arrIndexChanger(this.state.todoList, e.oldIndex, e.newIndex)
        this.ajaxUpdateOrder(this.getOrderList())
    });
  }

  shouldComponentUpdate(nextProps, nextState) {    
    // return false 하면 업데이트를 안함
    // return this.props.checked !== nextProps.checked
    return true;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
      // 여기서는 setState 를 하는 것이 아니라
      // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
      // 사용됩니다.
      if (nextProps.todoList !== prevState.todoList) {
        return { todoList: nextProps.todoList };
      }
      return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    return (
        <div>
            <div className="my-3 p-3 bg-white rounded shadow-sm">        
                <h6 className="border-bottom border-gray pb-2 mb-0">Need to:Do List</h6>
                    <div id='todo-container'>
                        {this.state.todoList.map((value, index) => {
                            if (value.completed == 0) {
                                return <TodoComponent key={value.id} data={value}
                                refreshHandler={this.ajaxGetTodo.bind(this)}
                                completeHandler={this.toggleComplete.bind(this)}/>
                            }
                        })}
                    </div>
                <small className="d-block text-right mt-3">
                    <p>각 todo를 마우스로 움직여 우선순위를 변경해보세요!</p>
                </small>
            </div>
            <div className="my-3 p-3 bg-light rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">:Done List</h6>
                    <div id='done-container'>
                        {this.state.todoList.map((value, index) => {
                            if (value.completed == 1) {
                                return <TodoComponent key={value.id} data={value} 
                                refreshHandler={this.ajaxGetTodo.bind(this)}
                                completeHandler={this.toggleComplete.bind(this)}/>
                            }
                        })}
                    </div>
                <small className="d-block text-right mt-3">
                    <p>체크박스를 해제하면 다시 todo list로 이동합니다</p>
                </small>
            </div>
        </div>
    );
  }
}

// find div#todo-create-container and put THIS component
// const domContainer = document.querySelector('#todo-done-container');
// ReactDOM.render(e(TodoList), domContainer);

