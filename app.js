import bar from './bar';
import Vue from 'vue';
bar();

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue'
    }
})