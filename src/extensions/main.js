console.log('Hello from main.js');
const urlStr = window.location.href;
const params = new URL(urlStr).searchParams;
const param = params.get('q');
console.log(param);

fetch(
  `http://localhost:3000/api/trpc/foundationRequests.matchPrompt?batch=1&input=${encodeURIComponent(
    `{"0":{"json":{"text":"${param}"}}}`,
  )}`,
).then((x) => {
  x.json().then((response) => {
    console.log(response);
    const responseList = document.querySelector(
      'div[data-async-context="query:feaver"]',
    );
    response[0].result.data.json.map((item) => {
      const div = document.createElement('div');
      const a = document.createElement('a');
      a.href = item.url;
      const h1 = document.createElement('h1');
      h1.appendChild(document.createTextNode(item.foundation.name));
      const h2 = document.createElement('h2');
      h2.appendChild(document.createTextNode(item.shortDescription));
      const p = document.createElement('p');
      p.appendChild(document.createTextNode(item.description));
      a.appendChild(h1);
      a.appendChild(h2);
      a.appendChild(p);
      div.appendChild(a);
      responseList.prepend(div);
    });
    // response.forEach((element) => {
    //   const li = document.createElement('li');
    //   li.textContent = element;
    //   responseList.appendChild(li);
    // });
  });
});
