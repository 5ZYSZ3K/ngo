const x = async function getCurrentTabUrl () {
    const tabs = await chrome.tabs.query({ active: true })
    return tabs[0].url
  }

x().then((result) => {
     const url =  new URL(result.toString()).searchParams;
     const param = url.get('q');

     const paramList = document.getElementById('param-list');
        const li = document.createElement('li'); 
        li.textContent = param.toString();                 
        paramList.appendChild(li);     
    fetch(`http://localhost:3000/api/trpc/foundationRequests.matchPrompt?batch=1&input=${encodeURIComponent(`{"0":{"json":{"text":"${param}"}}}`)}`).then(( x ) => console.log(x))
});

