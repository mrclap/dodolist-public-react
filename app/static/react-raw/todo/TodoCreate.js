'use strict';

const e = React.createElement;

class TodoCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title:'',
        detail:'',
        dueDate:''
    };
    this.dueDateRef=React.createRef();
    this.ajaxGetTodo = this.props.refreshHandler
  }

  handleChange = (e) => {
    this.setState({dueDate:this.dueDateRef.current.value})
    this.setState({[e.target.name] : e.target.value})
  }

  save() {
    this.setState({dueDate:this.dueDateRef.current.value}, this.ajaxCreateTodo)
  }

  // date time formatter
  datetimeFormatter = (datetime, format='YYMMDD HHmm') => {
      const stdFormatTime = moment(datetime, format).format('YYYY-MM-DD HH:mm')
      return stdFormatTime
  }

  getCSRFToken() {
    return Cookies.get('csrftoken');
  }

  ajaxCreateTodo() {
    let data = {}
  
    data['category'] = categoryId //global variable
    data['title'] = this.state.title
    data['detail'] = this.state.detail
    data['completed'] = 0

    let dueDate = this.state.dueDate

    let datetimeReg = new RegExp("[0-9]{6}.[0-9]{4}");
    if (!datetimeReg.exec(dueDate)) {
      data['due_date'] = null
    }else {
      data['due_date'] = this.datetimeFormatter(dueDate, 'YYMMDD HHmm')
    }
    
    let headers = {
              'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken' : this.getCSRFToken()
    }
 
    data = JSON.stringify(data)
    let url = "/api/todos/"

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('todo create!')
        this.setState({
          title:'',
          detail:'',
          dueDate:''
      })
        this.ajaxGetTodo()
      },
      (error) => {
        console.log('api error')
      }
    )  
  }

  render() {
    return (
    <div className="input-group flex-column">
        <div className="d-flex flex-row">
            <div className="p-2 col-9">
                <input id="input-title"
                        className="todo-create form-control"
                        type="text"
                        name="title"
                        value={this.state.title}
                        placeholder="할 일을 입력하고 간편하게 [ENTER]로 등록하세요!"
                        onChange={this.handleChange}/>
            </div>
            <div className="p-2 col-3">
                <div className="input-group date" id="datetimepicker-create" data-target-input="#input-due-date">
                    <input 
                        id="input-due-date"
                        type="text" className="todo-create form-control datetimepicker-input"
                        name="dueDate"
                        value={this.state.dueDate}
                        data-target="#datetimepicker-create"
                        onChange={this.handleChange}
                        ref={this.dueDateRef}
                        />
                    <div className="input-group-append" data-target="#datetimepicker-create" data-toggle="datetimepicker" >
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
                            onChange={this.handleChange}
                            value={this.state.detail}
                ></textarea>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end input-group">
            <button id='btn-create-todo'
                    type="button"
                    className="btn btn-info"
                    onClick={this.save.bind(this)}
                    >등록</button>
        </div>
    </div>
    );
  }
}

// const domContainer = document.querySelector('#todo-create-container');
// let inputForm = ReactDOM.render(e(TodoCreate), domContainer);
