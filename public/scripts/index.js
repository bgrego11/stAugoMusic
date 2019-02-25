$(".submit-form").on("click", function(e){
    e.preventDefault()
    term = $("#term").val()
    
    if (term === 'eminem') {
        alert("Error no bad music allowed")
    }

    checkBox = $("#type")
    console.log(checkBox)
    if (checkBox.is(':checked')) {
        type = "track"
    } else {
        type = "artist"
    }
    apiUrl = "/search/" + type + "/" + term
    $.get(apiUrl, function(data){
        console.log(apiUrl)
        tracks = data.tracks
        for (i in tracks) {
            row = '<tr><td>' + tracks[i].title + '</td><td>' + tracks[i].artist + '</td><td>' + '<button class="add btn btn-primary">+</button>' + '</td></tr>'
            $(".tbod").append(row)

        }
    })
})