import bar from './bar';
import Vue from 'vue';
import './page.css';
bar();

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue',
        newTodo: '',
        todoList: []
    },
    methods: {
        addTodo() {
            this.todoList.push({
                    title: this.newTodo,
                    createdAt: new Date(),
                    done: false
                })
                // console.log(this.todoList)
            this.newTodo = ''
        },
        removeTodo(todo) {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
        }
    },
    filters: {
        date(val) {
            let date = new Date(val)
            return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ''
        }
    },
    created: function() {
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList)
            let inputTodo = this.newTodo
            window.localStorage.setItem('myTodos', dataString)
            window.localStorage.setItem('textTodo', inputTodo)
        }
        let oldDataString = window.localStorage.getItem('myTodos')
        let dataData = JSON.parse(oldDataString)
        this.todoList = dataData || []
        this.newTodo = window.localStorage.getItem('textTodo') || ''
            // setInterval(() => console.log(this.newTodo), 1000)
    }
})