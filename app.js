import bar from './bar';
import Vue from 'vue';
import AV from 'leancloud-storage'
import './page.css'
// bar();
/*
 * @前端使用 LeanCloud JavaScript SDK
 * @在页面加载的时候调用一下初始化的函数 
 * @https://leancloud.cn/docs/sdk_setup-js.html#初始化
 */
var APP_ID = 'oaXyyBa5kIwqVMIOtqgHdNO5-gzGzoHsz';
var APP_KEY = 'w2G7z7u0A4ltDvBYfx8vn9fW';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
// ----------------------------------------------------------------------
/**
 * @验证 LeanCloud SDK 安装成功
 * @https://leancloud.cn/docs/sdk_setup-js.html#验证
 * @验证成功后注释掉
 */
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//         words: 'Hello World!'
//     }).then(function(object) {
//         alert('LeanCloud Rocks!');
//     })
// ----------------------------------------------------------------------

/*
 * @Vue实例
 */
let app = new Vue({
    el: '#app',
    data: {
        message: 'Vue',
        newTodo: '',
        todoList: [],
        activeType: 'login',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null // AV.User.current() 可以获取当前登录的用户
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
        },
        login() { //登录
            AV.User.logIn(this.formData.username, this.formData.password)
                .then(
                    (loginedUser) => {
                        console.log(loginedUser)
                        this.currentUser = this.getCurrentUser()
                    },
                    (error) => alert('登录失败'));
        },
        signUp() { //注册
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then(
                (loginedUser) => {
                    console.log(loginedUser)
                    this.currentUser = this.getCurrentUser()
                },
                (error) => alert('注册失败'));
        },
        getCurrentUser() { //获取当前用户数据
            let current = AV.User.current()
            if (current) {
                let { id, createdAt, attributes: username } = current
                this.message = username.username
                return { id, createdAt, username }
            } else {
                return null
            }
        },
        logout() { //登出
            AV.User.logOut()
            this.currentUser = null
            this.message = 'Vue'
            window.location.reload()
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
        this.currentUser = this.getCurrentUser()
            // setInterval(() => console.log(this.newTodo), 1000)
    }
})