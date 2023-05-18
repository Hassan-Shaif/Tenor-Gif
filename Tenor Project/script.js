const tenorApi =$('#randomSearch');
const mainContent=$('#main-content');
const searchInput = $('#searchInput')
const submit = $('#searchBtn')


function fetchAPI(apiURL){
    return new Promise((resolve, reject)=>{
        let http =new XMLHttpRequest();
        http.open('get',apiURL);
        http.responseType = 'json';
        http.onreadystatechange= function(){
            if(http.readyState ===4 && http.status ===200){
            resolve(http.response)
            }else if (http.status ===400 || http.status ===500){
                reject(http.response)

            }

        }
        http.send();
    })

}


tenorApi.click(function(){
    mainContent.empty();
    fetchAPI("https://api.tenor.com/v1/search?q=happy&key=LIVDSRZULELA&limit=10000")
    .then(tenors => {
       let tenor =tenors.results;
           tenor.forEach(gif =>{
               let gifMedia = gif.media
               gifMedia.forEach(url =>{
                   let gifUrl =$(`
                        <div class="card" style="width: 15rem;">
                            <img src=${url.gif.url} class="card-img-top" alt="...">
                        </div>
                         `)
                       gifUrl.appendTo(mainContent);
                       })
           })

    })
        .catch(err =>{
            console.error(err)
        })
})

//search for a specific tenor
function getTenor(tenorName){
     fetchAPI(`https://api.tenor.com/v1/search?q=${tenorName}&key=LIVDSRZULELA&limit=100`)
         .then(tenors => {
       let tenor =tenors.results;
           tenor.forEach(gif =>{
                let gifMedia = gif.media
                gifMedia.forEach(url =>{
                     let gifUrl =$(`
                        <div class="card" style="width: 15rem;">
                            <img src=${url.gif.url} class="card-img-top" alt="...">
                        </div>
                         `)
                       gifUrl.appendTo(mainContent);
                })
           })

       })
        .catch(err =>{
            console.error(err)
        })

}
//search for a specific tenor
submit.click( ()=>{
    mainContent.empty();
    let searchVal = searchInput.val();
    getTenor(searchVal);
})



