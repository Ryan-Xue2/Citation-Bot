let referenceList = document.querySelector('#reference-list');

function abbreviateMonth(month) {
    switch(month) {
        case '01': return 'Jan.';
        case '02': return 'Feb.';
        case '03': return 'Mar.';
        case '04': return 'Apr.';
        case '05': return 'May';
        case '06': return 'June';
        case '07': return 'July';
        case '08': return 'Aug.';
        case '09': return 'Sept.';
        case '10': return 'Oct.';
        case '11': return 'Nov.';
        case '12': return 'Dec.';
        default: break;
    }
}

function mla(item) {
    let citation = '';

    // Authors
    let authorCount = 0;
    const authors = [];

    for (let i = 0; i < item['authors'].length; i++) {
        let fname = item['authors'][i]['fname'];
        let lname = item['authors'][i]['lname'];

        if (lname || fname) {
            authorCount++;
            if (authorCount == 1) {
                if (lname && fname) {
                    authors.push(`${lname}, ${fname}`);
                } else {
                    authors.push(lname ? lname : fname);
                }
            } else if (authorCount == 2) {
                if (lname && fname) {
                    authors.push(`${fname} ${lname}`);
                } else {
                    authors.push(lname ? lname : fname);
                }
            } else {
                break;
            }
        }
    }
    if (authorCount == 1) {
        citation += `${authors[0]}.`; 
    } else if (authorCount == 2) {
        citation += `${authors[0]} and ${authors[1]}.`;
    } else if (authorCount == 3) {
        citation += `${authors[0]}, et al.`;
    }
    
    // Article Title
    if (item['title']) {
        citation += ` "${item['title']}."`;
    }

    // Website title
    if (item['websiteTitle']) {
        citation += ` <i>${item['websiteTitle']}</i>`;
    }

    // Publishing information
    if (item['publisher']) {
        citation += `, ${item['publisher']}`;
    }
    if (item['pubDay'] || item['pubMonth'] || item['pubYear']) {
        if (item['pubDay']) { 
            citation += `, ${item['pubDay']}`;
        }
        if (item['pubMonth']) {
            citation += ` ${abbreviateMonth(item['pubMonth'])}`;
        }
        if (item['pubYear']) {
            citation += ` ${item['pubYear']}`;
        }
    }
    
    // URL (without https:// part)
    citation += `, ${item['url'].split('://')[1]}.`;
    
    // Date accessed
    if (item['dayAccessed'] || item['monthAccessed'] || item['yearAccessed']) {
        citation += ' Accessed';
        if (item['dayAccessed']) {
            citation += ` ${item['dayAccessed']}`;
        }
        if (item['monthAccessed']) {
            citation += ` ${abbreviateMonth(item['monthAccessed'])}`;
        }
        if (item['yearAccessed']) {
            citation += ` ${item['yearAccessed']}`;
        }
        citation += '.';
    }

    return citation.trimStart();
}

function apa(item) {
    return;
}

// If the user clicks the clear button, remove all selected sources from reference list
let clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', function() {
    if (confirm('Clear Reference List?')) {
        chrome.storage.sync.clear();
        referenceList.innerHTML = '';
    }
})

// Copy selected sources to clipboard
let copyButton = document.querySelector('#copy-button');
copyButton.addEventListener('click', function() {
    chrome.storage.sync.get(null, function(items) {
        let values = Object.values(items);
        let copiedText = '';
        for (let i = 0; i < values.length; i++) {
            copiedText += mla(values[i]);
            copiedText += '<br><br>';
        }
        const blob = new Blob([copiedText], {type: 'text/html'});
        const clipboardItem = new ClipboardItem({'text/html': blob});
        navigator.clipboard.write([clipboardItem]);
    })
})

// Write sources to reference list in selected format
chrome.storage.sync.get(null, function(items) {
    let values = Object.values(items);
    for (let i = 0; i < values.length; i++) {
        let listItem = document.createElement('LI');
        listItem.innerHTML = mla(values[i]);
        referenceList.appendChild(listItem);
    }
})