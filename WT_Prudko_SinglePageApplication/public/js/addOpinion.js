export default function processComFrmData(event){
    //1.prevent normal event (form sending) processing
    event.preventDefault();

    //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
    //const nopName = document.getElementById("nameElm").value.trim();
    //const nopName = auth2.currentUser.get().getBasicProfile().getName();
    //document.getElementById("nameElm").value=user.getBasicProfile().getName();
   // userChanged(user);
   // updateSignIn();
   // if(signed){
  //  const nopName = auth2.currentUser.get().getBasicProfile().getName();
   // }else{
    const nopName = document.getElementById("nameElm").value.trim();
   // }
    const nopStatus = document.getElementById("statusElm").value.trim();
    const nopEmail = document.getElementById("emailElm").value.trim();
    const nopPhone = document.getElementById("phoneElm").value.trim();
    const nopImage = document.getElementById("imgElm").value.trim();
    const nopComment = document.getElementById("commentElm").value.trim();

    const nopTest1 = document.getElementById("test1").checked;
    const nopTest2 = document.getElementById("test2").checked;
    const nopTest3 = document.getElementById("test3").checked;
    const nopTest4 = document.getElementById("test4").checked;

    const nopTypeRadio1 = document.getElementById("typeRadio1").checked;
    const nopTypeRadio2 = document.getElementById("typeRadio2").checked;
    const nopTypeRadio3 = document.getElementById("typeRadio3").checked;

    const nopContactRadio1 = document.getElementById("contactRadio1").checked;
    const nopContactRadio2 = document.getElementById("contactRadio2").checked;
    const nopContactRadio3 = document.getElementById("contactRadio3").checked;

    //3. Verify the data
    if(nopName == "" || nopComment == "" || nopEmail == ""){
        window.alert("Please, enter all of required fields(Name, Email and Comment)");
        return;
    }

    //3. Add the data to the array opinions and local storage
    const newComment =
        {
            name: nopName,

            typeRadio1: nopTypeRadio1,
            typeRadio2: nopTypeRadio2,
            typeRadio3: nopTypeRadio3,
            status: nopStatus,

            email: nopEmail,
            phone: nopPhone,

            contactRadio1: nopContactRadio1,
            contactRadio2: nopContactRadio2,
            contactRadio3: nopContactRadio3,

            image: nopImage,

            test1: nopTest1,
            test2: nopTest2,
            test3: nopTest3,
            test4: nopTest4,

            comment: nopComment,

            created: new Date()
        };


    let comments = [];

    if(localStorage.PrudkoComments){
        comments=JSON.parse(localStorage.PrudkoComments);
    }

    console.log("New comment: \n "+ JSON.stringify(newComment));

    comments.push(newComment);

    localStorage.PrudkoComments = JSON.stringify(comments);


    //5. Go to the opinions
    window.location.hash="#opinions";

}


