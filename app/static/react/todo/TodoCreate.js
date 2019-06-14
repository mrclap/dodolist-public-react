'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var TodoCreate = function (_React$Component) {
  _inherits(TodoCreate, _React$Component);

  function TodoCreate(props) {
    _classCallCheck(this, TodoCreate);

    var _this = _possibleConstructorReturn(this, (TodoCreate.__proto__ || Object.getPrototypeOf(TodoCreate)).call(this, props));

    _this.handleChange = function (e) {
      _this.setState({ dueDate: _this.dueDateRef.current.value });
      _this.setState(_defineProperty({}, e.target.name, e.target.value));
    };

    _this.datetimeFormatter = function (datetime) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYMMDD HHmm';

      var stdFormatTime = moment(datetime, format).format('YYYY-MM-DD HH:mm');
      return stdFormatTime;
    };

    _this.state = {
      title: '',
      detail: '',
      dueDate: ''
    };
    _this.dueDateRef = React.createRef();
    _this.ajaxGetTodo = _this.props.refreshHandler;
    return _this;
  }

  _createClass(TodoCreate, [{
    key: 'save',
    value: function save() {
      this.setState({ dueDate: this.dueDateRef.current.value }, this.ajaxCreateTodo);
    }

    // date time formatter

  }, {
    key: 'getCSRFToken',
    value: function getCSRFToken() {
      return Cookies.get('csrftoken');
    }
  }, {
    key: 'ajaxCreateTodo',
    value: function ajaxCreateTodo() {
      var _this2 = this;

      var data = {};

      data['category'] = categoryId; //global variable
      data['title'] = this.state.title;
      data['detail'] = this.state.detail;
      data['completed'] = 0;

      var dueDate = this.state.dueDate;

      var datetimeReg = new RegExp("[0-9]{6}.[0-9]{4}");
      if (!datetimeReg.exec(dueDate)) {
        data['due_date'] = null;
      } else {
        data['due_date'] = this.datetimeFormatter(dueDate, 'YYMMDD HHmm');
      }

      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCSRFToken()
      };

      data = JSON.stringify(data);
      var url = "/api/todos/";

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log('todo create!');
        _this2.setState({
          title: '',
          detail: '',
          dueDate: ''
        });
        _this2.ajaxGetTodo();
      }, function (error) {
        console.log('api error');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'input-group flex-column' },
        React.createElement(
          'div',
          { className: 'd-flex flex-row' },
          React.createElement(
            'div',
            { className: 'p-2 col-9' },
            React.createElement('input', { id: 'input-title',
              className: 'todo-create form-control',
              type: 'text',
              name: 'title',
              value: this.state.title,
              placeholder: '\uD560 \uC77C\uC744 \uC785\uB825\uD558\uACE0 \uAC04\uD3B8\uD558\uAC8C [ENTER]\uB85C \uB4F1\uB85D\uD558\uC138\uC694!',
              onChange: this.handleChange })
          ),
          React.createElement(
            'div',
            { className: 'p-2 col-3' },
            React.createElement(
              'div',
              { className: 'input-group date', id: 'datetimepicker-create', 'data-target-input': '#input-due-date' },
              React.createElement('input', {
                id: 'input-due-date',
                type: 'text', className: 'todo-create form-control datetimepicker-input',
                name: 'dueDate',
                value: this.state.dueDate,
                'data-target': '#datetimepicker-create',
                onChange: this.handleChange,
                ref: this.dueDateRef
              }),
              React.createElement(
                'div',
                { className: 'input-group-append', 'data-target': '#datetimepicker-create', 'data-toggle': 'datetimepicker' },
                React.createElement(
                  'div',
                  { className: 'input-group-text' },
                  React.createElement('i', { className: 'fa fa-calendar' })
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'd-flex flex-row input-group' },
          React.createElement(
            'div',
            { className: 'p-2 col-12' },
            React.createElement('textarea', { id: 'input-detail',
              className: 'todo-create form-control form-control-sm autosize', type: 'text',
              name: 'detail',
              rows: '2',
              placeholder: '\uB354 \uC790\uC138\uD788 \uD560 \uC77C\uC5D0 \uB300\uD574 \uAE30\uB85D\uC774 \uD544\uC694\uD558\uB2E4\uBA74 \uC0AC\uC6A9\uD558\uC138\uC694!',
              onChange: this.handleChange,
              value: this.state.detail
            })
          )
        ),
        React.createElement(
          'div',
          { className: 'd-flex flex-column align-items-end input-group' },
          React.createElement(
            'button',
            { id: 'btn-create-todo',
              type: 'button',
              className: 'btn btn-info',
              onClick: this.save.bind(this)
            },
            '\uB4F1\uB85D'
          )
        )
      );
    }
  }]);

  return TodoCreate;
}(React.Component);

// const domContainer = document.querySelector('#todo-create-container');
// let inputForm = ReactDOM.render(e(TodoCreate), domContainer);