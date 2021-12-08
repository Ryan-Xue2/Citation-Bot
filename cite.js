// Autofill website title as well as todays date
let websiteTitle = document.querySelector('#website-title');
websiteTitle.value = 'placeholder';

let [dayAccessed, monthAccessed, yearAccessed] = document.getElementsByName('date-accessed');
let today = new Date();
dayAccessed.value = today.getDate();
monthAccessed.value = today.getMonth() + 1;
yearAccessed.value = today.getFullYear();

function citeCurrentTab() {
    // Cite current tab and store source info in storage
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let url = tabs[0].url;

        const authors = [];
        let fnames = document.getElementsByName('fname');
        let lnames = document.getElementsByName('lname');
        for (let i = 0; i < fnames.length; i++) {
            authors.push({fname: fnames[i], lname: lnames[i]});
        }

        let title = document.querySelector('#article-title');
        let publisher = document.querySelector('#publisher');
        let [pubDay, pubMonth, pubYear] = document.getElementsByName('pub-date');
        
        const sourceInfo = {
            'url': url,
            'authors': authors,
            'title': title.value,
            'websiteTitle': websiteTitle.value,
            'publisher': publisher.value,
            'pubDay': pubDay.value,
            'pubMonth': pubMonth.value,
            'pubYear': pubYear.value,
            'dayAccessed': dayAccessed.value,
            'monthAccessed': monthAccessed.value,
            'yearAccessed': yearAccessed.value
        };

        chrome.storage.sync.set({[url]: sourceInfo});
        console.log(`Added ${url} to reference list`);
    })
}

// Cite current tab once button clicked
let citeButton = document.querySelector('#cite-button');
citeButton.addEventListener('click', citeCurrentTab);

// Add author once button clicked
let authorBlock = document.querySelector('#authors');
let addAuthorButton = document.querySelector('#add-author');
addAuthorButton.addEventListener('click', function() {
    authorBlock.innerHTML += '<input type="text" name="fname" placeholder="First name"><br>\
                              <input type="text" name="lname" placeholder="Last name"><br>';
});

// Remove author when button clicked
let removeAuthorButton = document.querySelector('#remove-author');
removeAuthorButton.addEventListener('click', function() {
    let nodes1 = document.getElementsByName('fname');
    let nodes2 = document.getElementsByName('lname');
    let nodes3 = document.getElementsByName('newline');
    let idx = nodes1.length - 1;
    nodes1[idx].remove();
    nodes2[idx].remove();
    nodes3[idx].remove();
    nodes3[idx-1].remove();
})
