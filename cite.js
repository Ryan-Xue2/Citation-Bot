function citeCurrentTab() {
    // Cite current tab and add to the reference list
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let url = tabs[0].url;
        let authors = null;
        let title = null;
        let pubDate = null;
        let publisher = null;
        let dateAccesed = null;

        sourceInfo = {
            'url': url,
            'authors': [{fname: null, mname: null, lname: null}],
            'title': null,
            'websiteTitle': null,
            'pubDate': null,
            'publisher': null,
            'dateAccessed': null
        };
        chrome.storage.sync.set({url: sourceInfo});
        console.log(`Added ${url} to reference list`);
    })
}

function addAuthor() {
    let node = document.querySelector('#authors');
    node.innerHTML += '<hr><label for="fname">Author First Name: </label><input type="text" name="fname"><br><label for="mname">Author Middle Name: </label><input type="text" name="mname"><br><label for="fname">Author Last Name: </label><input type="text" name="fname"><br>'
}

let citeButton = document.querySelector('#cite-button');
citeButton.addEventListener('click', citeCurrentTab);

let addAuthorButton = document.querySelector('#add-author');
addAuthorButton.addEventListener('click', addAuthor);
