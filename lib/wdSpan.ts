const getWdSpan = function (content : HTMLElement) : HTMLElement {
    const span = document.createElement('span');
    span.classList.add('wd-tekst-12');
    span.append(content);
  
    return span;
  }

const getElementFromString = function(value: string) : HTMLElement {
  const element = document.createElement('span');
  element.innerText = value;

  return element;
}

export default getWdSpan;
export {getElementFromString};