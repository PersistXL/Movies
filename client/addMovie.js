window.onload = function () {
    let addButton = document.getElementById("addButton");
    const form = document.getElementById("addMovie");
    addButton.addEventListener('click', e => {
        e.preventDefault();//preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）。
        const movieData = getMovieData("addMovie");
        console.log(movieData)

       axios.post('http://localhost:3000/movies', movieData)
            .then(function (response) {
                if (response.data) {
                    alert("添加成功！");
                    form.reset(); //reset() 方法可把表单中的元素重置为它们的默认值。
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, false);
}

function getMovieData(formId) {
    const form = document.getElementById(formId);
    let tagElements = form.getElementsByTagName('input');
    let movieData = {};
    for (let item of tagElements) {
        movieData[item.name] = item.value;
    }
    return movieData;
  
}