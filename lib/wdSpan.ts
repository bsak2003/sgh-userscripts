const getWdSpan = function (content) {
    const span = document.createElement('span');
    span.classList.add('wd-tekst-12');
    span.append(content);
  
    return span;
  }

export default getWdSpan;