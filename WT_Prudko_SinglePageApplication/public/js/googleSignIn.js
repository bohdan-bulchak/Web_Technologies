let auth2 = {};
let signed = false;

/*function renderUserInfo(googleUser, htmlElmId) {
   const profile = googleUser.getBasicProfile();
    const htmlStringSk=
        `
            <p>Používateľ prihlásený</p>
            <ul>
                <li> ID: ${profile.getId()}
                <li>  Plné meno: ${profile.getName()}
                <li>  Krstné  meno: ${profile.getGivenName()}
                <li>  Priezvisko: ${profile.getFamilyName()}
                <li>  URL obrázka: ${profile.getImageUrl()}
                <li>  Email: ${profile.getEmail()}
            </ul>
        `;
    const htmlStringEn=
        `
            <p>User logged in.</p>
            <ul>
                <li> ID: ${profile.getId()}
                <li>  Full name: ${profile.getName()}
                <li>  Given name: ${profile.getGivenName()}
                <li>  Family name: ${profile.getFamilyName()}
                <li>  Image URL: ${profile.getImageUrl()}
                <li>  Email: ${profile.getEmail()}
            </ul>
        `;
    //Id z profile.getId() sa nema pouzivat na komunikaciu s vlastnym serverom (you should not use the id from profile.getId() for communication with your server)
    document.getElementById(htmlElmId).innerHTML=htmlStringSk+htmlStringEn;
}

function renderLogOutInfo(htmlElmId) {
    const htmlString=
        `
                <p>Používateľ nie je prihlásený</p>
                <p>User not signed in</p>
                `;
    document.getElementById(htmlElmId).innerHTML=htmlString;
}*/

function signOut() {
        auth2.signOut();
        signed = false;
        console.log('signed:'+ signed);
}

function userChanged(user){  //pre hlasku v nav (You are signed as "userName")
    document.getElementById("userName").innerHTML=user.getBasicProfile().getName();

    /*const userInfoElm = document.getElementById("userStatus");
   // const userNameInputElm = document.getElementById("author1");
   // const userNameInputElm1 = document.getElementById("nameElm");
   // const userNameInputElm2 = document.getElementById("author");
    if(userInfoElm ){// pre/for 82GoogleAccessBetter.html
        renderUserInfo(user,"userStatus");
    }/*else if (userNameInputElm){// pre 82GoogleAccessBetterAddArt.html
        userNameInputElm.value=user.getBasicProfile().getName();
    }else if (userNameInputElm1){// pre 82GoogleAccessBetterAddArt.html
        userNameInputElm1.value=user.getBasicProfile().getName();
    }else if (userNameInputElm2){// pre 82GoogleAccessBetterAddArt.html
        userNameInputElm2.value=user.getBasicProfile().getName();
    }*/

}


function updateSignIn() {  //ci stale sme pripojeny alebo nie
    const sgnd = auth2.isSignedIn.get();  //vrati GoogleAuth true ked pouz je prihlaseny alebo GoogleAuth false ked nie
    if (sgnd) {
        document.getElementById("SignInButton").classList.add("hiddenElm");
        document.getElementById("SignedIn").classList.remove("hiddenElm");
        document.getElementById("userName").innerHTML=auth2.currentUser.get().getBasicProfile().getName();
    }else{
        document.getElementById("SignInButton").classList.remove("hiddenElm");
        document.getElementById("SignedIn").classList.add("hiddenElm");
    }

   // const userInfoElm = document.getElementById("userStatus");
    const userNameInputElm = document.getElementById("author1");
    const userNameInputElm1 = document.getElementById("nameElm");
    const userNameInputElm2 = document.getElementById("author");


   /* if(userInfoElm){// pre/for 82GoogleAccessBetter.html
        if (sgnd) {
            renderUserInfo(auth2.currentUser.get(),"userStatus");
        }else{
            renderLogOutInfo("userStatus");
        }
    }else*/
    if (userNameInputElm){// pre/for 82GoogleAccessBetterAddArt.html
        if (sgnd) {
            userNameInputElm.value=auth2.currentUser.get().getBasicProfile().getName();
        }else{
            userNameInputElm.value="";
        }
    }else if (userNameInputElm1){// pre/for 82GoogleAccessBetterAddArt.html
        if (sgnd) {
            userNameInputElm1.value=auth2.currentUser.get().getBasicProfile().getName();
        }else{
            userNameInputElm1.value="";
        }
    }else if (userNameInputElm2){// pre/for 82GoogleAccessBetterAddArt.html
        if (sgnd) {
            userNameInputElm2.value=auth2.currentUser.get().getBasicProfile().getName();
        }else{
            userNameInputElm2.value="";
        }
    }

}

function startGSingIn() {
    gapi.load('auth2', function() {
        gapi.signin2.render('SignInButton', {
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
        gapi.auth2.init().then( //zavolat po inicializacii OAuth 2.0  (called after OAuth 2.0 initialisation) //inicilizuje object GoogleAuth
            function (){
                console.log('init');
                auth2 = gapi.auth2.getAuthInstance();
                auth2.currentUser.listen(userChanged);
                auth2.isSignedIn.listen(updateSignIn);      //vrati true alebo false, ked pouzivatel prihlaseny alebo nie
                auth2.then(updateSignIn); //tiez po inicializacii (later after initialisation)  //po uplnoj inicilizacii

            });
    });

}

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    signed = true;
    console.log('signed:'+ signed);
}

function onFailure(error) {
    console.log(error);
}