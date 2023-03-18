declare const GM : any;
declare function GM_xmlhttpRequest(details: any) : any;

// TODO install GM types, replace ANY with proper types

const gmv4Request = function (url : string) : Promise<Document> {
  return new Promise(function (resolve, reject) {
    GM.xmlhttpRequest({
      method: "GET",
      url: url,
      responseType: "document",
      onload: (xhr : any) => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      },
      onerror: (xhr : any) => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      },
    });
  });
};

const gmv3Request = function (url : string) : Promise<Document> {
  return new Promise(function (resolve, reject) {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: (xhr : any) => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let parser = new DOMParser();
          let html = parser.parseFromString(xhr.response, "text/html");

          resolve(html);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      },
      onerror: (xhr : any) => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      },
    });
  });
};

const xhrRequest = function (url : string) : Promise<Document> {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "document";
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
};

const htmlRequest = function (url : string) : Promise<Document> {
  try {
    return gmv4Request(url);
  } catch {
    try {
      return gmv3Request(url);
    } catch {
      return xhrRequest(url);
    }
  }
};

export default htmlRequest;
