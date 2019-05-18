let endpoint = `http://localhost:3000/api/advancedAsync/stackoverflow/`;
let searchBar = document.querySelector('input');
let resultsArea = document.querySelector('.results');
let loadingEl = document.querySelector('.loader');
function displayResults(results) {
    resultsArea.innerHTML = '';
    let listEl = document.createElement('ul');
    results.forEach(question => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = question.link;
        a.innerHTML = question.title;
        li.appendChild(a);
        listEl.appendChild(li);
    });
    resultsArea.appendChild(listEl);
}
