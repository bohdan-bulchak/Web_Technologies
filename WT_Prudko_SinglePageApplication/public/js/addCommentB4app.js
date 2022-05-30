export default class CommentHandler{

    constructor(newCommentFormId){

        this.newCommentFormId =newCommentFormId;

    }

    get back4appUrl(){
        return "https://parseapi.back4app.com/classes/opinions";
    }

    get back4appHeaders(){
        return {
            "X-Parse-Application-Id": "EvpzibmuzAWElDQHsg8X65Umbf7Xg1LaSTgxLwgS",
            "X-Parse-REST-API-Key": "gK0plNKAP9QkYLI916cbmvwdObE5856uLlyqAtI7"
        };
    }

    processCommentFrmData(event){
        event.preventDefault();

        const formElements = document.getElementById(this.newCommentFormId).elements;

        const newComment =
            {
                name: formElements['nameElm'].value.trim(),

                typeRadio1: formElements['radio1'].checked,
                typeRadio2: formElements['radio2'].checked,
                typeRadio3: formElements['radio3'].checked,

                status: formElements['statuses'].value.trim(),
                email: formElements['email'].value.trim(),
                phone: formElements['phone'].value.trim(),

                contactRadio1: formElements['radioc1'].checked,
                contactRadio2: formElements['radioc2'].checked,
                contactRadio3: formElements['radioc3'].checked,

                image: formElements['image'].value.trim(),

                test1: formElements['test1'].checked,
                test2: formElements['test2'].checked,
                test3: formElements['test3'].checked,
                test4: formElements['test4'].checked,


                comment: formElements['comment'].value.trim()
            };

        if(newComment.name=="" || newComment.comment==""){
            window.alert("Please, enter both your name and opinion");
            return;
        }

        console.log(newComment);

        const reqHeaders=this.back4appHeaders;
        reqHeaders["Content-Type"]="application/json";


        const init={
            headers: reqHeaders,
            method: 'POST',
            body: JSON.stringify(newComment)
        }

        console.log(init);

        fetch(window.comHandler.back4appUrl,init)
            .then(response =>{      //fetch promise fullfilled (operation completed successfully)
                if(response.ok){    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                    return response.json(); //we return a new promise with  the response data in JSON to be processed
                }else{ //if we get server error
                    return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
                }
            })
            .then(responseJSON => { //here we process the returned response data in JSON ...
                console.log(`Opinion added at ${responseJSON.createdAt} with id=${responseJSON.objectId}. `);
                window.alert('Your opinion has been saved');
                window.location.hash="#opinions";
            })
            .catch (error => { ////here we process all the failed promises
                window.alert(`Failed to save your opinion: ${error}`);
            });
    }


}






