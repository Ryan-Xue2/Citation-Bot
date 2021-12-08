let referenceList = document.querySelector('#reference-list');
let citationFormat = '';

function abbreviateMonth(month) {
    switch(month) {
        case 1: return 'Jan.';
        case 2: return 'Feb.';
        case 3: return 'Mar.';
        case 4: return 'Apr.';
        case 5: return 'May';
        case 6: return 'June';
        case 7: return 'July';
        case 8: return 'Aug.';
        case 9: return 'Sept.';
        case 10: return 'Oct.';
        case 11: return 'Nov.';
        case 12: return 'Dec.';
        default: break;
    }
}
function mla(item) {
    let citation = '';
    // Authors
    citation += 'last name, first name.';
    
    // Article Title
    citation += `"${item['title']}."`;

    // Website title
    citation += `<i>${item['websiteTitle']}</i>, `;

    // Publishing information
    citation += `${item['publisher']}, `
    citation += `${item['pubDay']} `
    citation += abbreviateMonth(item['month']);
    citation += ' ';
    citation += item['pubYear'];

    // URL (remove the https:// part later)
    citation += item['url'] + '.';
    
    // Date accessed
    citation += ' ' + item['dayAccessed'];
    citation += ' ' + abbreviateMonth(item['monthAccessed']);
    citation += ' ' + item['yearAccessed'];
    return citation;
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
    navigator.clipboard.writeText('');
})

// Write sources to reference list in selected format
chrome.storage.sync.get(null, function(items) {
    let urls = Object.keys(items);
    for (let i = 0; i < urls.length; i++) {
        referenceList.innerHTML += `<input type="checkbox" name="${urls[i]}"><label for="${urls[i]}">${mla(items[urls[i]])}</label>`;
    }
})