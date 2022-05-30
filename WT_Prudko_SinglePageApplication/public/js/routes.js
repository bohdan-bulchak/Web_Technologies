import  Mustache from "./mustache.js";
import processComFrmData from "./addOpinion.js";
import articleFormsHandler from "./articleFormsHandler.js";
import processOpnFrmData from "./addCommentB4app.js";


//an array, defining the routes
export default[

    {
        //the part after '#' in the url (so-called fragment):
        hash:"welcome",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-welcome").innerHTML
    },

    {
        //the part after '#' in the url (so-called fragment):
        hash:"info",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-info").innerHTML
    },

    {
        //the part after '#' in the url (so-called fragment):
        hash:"puffcorn",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-puffcorn").innerHTML
    },

    {
        //the part after '#' in the url (so-called fragment):
        hash:"cereals",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-cereals").innerHTML
    },


    {
        hash:"articles",
        target:"router-view",
        getTemplate: fetchAndDisplayArticles,
    },

    {
        hash:"opinions",
        target:"router-view",
        getTemplate: createHtml4opinions,

    },

    {
        hash:"addComment",
        target:"router-view",
        getTemplate: (targetElm) =>{
            document.getElementById(targetElm).innerHTML = document.getElementById("template-addComment").innerHTML
            //document.getElementById("opnFrm").onsubmit=processOpnFrmData;
            if(signed) {
                document.getElementById("nameElm").value = auth2.currentUser.get().getBasicProfile().getName();
            }


        }
    },
    {
        hash:"article",
        target:"router-view",
        getTemplate: fetchAndDisplayArticleDetail
    },
    {
        hash:"artEdit",
        target:"router-view",
        getTemplate: editArticle
    },
    {
        hash:"artDelete",
        target:"router-view",
        getTemplate: deleteArticle
    },
    {
        hash:"addArticle",
        target:"router-view",
        getTemplate: (targetElm) =>{
            document.getElementById(targetElm).innerHTML = document.getElementById("template-addArticle").innerHTML;
            document.getElementById("articleForm1").onsubmit=addArticle;
            if(signed) {
                document.getElementById("author1").value = auth2.currentUser.get().getBasicProfile().getName();
            }
        }
    }

];

const urlBase = "http://wt.kpi.fei.tuke.sk/api";
const articlesPerPage = 10;


function createHtml4opinions(targetElmId){

    const init={
        headers: window.comHandler.back4appHeaders
    };


    fetch(window.comHandler.back4appUrl,init)
        .then(response =>{      //fetch promise fullfilled (operation completed successfully)
            if(response.ok){    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                return response.json(); //we return a new promise with  the response data in JSON to be processed
            }else{ //if we get server error
                return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
            }
        })
        .then(responseJSON => { //here we process the returned response data in JSON ...
            console.log(responseJSON);
            document.getElementById(targetElmId).innerHTML =
                Mustache.render(document.getElementById("template-opinions").innerHTML, responseJSON.results);
        })
        .catch (error => { ////here we process all the failed promises
            document.getElementById(targetElmId).innerHTML = error;
        });

   /* const opinionsFromStorage=localStorage.PrudkoComments;
    let comments=[];

    if(opinionsFromStorage){
        comments=JSON.parse(opinionsFromStorage);
        comments.forEach(comment => {
            comment.created = (new Date(comment.created)).toDateString();
             });
    }

    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-opinions").innerHTML,
        comments
    );*/

}

