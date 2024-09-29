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
    const responseList = document.querySelector('div#res');
    response[0].result.data.json.map((item) => {
      const div = document.createElement('div');
      div.style.border = '1px solid #ccc';
      div.style.padding = '10px';
      div.style.margin = '10px 0';
      div.style.borderRadius = '5px';
      div.style.backgroundColor = '#f9f9f9';

      const a = document.createElement('a');
      a.href = item.url;
      a.style.textDecoration = 'none';
      a.style.color = '#FF8A00';

      const h1 = document.createElement('h1');
      h1.appendChild(document.createTextNode("Apply Destiny"));
      h1.style.fontSize = '1.6em';
      h1.style.marginBottom = '5px';
      h1.style.color = '#FF8A00';

      const h2 = document.createElement('h2');
      h2.appendChild(document.createTextNode(item.foundation.name));
      h2.style.fontSize = '1.5em';
      h2.style.marginBottom = '5px';
      h2.style.color = '#0008C3';

      const h3 = document.createElement('h3');
      h3.appendChild(document.createTextNode(item.shortDescription));
      h3.style.fontSize = '1.2em';
      h3.style.marginBottom = '5px';
      h3.style.color = '#0008C3';

      const p = document.createElement('p');
      p.appendChild(document.createTextNode(item.description));
      p.style.fontSize = '1em';
      p.style.color = '#444';

      a.appendChild(h1);
      a.appendChild(h2);
      a.appendChild(h3);
      a.appendChild(p);
      div.appendChild(a);
      responseList.prepend(div);
    });
  });
});
