let urlList = document.querySelector('#url-list');

// If the user clicks the clear button, remove all the sources from the reference list
let clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', function() {
    if (confirm('Clear Reference List?')) {
        chrome.storage.sync.clear();
        urlList.innerHTML = '';
    }
})

let copyButton = document.querySelector('#copy-button');
copyButton.addEventListener('click', function() {
    navigator.clipboard.writeText('placeholder');
})

chrome.storage.sync.get(null, function(items) {
    let urls = Object.keys(items);
    for (let i = 0; i < urls.length; i++) {
        urlList.innerHTML += `<li>${urls[i]}</li>`;
    }
})