/*function fetchAndDisplayArticles(targetElm,current,totalCount){


    current=parseInt(current);
    totalCount=parseInt(totalCount);
    const data4rendering={
        currPage:current,
        pageCount:totalCount
    };


    if(current>1){
        data4rendering.prevPage=current-1;
    }

    if(current<totalCount){
        data4rendering.nextPage=current+1;
    }


     /*"https://wt.kpi.fei.tuke.sk/api/article?max=2";
    const url =  "https://wt.kpi.fei.tuke.sk/api/article";/*article/?max=20";

    const articlesElm = document.getElementById("router-view");
    const errorElm = document.getElementById("router-view");

    let articleList =[];


    fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{
                return Promise.reject(new Error(`Failed to access the list of articles. Server answered with ${response.status}: ${response.statusText}.`));

            }
        })
        .then(responseJSON => {
            articleList=responseJSON.articles;
            console.log(JSON.stringify(articleList));
            return Promise.resolve();
        })
        .then( ()=> {
            let contentRequests = articleList.map(
                article => fetch(`${url}/${article.id}`)
            );

            return Promise.all(contentRequests);
        })
        .then(responses =>{
            let failed="";
            for(let response of responses) {
                if(!response.ok) failed+=response.url+" ";
            }
            if(failed===""){
                return responses;
            }else{
                return Promise.reject(new Error(`Failed to access the content of the articles with urls ${failed}.`));
            }
        })
        .then(responses => Promise.all(responses.map(resp => resp.json())))
        .then(articles => {
            articles.forEach((article,index) =>{
                articleList[index].content=article.content;
            });
            console.log(JSON.stringify(articleList));
            return Promise.resolve();
        }).then( () => {
           renderArticles(articleList);
          //  renderArticles2();

        }).catch(error => errorHandler && errorHandler(error));


    function errorHandler(error) {
        errorElm.innerHTML=`Error reading data from the server. ${error}`; //write an error message to the page
    }

    function renderArticles(articles) {
        articlesElm.innerHTML=Mustache.render(document.getElementById("template-articles").innerHTML,articles);
        //write some of the response object content to the page using Mustache
    }

    function renderArticles2() {
        articlesElm.innerHTML=Mustache.render(document.getElementById("template-articles").innerHTML ,data4rendering); //write some of the response object content to the page using Mustache
    }





}*/

function fetchAndDisplayArticles(targetElm, offsetFromHash, totalCountFromHash){

    const offset=Number(offsetFromHash);
    const totalCount=Number(totalCountFromHash);
    let urlQuery = "";

    /* const currPage= Math.ceil(Number(offsetFromHash)/10) ;
     //const pageCount=Number(totalCountFromHash);
     const pageCount = 10;
     let urlQuery = "";

     offsetFromHash=parseInt(offsetFromHash);
     totalCountFromHash = parseInt(totalCountFromHash);
     const data4rendering={
         currPage: currPage,
         pageCount:totalCountFromHash
     };



     if(offsetFromHash>10){
         data4rendering.prevPage=offsetFromHash-10;
     }

     if(offsetFromHash<pageCount*9){
         data4rendering.nextPage=offsetFromHash+10;
     }
 */
    if (offset && totalCount){
        urlQuery=`?offset=${offset}&max=${articlesPerPage}`;
    }else{
        urlQuery=`?max=${articlesPerPage}`;
    }

    const url = `${urlBase}/article${urlQuery}`;

   /* if (currPage && pageCount){
        urlQuery=`?offset=${currPage}&max=${pageCount}`;
    }else{
        urlQuery=`?max=${pageCount}`;
    }

    const url = `${urlBase}/article${urlQuery}`;

    console.log(currPage);
    console.log(pageCount);
*/

    fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{ //if we get server error
                return Promise.reject(
                    new Error(`Server answered with ${response.status}: ${response.statusText}.`));
            }
        })
        .then(responseJSON => {
            addArtDetailLink2ResponseJson(responseJSON);
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles").innerHTML,
                    responseJSON
                );
        })
        .catch (error => { ////here we process all the failed promises
            const errMsgObj = {errMessage:error};
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML,
                    errMsgObj
                );
        });
    /*document.getElementById(targetElm).innerHTML =
        Mustache.render(
            document.getElementById("template-articles").innerHTML,
            data4rendering
        );*/
}


function addArtDetailLink2ResponseJson(responseJSON){

    responseJSON.articles = responseJSON.articles.map(
        article =>(
            {
                ...article,
                detailLink:`#article/${article.id}/${responseJSON.meta.offset}/${responseJSON.meta.totalCount}`

            }
        )
    );

}

