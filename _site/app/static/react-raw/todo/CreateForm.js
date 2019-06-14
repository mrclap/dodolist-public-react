'use strict';

const e = React.createElement;

class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title:null,
        detail:null,
        dueDate:null
    };
  }

  render() {
    return (
    <div>
        <div className="d-flex flex-row">
            <div className="p-2 col-9">
                <input id="input-title"
                        className="todo-create form-control"
                        type="text"
                        name="title"
                        value={this.state.title}
                        placeholder="할 일을 입력하고 간편하게 [ENTER]로 등록하세요!"/>
            </div>
            <div className="p-2 col-3">
                <div className="input-group date" id="datetimepicker-create" data-target-input="nearest">
                    <input type="text" className="todo-create form-control datetimepicker-input"
                        name="due-date"
                        value={this.state.dueDate}
                        data-target="#datetimepicker-create"
                        />
                    <div className="input-group-append" data-target="#datetimepicker-create" data-toggle="datetimepicker">
                        <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex flex-row input-group">
            <div className="p-2 col-12">
                <textarea id="input-detail"
                            className="todo-create form-control form-control-sm autosize" type="text"
                            name="detail"
                            rows="2"
                            placeholder="더 자세히 할 일에 대해 기록이 필요하다면 사용하세요!"
                >{this.state.detail}</textarea>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end input-group">
            <button id='btn-create-todo' type="button" className="btn btn-info">등록</button>
        </div>
    </div>
    );
  }
}

const domContainer = document.querySelector('#todo-create-container');
ReactDOM.render(e(CreateTodo), domContainer);