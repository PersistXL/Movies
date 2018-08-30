window.onload = function () {
    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            let movies = response.data, str = ` `;
            movies.forEach(movie => {
                str += `
                <li class="movieBox">
                <i class="delMovie" data-MovieId="${movie.id}" >x</i>
                  <div class="mPost">
                     <img src="${movie.post}">
                  </div>
                  <div class="mTitle">${movie.title}</div>
                  <div class="mScore">${movie.score} 分</div>
                </li>
                `
            });
            let moviesRow = document.getElementById("moviesRow");
            moviesRow.innerHTML += str;
        })
        .catch(function (error) {
            console.log(error);
        });
}

document.addEventListener('click', handleDeleteMovieClick, false);  //事件代理的方法来绑定click事件, handleDeleteMovieClick 指定要事件触发时执行的函数,false 事件句柄在冒泡阶段执行
function handleDeleteMovieClick(e){
    let movieId = e.target.getAttribute("data-MovieId"); //getAttribute() 方法通过名称获取属性的值。data-MovieId 你想获取的属性值。
    if(movieId){
        let confirmDel = confirm("确认删除？");//confirm(message)   message 要在 window 上弹出的对话框中显示的纯文本
        if(confirmDel){
        deleteMovieById(movieId)
        }
        else return;
    }else return;
}

function deleteMovieById(movieId){  //删除操作
    axios.delete(` http://localhost:3000/movies/${movieId}`)
    .then(function(response){
        if(response.status===404){
            console.log("删除成功!")
        }
    })
    .catch(function(error){
        console.log(error);
    })
}
// window.onload = function () {
// const homepage = {
//     init() {
//         axios.defaults.baseURL = 'http://localhost:3000';
//         homepage.fun.render();
//         document.addEventListener('click', homepage.fun.handleDeleteMovieClick, false);
//     },
//     fun: {
//         render() {
//         },
//         handleDeleteMovieClick(e) {
//         },
//         deleteMovieById(movieId) {
//         }
//     }
// }
// homepage.init();
// }