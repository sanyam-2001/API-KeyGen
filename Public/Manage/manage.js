const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const appID = urlParams.get('appID')
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

fetch(`/getDetails/${appID}`)
    .then((dat) => dat.json())
    .then(res => {
        console.log(res)
        const { appName, appID, devEmail } = res.details
        const keys = res.keys
        $('#appname').text(appName)
        $('#appid').text(appID)
        $('#mail').text(devEmail)
        $('#count').text(res.keys.length)
        $('.crumb').fadeIn().css({ display: 'flex' })
        //Adding Keys
        let htm = "";
        keys.forEach(key => {
            htm +=
                `
        <div class="key-container flex" style="justify-content: space-between; align-items: center;" id=${key.key}>
            <div class="keyValue flex">
                <i class="material-icons flex">fingerprint</i><span id="appid"
                    style="font-weight: bold;margin-left: 10px;">${key.key}</span>
            </div>
            <div class="actions">
                <button class="btn waves-effect waves-light blue download" type="submit" name="action" key=${key.key}>Download
                    <i class="material-icons right">download</i>
                </button>
                <button class="btn waves-effect waves-light blue delete" type="submit" name="action" key=${key.key}>Delete
                    <i class="material-icons right">delete</i>
                </button>
                <button class="btn waves-effect waves-light blue copy" type="submit" name="action" key=${key.key}>Copy
                    <i class="material-icons right">content_copy </i>
                </button>
            </div>
        </div>
            `
        })
        $('.mainContainer').html(htm)

    });

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('download')) {
        download(`APIKey(${appID})`, $(e.target).attr('key'))
        M.toast({ html: 'Key Downloaded!' })
    }
})
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy')) {
        navigator.clipboard.writeText($(e.target).attr('key')).then(function () {
            M.toast({ html: 'Key Copied to Clipboard!' })
        }, function (err) {
            M.toast({ html: 'Unable to Copy Key!' })
        });
    }
})
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        fetch(`/deleteKey/${$(e.target).attr('key')}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    $(`#${$(e.target).attr('key')}`).fadeOut();
                    M.toast({ html: 'Key Deleted!' })
                }
                else {
                    M.toast({ html: 'Unable to Delete Key!' })
                }
            })
    }
})

$('#addnewkey').on('click', () => {
    fetch(`/addkey/${appID}`)
        .then(dat => dat.json())
        .then(res => {
            console.log(res)
            if (res.success) {
                M.toast({ html: 'New Key Created!' })
            }
            let htm = $('.mainContainer').html();
            htm +=
                `
        <div class="key-container flex" style="justify-content: space-between; align-items: center;" id=${res.key.key}>
            <div class="keyValue flex">
                <i class="material-icons flex">fingerprint</i><span id="appid"
                    style="font-weight: bold;margin-left: 10px;">${res.key.key}</span>
            </div>
            <div class="actions">
                <button class="btn waves-effect waves-light blue download" type="submit" name="action" key=${res.key.key}>Download
                    <i class="material-icons right">download</i>
                </button>
                <button class="btn waves-effect waves-light blue delete" type="submit" name="action" key=${res.key.key}>Delete
                    <i class="material-icons right">delete</i>
                </button>
                <button class="btn waves-effect waves-light blue copy" type="submit" name="action" key=${res.key.key}>Copy
                    <i class="material-icons right">content_copy </i>
                </button>
            </div>
        </div>

        `
            $('.mainContainer').html(htm)

        })
})
