// If the user clicks the clear button, remove all the sources from the reference list
let clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', function() {
    if (confirm('Clear Reference List?')) {
        chrome.storage.sync.clear();
    }
})

let copyButton = document.querySelector('#copy-list');
copyButton.addEventListener('click', function() {
    navigator.clipboard.writeText('placeholder');
})