function fetchAndDisplayArticleDetail(targetElm,artIdFromHash,offsetFromHash,totalCountFromHash) {
    fetchAndProcessArticle(...arguments,false);
}

/**
 * Gets an article record from a server and processes it to html according to
 * the value of the forEdit parameter. Assumes existence of the urlBase global variable
 * with the base of the server url (e.g. "https://wt.kpi.fei.tuke.sk/api"),
 * availability of the Mustache.render() function and Mustache templates )
 * with id="template-article" (if forEdit=false) and id="template-article-form" (if forEdit=true).
 * @param targetElm - id of the element to which the acquired article record
 *                    will be rendered using the corresponding template
 * @param artIdFromHash - id of the article to be acquired
 * @param offsetFromHash - current offset of the article list display to which the user should return
 * @param totalCountFromHash - total number of articles on the server
 * @param forEdit - if false, the function renders the article to HTML using
 *                            the template-article for display.
 *                  If true, it renders using template-article-form for editing.
 */
function fetchAndProcessArticle(targetElm,artIdFromHash,offsetFromHash,totalCountFromHash,forEdit,forDelete){
    const url = `${urlBase}/article/${artIdFromHash}`;

    fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{ //if we get server error
                return Promise.reject(
                    new Error(`Server answered with ${response.status}: ${response.statusText}.`));
            }
        })
        .then(responseJSON => {
            if(forEdit) {
                responseJSON.formTitle = "Article Edit";
                responseJSON.submitBtTitle = "Save article";
                responseJSON.backLink = `#article/${artIdFromHash}/${offsetFromHash}/${totalCountFromHash}`;

                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article-form").innerHTML,
                        responseJSON
                    );
                if (!window.artFrmHandler) {
                    window.artFrmHandler = new articleFormsHandler("https://wt.kpi.fei.tuke.sk/api");
                }

                window.artFrmHandler.assignFormAndArticle("articleForm", "hiddenElm", artIdFromHash, offsetFromHash, totalCountFromHash);

                if(signed) {
                    document.getElementById("author").value = auth2.currentUser.get().getBasicProfile().getName();
                }
            }else if(forDelete){


                const deleteReqSettings =
                    {
                        method: 'DELETE'
                    };

                fetch(url, deleteReqSettings)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else { //if we get server error
                            return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`));
                        }
                    })

                window.alert("An article was deleted.");
                window.location.hash = `#articles`;
            }else{

                responseJSON.backLink=`#articles/${offsetFromHash}/${totalCountFromHash}`;
                responseJSON.editLink=
                    `#artEdit/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}`;
                responseJSON.deleteLink=
                    `#artDelete/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}`;

                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article").innerHTML,
                        responseJSON
                    );
            }
        })
        .catch (error => { ////here we process all the failed promises
            const errMsgObj = {errMessage:error};
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML,
                    errMsgObj
                );
        });
}

function editArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash) {
    fetchAndProcessArticle(...arguments,true,false);
}

function deleteArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash) {
    fetchAndProcessArticle(...arguments,false,true);

}

