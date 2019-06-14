'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var TodoList = function (_React$Component) {
  _inherits(TodoList, _React$Component);

  function TodoList(props) {
    _classCallCheck(this, TodoList);

    var _this = _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));

    _this.state = {
      isLoaded: false,
      todoList: []
    };
    return _this;
  }

  _createClass(TodoList, [{
    key: 'arrIndexChanger',
    value: function arrIndexChanger(arr, from, to) {
      arr.splice(to, 0, arr.splice(from, 1)[0]);
      this.setState({ todoList: arr });
      this.getOrderList();
    }
  }, {
    key: 'getOrderList',
    value: function getOrderList() {
      var todoList = this.state.todoList;
      var orderList = [];
      for (var idx in todoList) {
        if (todoList[idx].completed === 0) {
          orderList.push(todoList[idx].id);
        }
      }
      return orderList;
    }
  }, {
    key: 'getCSRFToken',
    value: function getCSRFToken() {
      return Cookies.get('csrftoken');
    }
  }, {
    key: 'ajaxGetTodo',
    value: function ajaxGetTodo() {
      var _this2 = this;

      var url = "/api/todos/";
      fetch(url).then(function (res) {
        return res.json();
      }).then(function (result) {
        _this2.setState({
          isLoaded: true,
          todoList: result
        });
      }, function (error) {
        console.log('api error');
      });
    }
  }, {
    key: 'ajaxUpdateOrder',
    value: function ajaxUpdateOrder(orderList) {
      var _orderId = orderId; //global variable
      var order = { 'order': orderList };
      var csrfToken = getCSRFToken();

      var data = {
        'order_json': JSON.stringify(order)
      };
      var headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      });
      data = JSON.stringify(data);
      var url = "/api/orders/" + _orderId + "/";

      fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: data
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log('order update!');
      }, function (error) {
        console.log('api error');
      });
    }
  }, {
    key: 'ajaxUpdateCompleted',
    value: function ajaxUpdateCompleted(id, completed) {
      var _id = id;
      var data = {
        'completed': completed
      };

      var csrfToken = getCSRFToken();
      var headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      });
      data = JSON.stringify(data);
      var url = "/api/todos/" + _id + "/";

      fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: data
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log('completed update!');
      }, function (error) {
        console.log('api error');
      });
    }
  }, {
    key: 'toggleComplete',
    value: function toggleComplete(id) {
      var todoList = this.state.todoList;
      for (var idx in todoList) {
        if (todoList[idx].id === id) {
          var completed = todoList[idx].completed ? 0 : 1;
          if (todoList[idx].completed === 0) {
            // orderList에서 해당 todo index 삭제
            var orderList = this.getOrderList();
            var pos = orderList.indexOf(id);
            orderList.splice(pos, 1);
            this.ajaxUpdateOrder(orderList);

            // todo completed = 1 변경
            this.ajaxUpdateCompleted(id, completed);
            break;
          } else {
            console.log('else');
            // orderList에 해당 id 가장 마지막에 삽입
            var _orderList = this.getOrderList();
            _orderList.push(id);
            this.ajaxUpdateOrder(_orderList);

            // todo completed = 0 변경
            this.ajaxUpdateCompleted(id, completed);
            break;
          }
        }
      }
      this.ajaxGetTodo();
    }

    //get todolist with api

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.ajaxGetTodo();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var sortable = new Draggable.Sortable(document.querySelectorAll('div#todo-container'), {
        draggable: 'div.todo',
        delay: 200
      });
      sortable.on('sortable:stop', function (e) {
        _this3.arrIndexChanger(_this3.state.todoList, e.oldIndex, e.newIndex);
        _this3.ajaxUpdateOrder(_this3.getOrderList());
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // return false 하면 업데이트를 안함
      // return this.props.checked !== nextProps.checked
      return true;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState, snapshot) {}
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'my-3 p-3 bg-white rounded shadow-sm' },
          React.createElement(
            'h6',
            { className: 'border-bottom border-gray pb-2 mb-0' },
            'Need to:Do List'
          ),
          React.createElement(
            'div',
            { id: 'todo-container' },
            this.state.todoList.map(function (value, index) {
              if (value.completed == 0) {
                return React.createElement(TodoComponent, { key: value.id, data: value, completeHandler: _this4.toggleComplete.bind(_this4) });
              }
            })
          ),
          React.createElement(
            'small',
            { className: 'd-block text-right mt-3' },
            React.createElement(
              'p',
              null,
              '\uAC01 todo\uB97C \uB9C8\uC6B0\uC2A4\uB85C \uC6C0\uC9C1\uC5EC \uC6B0\uC120\uC21C\uC704\uB97C \uBCC0\uACBD\uD574\uBCF4\uC138\uC694!'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'my-3 p-3 bg-light rounded shadow-sm' },
          React.createElement(
            'h6',
            { className: 'border-bottom border-gray pb-2 mb-0' },
            ':Done List'
          ),
          React.createElement(
            'div',
            { id: 'done-container' },
            this.state.todoList.map(function (value, index) {
              if (value.completed == 1) {
                return React.createElement(TodoComponent, { key: value.id, data: value, completeHandler: _this4.toggleComplete.bind(_this4) });
              }
            })
          ),
          React.createElement(
            'small',
            { className: 'd-block text-right mt-3' },
            React.createElement(
              'p',
              null,
              '\uCCB4\uD06C\uBC15\uC2A4\uB97C \uD574\uC81C\uD558\uBA74 \uB2E4\uC2DC todo list\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4'
            )
          )
        )
      );
    }
  }]);

  return TodoList;
}(React.Component);

// find div#todo-create-container and put THIS component


var domContainer = document.querySelector('#todo-done-container');
ReactDOM.render(e(TodoList), domContainer);