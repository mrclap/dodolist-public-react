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
    };
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

  // getCSRFToken() {
  //   return Cookies.get('csrftoken');
  // }

  // toggleComplete() {
  //   let _completed = this.state.completed ? 0 : 1
  //   this.ajaxUpdateCompleted(_completed)
  //   this.setState({completed:_completed})
  // }
 
  handler() {
    this.props.completeHandler(this.state.id)
  }
  
  render() {
    return (
        <div className="todo media text-muted pt-3">
            <input type="hidden" value={this.state.id}/>
            <button className="btn btn-link" onClick={this.handler.bind(this)}>
                <i className="material-icons mr-2 btn-checkbox"
                    style={{fontSize:'32px', color:'black'}}>
                    {this.getTodoFonticon(this.state.completed)}
                </i>
            </button>
            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong className="d-block text-gray-dark">{this.state.title}</strong>
                {this.state.detail}
            <span className="due-date d-block text-primary">{this.state.dueDate}</span>
            </p>
        </div>
    );
  }
}

// export default TodoComponent;

// find div#like_button_container and put THIS component
// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(TodoComponent), domContainer);