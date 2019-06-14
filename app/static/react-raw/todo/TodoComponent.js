'use strict';

const e = React.createElement;

class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        id : props.data.id,
        completed : props.data.completed,
        title : props.data.title,
        detail : props.data.detail,
        dueDate : props.data.due_date,
        uDueDate : moment(props.data.due_date).format('YYMMDD HHmm'),
        modal: false
    };
    this.dueDateRef=React.createRef();
    this.ajaxGetTodo = this.props.refreshHandler
  }

  getTodoFonticon(completed) {
      let str = '';
      if (completed == 0) {
        str = 'check_box_outline_blank'
      }else{
        str = 'check'
      }
      return str
  }

  handler() {
    this.props.completeHandler(this.state.id)
  }
  
  handleChange = (e) => {
    this.setState({uDueDate:this.dueDateRef.current.value})
    this.setState({[e.target.name] : e.target.value})
  }

  showDetail() {
    this.setState({modal:true}, ()=>{
      $('#modal-todo-detail').modal('show')
      $('#datetimepicker-update').datetimepicker({'format': 'YYMMDD HHmm'});
    })
    // Tempus Dominus - datepicker for modal
    
  }

  closeDetail() {
    this.setState({modal:false}, ()=> {
    })
  }

  save() {
    this.setState({uDueDate:this.dueDateRef.current.value}, this.ajaxTodoUpdate)
  }

  // date time formatter
  datetimeFormatter = (datetime, format='YYMMDD HHmm') => {
    const stdFormatTime = moment(datetime, format).format('YYYY-MM-DD HH:mm')
    return stdFormatTime
  }

  getCSRFToken() {
    return Cookies.get('csrftoken');
  }

  ajaxTodoUpdate() {
    let data = {}
    let id = this.state.id
    data['title'] = this.state.title
    data['detail'] = this.state.detail

    let dueDate = this.state.uDueDate
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
    let url = "/api/todos/" + id + '/'

    fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: data
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('todo update!')
      },
      (error) => {
        console.log('api error')
      }
    ).then(
      this.closeDetail()
    )  
  }

  ajaxTodoDelete() {
    let id = this.state.id
    let headers = {
                'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken' : this.getCSRFToken()
      }
 
    let url = "/api/todos/" + id + '/'
    fetch(url, {
        method: 'DELETE',
        headers: headers,
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('todo deleted!')
      },
      (error) => {
        console.log('api error')
      }
    ).then(
      this.ajaxGetTodo
    )
  }

  timeDisplayFormatter(org) {
    if (org) {
      return moment(org).format('YYYY-MM-DD HH:mm')
    }
    return ''
  }

  modal() {
    return (
      <div className="modal fade" id="modal-todo-detail" tabIndex="-1" role="dialog" aria-labelledby="todo-modal-title-label" aria-hidden="true"
      data-backdrop='false'
      data-keyboard='false'>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="todo-modal-title-label">todo detail</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column align-items-center p-3 my-3 text-black-50 rounded shadow-sm">
                <div id='todo-update-container' className="input-group flex-column">
                  <div className="d-flex flex-row">
                    <div className="p-2 col-9">
                      <input id="modal-input-title"
                            className="todo-update form-control"
                            type="text"
                            name="title"
                            onChange={this.handleChange}
                            value={this.state.title}/>
                    </div>
                    <div className="p-2 col-3">
                      <div className="input-group date" id="datetimepicker-update" data-target-input="nearest">
                        <input 
                              id="update-due-date"
                              type="text"
                              className="todo-update form-control datetimepicker-input"
                              name="uDueDate"
                              data-target="#datetimepicker-update"
                              onChange={this.handleChange}
                              value={this.state.uDueDate?this.state.uDueDate:''}
                              ref={this.dueDateRef}
                              />
                        <div className="input-group-append" data-target="#datetimepicker-update" data-toggle="datetimepicker">
                            <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row input-group">
                    <div className="p-2 col-12">
                      <textarea id="modal-input-detail"
                                className="todo-update form-control form-control-sm autosize" type="text"
                                name="detail"
                                rows="2"
                                onChange={this.handleChange}
                                value={this.state.detail}>
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
               onClick={this.save.bind(this)}
               id='btn-update-todo' type="button" className="btn btn-primary" data-dismiss="modal">수정완료</button>
              <button
               onClick={this.closeDetail.bind(this)}
               type="button" className="btn btn-secondary" data-dismiss="modal">취소</button>
              <button
                onClick={this.ajaxTodoDelete.bind(this)}
                id='btn-delete-todo' type="button" className="btn btn-danger" data-dismiss="modal">삭제</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
        <div className="todo media text-muted pt-3">           
          { 
            this.state.modal ? this.modal():''
          }
            <input type="hidden" value={this.state.id}/>
            <button className="btn btn-link" onClick={this.handler.bind(this)}>
                <i className="material-icons mr-2 btn-checkbox"
                    style={{fontSize:'32px', color:'black'}}>
                    {this.getTodoFonticon(this.state.completed)}
                </i>
            </button>
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
                onClick={this.showDetail.bind(this)}>
                <strong className="d-block text-gray-dark">
                        {this.state.title}
                </strong>
                    {this.state.detail}
                <span
                  className="due-date d-block text-primary">
                 {this.timeDisplayFormatter(this.state.dueDate)}
                </span>
              </p>
        </div>
    );
  }
}

