// Membuat Component
Vue.component('post-card', {
    props: ['post'],
    template: '<div class="col-md-6 col-lg-4 mb-4 d-flex">'+
                    '<div class="card card-shadow">' +
                        '<a :href="post.link">' +
                        '<img class="card-img-top" :src="post.pagemap.cse_image[0].src"/>'+
                        '</a>'+
                        '<div class="card-body">'+
                            '<h5 class="card-title">'+
                                '<a class="text-dark" :href="post.link">{{ post.title }}</a>' +
                            '</h5>' +
                        '</div>' +
                    '</div>' +
                '</div>'
})

// Membuat Router
var router = new VueRouter({
    mode: 'history',
    routes: []
});

// Aplikasi Fitur Pencarian
var app = new Vue({
    router,
    el: '#search-app',
    data: {
        q: "",
        searchResult: ""
    },
    watch: {
        q: function () {
            // console.log(this.q);
            this.debouncedDoSearch()
        }
    },
    created: function () {
        // _.debounce is a function provided by lodash to limit how
        // often a particularly expensive operation can be run.
        // In this case, we want to limit how often we access
        // yesno.wtf/api, waiting until the user has completely
        // finished typing before making the ajax request. To learn
        // more about the _.debounce function (and its cousin
        // _.throttle), visit: https://lodash.com/docs#debounce
        this.debouncedDoSearch = _.debounce(this.doSearch, 500);
        this.q = this.$route.query.q;
        // console.log(this.q);
    },
    methods: {
        doSearch: function(){
            var app = this;

            if (this.q != undefined && this.q !== "") {
                axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyBZaZVDBD64NC2OJ2TWBuZM5hkeZr2HyK0&cx=661cc1d614ba95d87&q=' + this.q)
                    .then(function (response) {
                        app.searchResult = response.data;
                        console.log(app.searchResult);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        }
            //console.log(this.q);
    }
});