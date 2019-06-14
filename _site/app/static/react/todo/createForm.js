'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var CreateTodo = function (_React$Component) {
    _inherits(CreateTodo, _React$Component);

    function CreateTodo(props) {
        _classCallCheck(this, CreateTodo);

        var _this = _possibleConstructorReturn(this, (CreateTodo.__proto__ || Object.getPrototypeOf(CreateTodo)).call(this, props));

        _this.state = {
            title: null,
            detail: null,
            dueDate: null
        };
        return _this;
    }

    _createClass(CreateTodo, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "d-flex flex-row" },
                    React.createElement(
                        "div",
                        { className: "p-2 col-9" },
                        React.createElement("input", { id: "input-title",
                            className: "todo-create form-control",
                            type: "text",
                            name: "title",
                            value: this.state.title,
                            placeholder: "\uD560 \uC77C\uC744 \uC785\uB825\uD558\uACE0 \uAC04\uD3B8\uD558\uAC8C [ENTER]\uB85C \uB4F1\uB85D\uD558\uC138\uC694!" })
                    ),
                    React.createElement(
                        "div",
                        { className: "p-2 col-3" },
                        React.createElement(
                            "div",
                            { className: "input-group date", id: "datetimepicker-create", "data-target-input": "nearest" },
                            React.createElement("input", { type: "text", className: "todo-create form-control datetimepicker-input",
                                name: "due-date",
                                value: this.state.dueDate,
                                "data-target": "#datetimepicker-create"
                            }),
                            React.createElement(
                                "div",
                                { className: "input-group-append", "data-target": "#datetimepicker-create", "data-toggle": "datetimepicker" },
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
                        React.createElement(
                            "textarea",
                            { id: "input-detail",
                                className: "todo-create form-control form-control-sm autosize", type: "text",
                                name: "detail",
                                rows: "2",
                                placeholder: "\uB354 \uC790\uC138\uD788 \uD560 \uC77C\uC5D0 \uB300\uD574 \uAE30\uB85D\uC774 \uD544\uC694\uD558\uB2E4\uBA74 \uC0AC\uC6A9\uD558\uC138\uC694!"
                            },
                            this.state.detail
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "d-flex flex-column align-items-end input-group" },
                    React.createElement(
                        "button",
                        { id: "btn-create-todo", type: "button", className: "btn btn-info" },
                        "\uB4F1\uB85D"
                    )
                )
            );
        }
    }]);

    return CreateTodo;
}(React.Component);

var domContainer = document.querySelector('#todo-create-container');
ReactDOM.render(e(CreateTodo), domContainer);