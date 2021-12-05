// If the user clicks the clear button, remove all the sources from the reference list
let clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', function() {
    chrome.storage.sync.clear();
    alert('Cleared');
})