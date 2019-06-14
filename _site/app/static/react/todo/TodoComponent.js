'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var TodoComponent = function (_React$Component) {
    _inherits(TodoComponent, _React$Component);

    function TodoComponent(props) {
        _classCallCheck(this, TodoComponent);

        var _this = _possibleConstructorReturn(this, (TodoComponent.__proto__ || Object.getPrototypeOf(TodoComponent)).call(this, props));

        _this.state = {
            id: props.data.id,
            completed: props.data.completed,
            title: props.data.title,
            detail: props.data.detail,
            dueDate: props.data.due_date
        };
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

        // getCSRFToken() {
        //   return Cookies.get('csrftoken');
        // }

        // toggleComplete() {
        //   let _completed = this.state.completed ? 0 : 1
        //   this.ajaxUpdateCompleted(_completed)
        //   this.setState({completed:_completed})
        // }

    }, {
        key: 'handler',
        value: function handler() {
            this.props.completeHandler(this.state.id);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'todo media text-muted pt-3' },
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
                    { className: 'media-body pb-3 mb-0 small lh-125 border-bottom border-gray' },
                    React.createElement(
                        'strong',
                        { className: 'd-block text-gray-dark' },
                        this.state.title
                    ),
                    this.state.detail,
                    React.createElement(
                        'span',
                        { className: 'due-date d-block text-primary' },
                        this.state.dueDate
                    )
                )
            );
        }
    }]);

    return TodoComponent;
}(React.Component);

// export default TodoComponent;

// find div#like_button_container and put THIS component
// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(TodoComponent), domContainer);