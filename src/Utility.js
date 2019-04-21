export const removeParentTagFromText = (DOMElements) => {
    while(DOMElements.length) {
        const parent = DOMElements[0].parentNode;
        while(DOMElements[0].firstChild) {
            parent.insertBefore(DOMElements[0].firstChild, DOMElements[0]);
        }
         parent.removeChild(DOMElements[0]);
    }
}

export const highlightRange = (range, bgColor, tagIndex, textIndex) => {
    const newNode = document.createElement('div');
    newNode.setAttribute(
       'style',
       `position: relative; background-color: ${bgColor || '#81d4fa'}; display: inline;`
    );
    newNode.setAttribute(
       'class',
       'highlight'
    );
    newNode.setAttribute(
       'title',
       'Click to remove highlight'
    );
    newNode.setAttribute(
       'data-tag-index',
       tagIndex
    );
    newNode.setAttribute(
       'data-text-index',
       textIndex
    );

    range.surroundContents(newNode);
}

export const getSafeRanges = (dangerous) => {
    var a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    var s = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a)
        for(var i = dangerous.startContainer; i != a; i = i.parentNode)
            s.push(i)
    ;
    if (0 < s.length) for(var i = 0; i < s.length; i++) {
        var xs = document.createRange();
        if (i) {
            xs.setStartAfter(s[i-1]);
            xs.setEndAfter(s[i].lastChild);
        }
        else {
            xs.setStart(s[i], dangerous.startOffset);
            xs.setEndAfter(
                (s[i].nodeType == Node.TEXT_NODE)
                ? s[i] : s[i].lastChild
            );
        }
        rs.push(xs);
    }

    // Ends -- basically the same code reversed
    var e = new Array(0), re = new Array(0);
    if (dangerous.endContainer != a)
        for(var i = dangerous.endContainer; i != a; i = i.parentNode)
            e.push(i)
    ;
    if (0 < e.length) for(var i = 0; i < e.length; i++) {
        var xe = document.createRange();
        if (i) {
            xe.setStartBefore(e[i].firstChild);
            xe.setEndBefore(e[i-1]);
        }
        else {
            xe.setStartBefore(
                (e[i].nodeType == Node.TEXT_NODE)
                ? e[i] : e[i].firstChild
            );
            xe.setEnd(e[i], dangerous.endOffset);
        }
        re.unshift(xe);
    }

    // Middle -- the uncaptured middle
    if ((0 < s.length) && (0 < e.length)) {
        var xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
    }
    else {
        return [dangerous];
    }

    // Concat
    rs.push(xm);
    const response = rs.concat(re);

    // Send to Console
    return response;
}
