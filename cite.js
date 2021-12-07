function citeCurrentTab() {
    // Cite current tab and add to the reference list
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let url = tabs[0].url;
        let authors = null;
        let title = null;
        let pubDate = null;
        let publisher = null;
        let dateAccesed = null;

        let sourceInfo = {
            'url': url,
            'authors': [{fname: null, mname: null, lname: null}],
            'title': null,
            'websiteTitle': null,
            'pubDate': null,
            'publisher': null,
            'dateAccessed': null
        };

        chrome.storage.sync.set({[url]: sourceInfo});
        console.log(`Added ${url} to reference list`);
    })
}

function addAuthor() {
    let node = document.querySelector('#authors');
    node.innerHTML += ''
}

let citeButton = document.querySelector('#cite-button');
citeButton.addEventListener('click', citeCurrentTab);

let addAuthorButton = document.querySelector('#add-author');
addAuthorButton.addEventListener('click', addAuthor);