function addArticle(event){

    event.preventDefault();

    const articleElm = document.getElementById("template-addOpinion");


    const newArtData = {
        title: document.getElementById("title1").value.trim(),
        content: document.getElementById("content1").value.trim(),
        author: document.getElementById("author1").value.trim(),
      //  imageLink: this.formElements.namedItem("imageLink1").value.trim()
    };

    if (!(newArtData.title && newArtData.content)) {
        window.alert("Please, enter article title and content");
        return;
    }

    if (!newArtData.author) {
        newArtData.author = "Anonymous";
    }

    if (!newArtData.imageLink) {
        delete newArtData.imageLink;
    }

    const postReqSettings =
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(newArtData)
        };

    const url1 = `${urlBase}/article`;

    fetch(url1, postReqSettings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`));
            }
        })
         .then(responseJSON => {
            console.log(responseJSON);
        })

    window.alert("An article was added");

    document.getElementById("articleForm1").reset();
    window.location.hash="#articles";
}

function assignFormAndArticle(formElementId, cssClass2hideElement,articleId,offset,totalCount){
    this.cssCl2hideElm  = cssClass2hideElement;
    const artForm=document.getElementById(formElementId);
    this.formElements=artForm.elements;

    this.formElements.namedItem('btShowFileUpload').onclick= ()=>this.showFileUpload();
    this.formElements.namedItem('btFileUpload').onclick= ()=>this.uploadImg();
    this.formElements.namedItem('btCancelFileUpload').onclick= ()=>this.cancelFileUpload();


    if(articleId>=0){ //article edit (update)
        artForm.onsubmit= (event)=>this.processArtEditFrmData(event);
        this.articleId = articleId;
        this.offset = offset;
        this.totalCount = totalCount;
    }else{

        //functionality for adding a new article can go here
    }

}

/**
 *Pridanie funkcionality pre kliknutie na tlacidlo "Nahraj obrázok / Upload image"
 * Adding functionality for the button "Nahraj obrázok / Upload image"
 */
function showFileUpload(event) {
    this.formElements.namedItem('fsetFileUpload').classList.remove( this.cssCl2hideElm);
    this.formElements.namedItem('btShowFileUpload').classList.add( this.cssCl2hideElm);
}

/**
 *Pridanie funkcionality pre kliknutie na tlacidlo "Zruš nahrávanie / Cancel uploading"
 *Adding functionality for the button "Zruš nahrávanie / Cancel uploading"
 */
function cancelFileUpload() {
    this.formElements.namedItem('fsetFileUpload').classList.add( this.cssCl2hideElm);
    this.formElements.namedItem('btShowFileUpload').classList.remove( this.cssCl2hideElm);
}

/**
 * uploads a new image to the server , closes the corresponding part of the form and adds the url of the image to the form.
 */
function uploadImg() {

    const files = this.formElements.namedItem("flElm").files;

    if (files.length > 0) {
        const imgLinkElement = this.formElements.namedItem("imageLink");
        const imgLinkElement1 = this.formElements.namedItem("imageLink1");
        const fieldsetElement = this.formElements.namedItem("fsetFileUpload");
        const btShowFileUploadElement = this.formElements.namedItem("btShowFileUpload");

        //1. Gather  the image file data

        let imgData = new FormData();     //obrazok su binarne udaje, preto FormData (pouzitelne aj pri upload-e viac suborov naraz)
                                          //and image is binary data, that's why we use FormData (it works for multiple file upload, too)
        imgData.append("file", files[0]); //beriem len prvy obrazok, ved prvok formulara by mal povolit len jeden
                                          //takes only the first file (image)

        //2. Set up the request


        const postReqSettings = //an object wih settings of the request
            {
                method: 'POST',
                body: imgData //FormData object, not JSON this time.
                //pozor:nezadavat content-type. potom to nepojde.
                //Beware: It doesn't work correctly if the content-type is set.
            };


        //3. Execute the request

        fetch(`${this.serverUrl}/fileUpload`, postReqSettings)  //now we need the second parameter, an object wih settings of the request.
            .then(response => {      //fetch promise fullfilled (operation completed successfully)
                if (response.ok) {    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                    return response.json(); //we return a new promise with the response data in JSON to be processed
                } else { //if we get server error
                    return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
                }
            })
            .then(responseJSON => { //here we process the returned response data in JSON ...
                imgLinkElement.value = responseJSON.fullFileUrl;
                imgLinkElement1.value = responseJSON.fullFileUrl;
                btShowFileUploadElement.classList.remove( this.cssCl2hideElm);
                fieldsetElement.classList.add( this.cssCl2hideElm);
            })
            .catch(error => { ////here we process all the failed promises
                window.alert(`Image uploading failed. ${error}.`);
            });
    } else {
        window.alert("Please, choose an image file.");
    }


}