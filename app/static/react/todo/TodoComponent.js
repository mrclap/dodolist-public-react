'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var TodoComponent = function (_React$Component) {
  _inherits(TodoComponent, _React$Component);

  function TodoComponent(props) {
    _classCallCheck(this, TodoComponent);

    var _this = _possibleConstructorReturn(this, (TodoComponent.__proto__ || Object.getPrototypeOf(TodoComponent)).call(this, props));

    _this.handleChange = function (e) {
      _this.setState({ uDueDate: _this.dueDateRef.current.value });
      _this.setState(_defineProperty({}, e.target.name, e.target.value));
    };

    _this.datetimeFormatter = function (datetime) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYMMDD HHmm';

      var stdFormatTime = moment(datetime, format).format('YYYY-MM-DD HH:mm');
      return stdFormatTime;
    };

    _this.state = {
      id: props.data.id,
      completed: props.data.completed,
      title: props.data.title,
      detail: props.data.detail,
      dueDate: props.data.due_date,
      uDueDate: moment(props.data.due_date).format('YYMMDD HHmm'),
      modal: false
    };
    _this.dueDateRef = React.createRef();
    _this.ajaxGetTodo = _this.props.refreshHandler;
    return _this;
  }

  _createClass(TodoComponent, [{
    key: 'getTodoFonticon',
    value: function getTodoFonticon(completed) {
      var str = '';
      if (completed == 0) {
        str = 'check_box_outline_blank';
      } else {
        str = 'check';
      }
      return str;
    }
  }, {
    key: 'handler',
    value: function handler() {
      this.props.completeHandler(this.state.id);
    }
  }, {
    key: 'showDetail',
    value: function showDetail() {
      this.setState({ modal: true }, function () {
        $('#modal-todo-detail').modal('show');
        $('#datetimepicker-update').datetimepicker({ 'format': 'YYMMDD HHmm' });
      });
      // Tempus Dominus - datepicker for modal
    }
  }, {
    key: 'closeDetail',
    value: function closeDetail() {
      this.setState({ modal: false }, function () {});
    }
  }, {
    key: 'save',
    value: function save() {
      this.setState({ uDueDate: this.dueDateRef.current.value }, this.ajaxTodoUpdate);
    }

    // date time formatter

  }, {
    key: 'getCSRFToken',
    value: function getCSRFToken() {
      return Cookies.get('csrftoken');
    }
  }, {
    key: 'ajaxTodoUpdate',
    value: function ajaxTodoUpdate() {
      var data = {};
      var id = this.state.id;
      data['title'] = this.state.title;
      data['detail'] = this.state.detail;

      var dueDate = this.state.uDueDate;
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
      var url = "/api/todos/" + id + '/';

      fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: data
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log('todo update!');
      }, function (error) {
        console.log('api error');
      }).then(this.closeDetail());
    }
  }, {
    key: 'ajaxTodoDelete',
    value: function ajaxTodoDelete() {
      var id = this.state.id;
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCSRFToken()
      };

      var url = "/api/todos/" + id + '/';
      fetch(url, {
        method: 'DELETE',
        headers: headers
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log('todo deleted!');
      }, function (error) {
        console.log('api error');
      }).then(this.ajaxGetTodo);
    }
  }, {
    key: 'timeDisplayFormatter',
    value: function timeDisplayFormatter(org) {
      if (org) {
        return moment(org).format('YYYY-MM-DD HH:mm');
      }
      return '';
    }
  }, {
    key: 'modal',
    value: function modal() {
      return React.createElement(
        'div',
        { className: 'modal fade', id: 'modal-todo-detail', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'todo-modal-title-label', 'aria-hidden': 'true',
          'data-backdrop': 'false',
          'data-keyboard': 'false' },
        React.createElement(
          'div',
          { className: 'modal-dialog modal-lg', role: 'document' },
          React.createElement(
            'div',
            { className: 'modal-content' },
            React.createElement(
              'div',
              { className: 'modal-header' },
              React.createElement(
                'h5',
                { className: 'modal-title', id: 'todo-modal-title-label' },
                'todo detail'
              ),
              React.createElement(
                'button',
                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                React.createElement('span', { 'aria-hidden': 'true' })
              )
            ),
            React.createElement(
              'div',
              { className: 'modal-body' },
              React.createElement(
                'div',
                { className: 'd-flex flex-column align-items-center p-3 my-3 text-black-50 rounded shadow-sm' },
                React.createElement(
                  'div',
                  { id: 'todo-update-container', className: 'input-group flex-column' },
                  React.createElement(
                    'div',
                    { className: 'd-flex flex-row' },
                    React.createElement(
                      'div',
                      { className: 'p-2 col-9' },
                      React.createElement('input', { id: 'modal-input-title',
                        className: 'todo-update form-control',
                        type: 'text',
                        name: 'title',
                        onChange: this.handleChange,
                        value: this.state.title })
                    ),
                    React.createElement(
                      'div',
                      { className: 'p-2 col-3' },
                      React.createElement(
                        'div',
                        { className: 'input-group date', id: 'datetimepicker-update', 'data-target-input': 'nearest' },
                        React.createElement('input', {
                          id: 'update-due-date',
                          type: 'text',
                          className: 'todo-update form-control datetimepicker-input',
                          name: 'uDueDate',
                          'data-target': '#datetimepicker-update',
                          onChange: this.handleChange,
                          value: this.state.uDueDate ? this.state.uDueDate : '',
                          ref: this.dueDateRef
                        }),
                        React.createElement(
                          'div',
                          { className: 'input-group-append', 'data-target': '#datetimepicker-update', 'data-toggle': 'datetimepicker' },
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
                      React.createElement('textarea', { id: 'modal-input-detail',
                        className: 'todo-update form-control form-control-sm autosize', type: 'text',
                        name: 'detail',
                        rows: '2',
                        onChange: this.handleChange,
                        value: this.state.detail })
                    )
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'modal-footer' },
              React.createElement(
                'button',
                {
                  onClick: this.save.bind(this),
                  id: 'btn-update-todo', type: 'button', className: 'btn btn-primary', 'data-dismiss': 'modal' },
                '\uC218\uC815\uC644\uB8CC'
              ),
              React.createElement(
                'button',
                {
                  onClick: this.closeDetail.bind(this),
                  type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                '\uCDE8\uC18C'
              ),
              React.createElement(
                'button',
                {
                  onClick: this.ajaxTodoDelete.bind(this),
                  id: 'btn-delete-todo', type: 'button', className: 'btn btn-danger', 'data-dismiss': 'modal' },
                '\uC0AD\uC81C'
              )
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'todo media text-muted pt-3' },
        this.state.modal ? this.modal() : '',
        React.createElement('input', { type: 'hidden', value: this.state.id }),
        React.createElement(
          'button',
          { className: 'btn btn-link', onClick: this.handler.bind(this) },
          React.createElement(
            'i',
            { className: 'material-icons mr-2 btn-checkbox',
              style: { fontSize: '32px', color: 'black' } },
            this.getTodoFonticon(this.state.completed)
          )
        ),
        React.createElement(
          'p',
          { className: 'media-body pb-3 mb-0 small lh-125 border-bottom border-gray',
            onClick: this.showDetail.bind(this) },
          React.createElement(
            'strong',
            { className: 'd-block text-gray-dark' },
            this.state.title
          ),
          this.state.detail,
          React.createElement(
            'span',
            {
              className: 'due-date d-block text-primary' },
            this.timeDisplayFormatter(this.state.dueDate)
          )
        )
      );
    }
  }]);

  return TodoComponent;
}(React.Component);