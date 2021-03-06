// Autofill website title as well as todays date
let websiteTitle = document.querySelector('#website-title');
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    websiteTitle.value = tabs[0].title;
})

let dateAccessed = document.querySelector('#date-accessed');
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
dateAccessed.value = `${yyyy}-${mm}-${dd}`;

function citeCurrentTab() {
    // Cite current tab and store source info in storage
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let url = tabs[0].url.split('#:~:text=')[0];  // #:~:text= is a special highlighting feature in Chrome

        const authors = [];
        let fnames = document.getElementsByName('fname');
        let lnames = document.getElementsByName('lname');
        for (let i = 0; i < fnames.length; i++) {
            authors.push({'fname': fnames[i].value.trim(), 'lname': lnames[i].value.trim()});
        }

        let title = document.querySelector('#article-title');
        let publisher = document.querySelector('#publisher');
        let [pubYear, pubMonth, pubDay] = document.querySelector('#pub-date').value.split('-');
        let [yearAccessed, monthAccessed, dayAccessed] = dateAccessed.value.split('-');
        
        const sourceInfo = {
            'url': url,
            'authors': authors,
            'title': title.value.trim(),
            'websiteTitle': websiteTitle.value.trim(),
            'publisher': publisher.value.trim(),
            'pubDay': pubDay,
            'pubMonth': pubMonth,
            'pubYear': pubYear,
            'dayAccessed': dayAccessed,
            'monthAccessed': monthAccessed,
            'yearAccessed': yearAccessed
        };

        chrome.storage.sync.set({[url]: sourceInfo});
    })
}

// Cite current tab once button clicked
let citeButton = document.querySelector('#cite-button');
citeButton.addEventListener('click', citeCurrentTab);

// Add author once button clicked
let authorBlock = document.querySelector('#authors');
let addAuthorButton = document.querySelector('#add-author');

addAuthorButton.addEventListener('click', function() {
    let fnameInput = document.createElement('INPUT');
    let lnameInput = document.createElement('INPUT');

    fnameInput.placeholder = 'First name';
    fnameInput.name = 'fname';

    lnameInput.placeholder = 'Last name';
    lnameInput.name = 'lname';

    authorBlock.appendChild(fnameInput);
    authorBlock.appendChild(lnameInput);
});

// Remove author when button clicked
let removeAuthorButton = document.querySelector('#remove-author');
removeAuthorButton.addEventListener('click', function() {
    let nodes1 = document.getElementsByName('fname');
    let nodes2 = document.getElementsByName('lname');

    if (nodes1.length > 1) {
        let idx = nodes1.length - 1;
        nodes1[idx].remove();
        nodes2[idx].remove();
    }
})