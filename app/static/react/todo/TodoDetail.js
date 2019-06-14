'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var TodoDetail = function (_React$Component) {
  _inherits(TodoDetail, _React$Component);

  function TodoDetail(props) {
    _classCallCheck(this, TodoDetail);

    var _this = _possibleConstructorReturn(this, (TodoDetail.__proto__ || Object.getPrototypeOf(TodoDetail)).call(this, props));

    _this.state = {
      // id : props.data.id,
      // completed : props.data.completed,
      // title : props.data.title,
      // detail : props.data.detail,
      // dueDate : props.data.due_date,
    };
    _this.dueDateRef = React.createRef();
    // this.ajaxGetTodo = this.props.refreshHandler
    return _this;
  }

  // handleChange = (e) => {
  //   this.setState({dueDate:this.dueDateRef.current.value})
  //   this.setState({[e.target.name] : e.target.value})
  // }


  // date time formatter
  // datetimeFormatter = (datetime, format='YYMMDD HHmm') => {
  //     const stdFormatTime = moment(datetime, format).format('YYYY-MM-DDThh:mm')
  //     return stdFormatTime
  // }

  // ajaxCreateTodo() {
  //   let data = {}

  //   data['category'] = categoryId //global variable
  //   data['title'] = this.state.title
  //   data['detail'] = this.state.detail
  //   data['completed'] = 0

  //   let dueDate = this.state.dueDate

  //   let datetimeReg = new RegExp("[0-9]{6}.[0-9]{4}");
  //   if (!datetimeReg.exec(dueDate)) {
  //     data['due_date'] = null
  //   }else {
  //     data['due_date'] = this.datetimeFormatter(dueDate, 'YYMMDD HHmm')
  //   }

  //   let headers = {
  //             'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken' : getCSRFToken()
  //   }

  //   data = JSON.stringify(data)
  //   let url = "/api/todos/"

  //   fetch(url, {
  //       method: 'POST',
  //       headers: headers,
  //       body: data
  //   })
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       console.log('todo create!')
  //       this.setState({
  //         title:'',
  //         detail:'',
  //         dueDate:''
  //     })
  //       this.ajaxGetTodo()
  //     },
  //     (error) => {
  //       console.log('api error')
  //     }
  //   )  
  // }

  _createClass(TodoDetail, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "modal fade", id: "modal-todo-detail", tabIndex: "-1", role: "dialog", "aria-labelledby": "todo-modal-title-label", "aria-hidden": "true",
          "data-id": "" },
        React.createElement(
          "div",
          { className: "modal-dialog modal-lg", role: "document" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "h5",
                { className: "modal-title", id: "todo-modal-title-label" },
                "todo detail"
              ),
              React.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                React.createElement("span", { "aria-hidden": "true" })
              )
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "div",
                { className: "d-flex flex-column align-items-center p-3 my-3 text-black-50 rounded shadow-sm" },
                React.createElement(
                  "div",
                  { id: "todo-update-container", className: "input-group flex-column" },
                  React.createElement(
                    "div",
                    { className: "d-flex flex-row" },
                    React.createElement(
                      "div",
                      { className: "p-2 col-9" },
                      React.createElement("input", { type: "hidden", className: "todo-update", name: "id",
                        value: "" }),
                      React.createElement("input", { id: "modal-input-title",
                        className: "todo-update form-control",
                        type: "text",
                        name: "title",
                        value: "" })
                    ),
                    React.createElement(
                      "div",
                      { className: "p-2 col-3" },
                      React.createElement(
                        "div",
                        { className: "input-group date", id: "datetimepicker-update", "data-target-input": "nearest" },
                        React.createElement("input", {
                          id: "update-due-date",
                          type: "text",
                          className: "todo-update form-control datetimepicker-input",
                          name: "dueDate",
                          "data-target": "#datetimepicker-update"
                          // value={this.state.dueDate}
                          , value: "",
                          ref: this.dueDateRef
                        }),
                        React.createElement(
                          "div",
                          { className: "input-group-append", "data-target": "#datetimepicker-update", "data-toggle": "datetimepicker" },
                          React.createElement(
                            "div",
                            { className: "input-group-text" },
                            React.createElement("i", { className: "fa fa-calendar" })
                          )
                        )
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "d-flex flex-row input-group" },
                    React.createElement(
                      "div",
                      { className: "p-2 col-12" },
                      React.createElement("textarea", { id: "modal-input-detail",
                        className: "todo-update form-control form-control-sm autosize", type: "text",
                        name: "detail",
                        rows: "2",
                        value: "" })
                    )
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                { id: "btn-update-todo", type: "button", className: "btn btn-primary", "data-dismiss": "modal" },
                "\uC218\uC815\uC644\uB8CC"
              ),
              React.createElement(
                "button",
                { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
                "\uCDE8\uC18C"
              ),
              React.createElement(
                "button",
                { id: "btn-delete-todo", type: "button", className: "btn btn-danger", "data-dismiss": "modal" },
                "\uC0AD\uC81C"
              )
            )
          )
        )
      );
    }
  }]);

  return TodoDetail;
}(React.Component);

// const domContainer = document.querySelector('#todo-create-container');
// let inputForm = ReactDOM.render(e(TodoCreate), domContainer);

// Tempus Dominus - datepicker


$('#datetimepicker-update').datetimepicker({ 'format': 'YYMMDD HHmm' });