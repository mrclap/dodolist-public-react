'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var TodoSPA = function (_React$Component) {
  _inherits(TodoSPA, _React$Component);

  function TodoSPA(props) {
    _classCallCheck(this, TodoSPA);

    var _this = _possibleConstructorReturn(this, (TodoSPA.__proto__ || Object.getPrototypeOf(TodoSPA)).call(this, props));

    _this.state = {
      isLoaded: false,
      todoList: []
    };
    return _this;
  }

  //get todolist with api


  _createClass(TodoSPA, [{
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.ajaxGetTodo();
    }
  }, {
    key: 'refreshTodoList',
    value: function refreshTodoList() {
      this.ajaxGetTodo();
    }

    // shouldComponentUpdate(nextProps, nextState) {    
    //   // return false 하면 업데이트를 안함
    //   // return this.props.checked !== nextProps.checked
    //   return true;
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    // }

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'd-flex flex-column align-items-stretch p-3 my-3 text-black-50 rounded shadow-sm' },
        React.createElement(TodoCreate, { refreshHandler: this.refreshTodoList.bind(this) }),
        React.createElement(TodoList, { todoList: this.state.todoList, refreshHandler: this.refreshTodoList.bind(this) })
      );
    }
  }]);

  return TodoSPA;
}(React.Component);

var domContainer = document.querySelector('#main-container');
ReactDOM.render(e(TodoSPA), domContainer);

// Tempus Dominus - datepicker
$('#datetimepicker-create').datetimepicker({ 'format': 'YYMMDD HHmm' });