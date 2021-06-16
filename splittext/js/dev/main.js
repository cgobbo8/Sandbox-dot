const getFirstLine = el => {
    const text = el.innerHTML;

    //set the innerHTML to a character
    el.innerHTML = 'a';
    //get the offsetheight of the single character
    const singleLineHeight = el.offsetHeight;

    //split all innerHTML on spaces
    let arr = text.split(' ');

    //cur is the current value of the text we are testing to see if
    //it exceeds the singleLineHeight when set as innerHTML
    //prev is the previously tested string that did not exceed the singleLineHeight
    //cur and prev start as empty strings
    let cur = '';
    let prev = '';

    //loop through, up to array length
    for (let i = 0; i < arr.length; i++) {
        //examine the rest of text that is not already in previous string
        let restOfText = text.substring(prev.length, text.length);

        //the next space that is not at index 0
        const nextIndex =
            restOfText.indexOf(' ') === 0
                ? restOfText.substring(1, restOfText.length).indexOf(' ') + 1
                : restOfText.indexOf(' ');

        //the next part of the rest of the text
        cur += restOfText.substring(0, nextIndex);

        //set the innerHTML to the current text
        el.innerHTML = cur;

        //now we can check its offsetHeight
        if (el.offsetHeight > singleLineHeight) {
            //once offsetHeight of cur exceeds singleLineHeight
            //previous is the first line of text
            //set innerHTML = prev so
            el.innerHTML = prev;
            //we can grab the innertext
            let firstLine = el.innerText;
            let indexOfSecondLine = prev.lastIndexOf('<');

            //reset el
            el.innerHTML = text;

            return firstLine;
        }

        //offsetheight did not exceed singleLineHeight
        //so set previous = cur and loop again
        //prev = cur + ' ';
        prev += cur.substring(prev.length, cur.length);
    }
};





var $quote = document.getElementById("#quote")
console.log(getFirstLine(document.querySelector('#quote')))
/**
 * Prends un texte et spanifie
 * 
 * @param {String} selector Un selecteur CSS
 * @returns Un texte spanifié
 */
function spanifyText(selector) {
    const texts = Array.from(document.querySelectorAll(selector));

    if (texts.length === 0) {
        console.error("Impossible de trouver l'élément " + selector);
        return;
    }

    texts.forEach(text => spanify(text));

}

/**
 * Prend un HTMLElement et le renvoie avec des spans autour
 * 
 * @param {HTMLElement} word 
 * @returns le mot spanifié
 */
function wrapWord (word) {
    const div = document.createElement('div');
    div.classList.add('animated')
    div.style.display = 'inline-block';
    const div2 = document.createElement('div');
    div.appendChild(div2);
    div2.innerHTML = word;
    return div;
}

/**
 * Inject des elements entre des elements d'un tableau
 * @param {HTMLElement[]} arr Un tableau
 * @param {Node} element Element à injecter entre chaque Element du tableau
 * @returns 
 */
function injectElementBetweenItems(arr, element) {
    arr = arr
    .map( (item,i) => {
        if (i === arr.length - 1) {
            return [item];
        } else {
            return [item, element.cloneNode()];
        }
    })
    .reduce((acc, pair) => {
        acc = acc.concat(pair);
        return acc
    })
    return arr;
}

/**
 * Entoure chaque mot d'une <span> récursivement
 * 
 * @param {Node} element 
 */
function spanify(element) {
    const children = Array.from(element.childNodes);
    let elements = [];
    let spans = [];
    children.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            const words = child.textContent.split(' ');
            let spansWord = words.map(wrapWord);
            spans = spans.concat(spansWord);
            spansWord = injectElementBetweenItems(spansWord, document.createTextNode(' '));
            elements = elements.concat(spansWord);
        } else if (child.tagName === 'BR') {
            elements.push(child);
        } else {
            spans.concat(spanify(child));
            elements.push(child);
        }
    });

    element.innerHTML = ""
    elements.forEach(span => element.appendChild(span));
    return spans;
}

spanifyText('#quote')

gsap.from(".animated", {duration: .4, opacity : 0, y : 50, rotate : 10, color : 'blue', stagger: 0.2});




