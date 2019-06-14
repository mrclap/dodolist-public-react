'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var TodoList = function (_React$Component) {
    _inherits(TodoList, _React$Component);

    function TodoList(props) {
        _classCallCheck(this, TodoList);

        var _this = _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));

        _this.state = {
            todoList: [{
                "id": 1,
                "user": 1,
                "category": 1,
                "title": "여수 여행가기",
                "detail": "7월 정도??",
                "due_date": "2019-07-01T10:30:00Z",
                "priority": 4,
                "completed": 1,
                "cdate": null,
                "udate": "2019-05-20T06:20:56Z"
            }, {
                "id": 2,
                "user": 1,
                "category": 1,
                "title": "에어컨 청소하기",
                "detail": "업체 정보 찾아보기.",
                "due_date": "2019-05-16T01:30:00Z",
                "priority": 2,
                "completed": 0,
                "cdate": null,
                "udate": "2019-05-20T06:21:52Z"
            }, {
                "id": 3,
                "user": 1,
                "category": 1,
                "title": "책 3권 읽기!",
                "detail": "노인과 바다, 넛지, 자바의정석",
                "due_date": "2019-05-25T06:54:00Z",
                "priority": 0,
                "completed": 0,
                "cdate": null,
                "udate": "2019-05-20T06:21:47Z"
            }, {
                "id": 4,
                "user": 1,
                "category": 1,
                "title": "공과금 납부",
                "detail": "전기, 수도, 인터넷 등",
                "due_date": "2019-06-21T10:30:00Z",
                "priority": 4,
                "completed": 1,
                "cdate": null,
                "udate": "2019-05-20T06:20:57Z"
            }, {
                "id": 44,
                "user": 1,
                "category": 1,
                "title": "다이소에서 장보기",
                "detail": "장보기!",
                "due_date": "2019-05-21T05:44:00Z",
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-19T17:44:32Z",
                "udate": "2019-05-20T06:21:48Z"
            }, {
                "id": 45,
                "user": 1,
                "category": 1,
                "title": "이마트 맥주 5캔 사기!!!",
                "detail": "아사히, 삿포로, 하이네켄, 버드와이져, 키린",
                "due_date": "2019-05-19T06:50:00Z",
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-19T21:51:08Z",
                "udate": "2019-05-20T06:20:47Z"
            }, {
                "id": 46,
                "user": 1,
                "category": 1,
                "title": "점심에 은행 다녀오기",
                "detail": null,
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-19T22:03:55Z",
                "udate": "2019-05-20T06:20:57Z"
            }, {
                "id": 47,
                "user": 1,
                "category": 1,
                "title": "도서관 책 반납하기",
                "detail": null,
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-19T22:04:09Z",
                "udate": "2019-05-19T22:21:04Z"
            }, {
                "id": 48,
                "user": 1,
                "category": 1,
                "title": "냉장고 음식들 유통기한 체크하기",
                "detail": null,
                "due_date": "2019-05-21T07:06:00Z",
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-19T22:06:31Z",
                "udate": "2019-05-20T09:52:26Z"
            }, {
                "id": 49,
                "user": 1,
                "category": 1,
                "title": "전주 여행",
                "detail": null,
                "due_date": "2019-05-20T10:18:00Z",
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-19T22:10:02Z",
                "udate": "2019-05-20T06:20:58Z"
            }, {
                "id": 50,
                "user": 1,
                "category": 1,
                "title": "화장실 청소용품 구매",
                "detail": null,
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-19T22:11:04Z",
                "udate": "2019-05-20T06:20:58Z"
            }, {
                "id": 51,
                "user": 1,
                "category": 1,
                "title": "베스킨라빈스 맛잇는 아이스크림 먹기",
                "detail": null,
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-19T22:11:18Z",
                "udate": "2019-05-20T06:20:57Z"
            }, {
                "id": 52,
                "user": 1,
                "category": 1,
                "title": "치킨 맛집 찾아보기",
                "detail": "치킨맛집!!!",
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-19T22:24:52Z",
                "udate": "2019-05-20T06:20:58Z"
            }, {
                "id": 53,
                "user": 1,
                "category": 1,
                "title": "떡볶이 레시피 공부하기",
                "detail": null,
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-19T22:35:29Z",
                "udate": "2019-05-20T06:20:45Z"
            }, {
                "id": 54,
                "user": 1,
                "category": 1,
                "title": "마우스로 간단히 끌어 우선순위를 변경할 수 있습니다",
                "detail": null,
                "due_date": null,
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-19T23:08:27Z",
                "udate": "2019-05-20T06:21:40Z"
            }, {
                "id": 55,
                "user": 1,
                "category": 1,
                "title": "간단한 todo의 경우 상세내용을 입력할 필요없이 제목만 입력하고 [엔터]를 입력하세요",
                "detail": "test",
                "due_date": null,
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-19T23:08:55Z",
                "udate": "2019-05-27T11:26:14Z"
            }, {
                "id": 56,
                "user": 1,
                "category": 1,
                "title": "곧 바로 todo리스트에 등록됩니다",
                "detail": null,
                "due_date": null,
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-19T23:09:06Z",
                "udate": "2019-05-20T06:21:31Z"
            }, {
                "id": 57,
                "user": 1,
                "category": 1,
                "title": "수정/삭제를 원한다면 해당 todo를 클릭하세요",
                "detail": null,
                "due_date": "2020-01-01T10:10:00Z",
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-19T23:09:24Z",
                "udate": "2019-05-20T06:21:36Z"
            }, {
                "id": 58,
                "user": 1,
                "category": 1,
                "title": "정해놓은 기한을 지나게되면 시간이 빨간색으로 표시됩니다.",
                "detail": null,
                "due_date": "2019-05-20T07:10:00Z",
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-19T23:10:17Z",
                "udate": "2019-05-20T10:10:09Z"
            }, {
                "id": 59,
                "user": 1,
                "category": 1,
                "title": "-------------------------------------------------------------------",
                "detail": null,
                "due_date": null,
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-19T23:10:46Z",
                "udate": "2019-05-20T06:21:46Z"
            }, {
                "id": 61,
                "user": 1,
                "category": 1,
                "title": "맥주 한 잔 하기!!!",
                "detail": "한 잔 두 잔 비워가는 술잔",
                "due_date": "2019-05-20T12:50:00Z",
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-20T05:59:21Z",
                "udate": "2019-05-20T05:59:30Z"
            }, {
                "id": 62,
                "user": 1,
                "category": 1,
                "title": "채점",
                "detail": "11",
                "due_date": "2019-05-22T10:58:00Z",
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-20T13:58:47Z",
                "udate": "2019-05-20T13:58:47Z"
            }, {
                "id": 63,
                "user": 1,
                "category": 1,
                "title": "마감",
                "detail": null,
                "due_date": "2019-05-09T10:58:00Z",
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-20T13:59:02Z",
                "udate": "2019-05-20T13:59:02Z"
            }, {
                "id": 64,
                "user": 1,
                "category": 1,
                "title": "1",
                "detail": "1",
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-27T11:33:39Z",
                "udate": "2019-05-27T11:33:46Z"
            }, {
                "id": 65,
                "user": 1,
                "category": 1,
                "title": "1",
                "detail": "1",
                "due_date": null,
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-27T13:05:54Z",
                "udate": "2019-05-27T13:05:54Z"
            }, {
                "id": 66,
                "user": 1,
                "category": 1,
                "title": "3",
                "detail": "3",
                "due_date": null,
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-28T04:45:42Z",
                "udate": "2019-05-28T04:45:42Z"
            }, {
                "id": 71,
                "user": 1,
                "category": 1,
                "title": "3",
                "detail": "3",
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-28T07:42:01Z",
                "udate": "2019-05-28T07:54:12Z"
            }, {
                "id": 72,
                "user": 1,
                "category": 1,
                "title": "5",
                "detail": "5",
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-28T07:42:19Z",
                "udate": "2019-05-28T07:54:11Z"
            }, {
                "id": 73,
                "user": 1,
                "category": 1,
                "title": "2",
                "detail": "2",
                "due_date": null,
                "priority": null,
                "completed": 1,
                "cdate": "2019-05-28T07:42:53Z",
                "udate": "2019-05-28T07:54:10Z"
            }, {
                "id": 74,
                "user": 13,
                "category": 4,
                "title": "2",
                "detail": "2",
                "due_date": null,
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-28T10:00:55Z",
                "udate": "2019-05-28T10:00:55Z"
            }, {
                "id": 75,
                "user": 13,
                "category": 4,
                "title": "3",
                "detail": "3",
                "due_date": null,
                "priority": null,
                "completed": 0,
                "cdate": "2019-05-28T10:01:06Z",
                "udate": "2019-05-28T10:01:11Z"
            }]
        };
        // this.state = { 
        //     todoList:props.todoList
        // };
        return _this;
    }

    //get todolist with api

    _createClass(TodoList, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.state.todoList.map(function (value, index) {
                    return React.createElement(TodoComponent, { key: index, props: value });
                })
            );
        }
    }]);

    return TodoList;
}(React.Component);

// find div#todo-create-container and put THIS component


var domContainer = document.querySelector('#todo-container');
ReactDOM.render(e(TodoList), domContainer);