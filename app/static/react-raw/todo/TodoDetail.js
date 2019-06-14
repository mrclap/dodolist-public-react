'use strict';

const e = React.createElement;

class TodoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // id : props.data.id,
        // completed : props.data.completed,
        // title : props.data.title,
        // detail : props.data.detail,
        // dueDate : props.data.due_date,
    };
    this.dueDateRef=React.createRef();
    // this.ajaxGetTodo = this.props.refreshHandler
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

  render() {
    return (
      <div className="modal fade" id="modal-todo-detail" tabIndex="-1" role="dialog" aria-labelledby="todo-modal-title-label" aria-hidden="true"
      data-id=''>
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
                      <input type="hidden" className="todo-update" name="id"
                            value=""/>
                            {/* value={this.state.id}/> */}
                      <input id="modal-input-title"
                            className="todo-update form-control"
                            type="text"
                            name="title"
                            value=""/>
                            {/* value={this.state.title}/> */}
                    </div>
                    <div className="p-2 col-3">
                      <div className="input-group date" id="datetimepicker-update" data-target-input="nearest">
                        <input 
                              id="update-due-date"
                              type="text"
                              className="todo-update form-control datetimepicker-input"
                              name="dueDate"
                              data-target="#datetimepicker-update"
                              // value={this.state.dueDate}
                              value=""
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
                                value="">
                                {/* value={this.state.detail}> */}
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button id='btn-update-todo' type="button" className="btn btn-primary" data-dismiss="modal">수정완료</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">취소</button>
              <button id='btn-delete-todo' type="button" className="btn btn-danger" data-dismiss="modal">삭제</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const domContainer = document.querySelector('#todo-create-container');
// let inputForm = ReactDOM.render(e(TodoCreate), domContainer);

// Tempus Dominus - datepicker
$('#datetimepicker-update').datetimepicker({'format': 'YYMMDD HHmm'});

