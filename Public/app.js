console.log(M)
$("#showP").on('change', () => {
    if ($('#password').attr('type') === "password") {
        $('#password').attr('type', 'text');
    }
    else {
        $('#password').attr('type', 'password');
    }
})
$("#showGenP").on('change', () => {
    if ($('#genPassword').attr('type') === "password") {
        $('#genPassword').attr('type', 'text');
    }
    else {
        $('#genPassword').attr('type', 'password');
    }
});
//Create New App

$('#registerbtn').on('click', () => {
    $('.progress-container').fadeIn()
    $('#devEmail').removeClass('invalid');
    $('#appName').removeClass('invalid');
    $('#password').removeClass('invalid');
    $('#devEmail').addClass('valid');
    $('#appName').addClass('valid');
    $('#password').addClass('valid');

    const appName = $('#appName').val();
    const password = $('#password').val();
    const devEmail = $('#devEmail').val();
    //Authenticate
    let auth = true;
    if (appName === "") {
        $('#appName').addClass('invalid');
        auth = false;
        $('.progress-container').fadeOut()

    }
    if (password.length < 6) {
        $('#password').addClass('invalid');
        auth = false;
        $('.progress-container').fadeOut()

    }
    if (devEmail === "" || devEmail.indexOf('@') == -1) {
        $('#devEmail').addClass('invalid');
        auth = false;
        $('.progress-container').fadeOut()

    }
    if (!auth) {
        M.toast({ html: 'Invalid Credentials!' })
    }
    if (auth === true) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "appName": appName,
            "devEmail": devEmail,
            "devPassword": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/newApp", requestOptions)
            .then(response => response.json())
            .then(result => {
                $('.progress-container').fadeOut()
                $('#appName').val("");
                $('#password').val("");
                $('#devEmail').val("");
                if (result.success) {
                    M.toast({ html: 'App Registered!' })
                }
                else {
                    $('#appName').addClass('invalid');
                }
            })
            .catch(error => console.log('error', error));
    }

})

$('#keyGenBtn').on('click', () => {
    $('.progress-container').fadeIn()

    $('#appID').removeClass('invalid')
    $('#appID').addClass('valid')
    $('#genPassword').removeClass('invalid')
    $('#genPassword').addClass('valid')
    const appID = $('#appID').val()
    const password = $('#genPassword').val();
    let auth = true;
    if (appID === "") {
        M.toast({ html: 'Invalid Credentials!' })
        $('#appID').addClass('invalid')
        auth = false
        $('.progress-container').fadeOut()

    }
    if (password === "") {
        M.toast({ html: 'Invalid Credentials!' })
        $('#genPassword').addClass('invalid')
        auth = false
        $('.progress-container').fadeOut()

    }

    if (auth) {
        fetch(`/generateKey/${appID}/${password}`)
            .then(res => res.json())
            .then(dat => {
                $('.progress-container').fadeOut()
                $('#appID').val() = ""
                $('#genPassword').val() = "";
                if (dat.success) {
                    M.toast({ html: 'Key Created!' })
                    M.toast({ html: 'Check Your Registered Email!' })
                }
                else {
                    M.toast({ html: 'Invalid Credentials!' })
                    if (dat.err === "ID") {
                        $('#appID').addClass('invalid')
                    }
                    else {
                        $('#genPassword').addClass('invalid')
                    }
                }
            })
    }

})