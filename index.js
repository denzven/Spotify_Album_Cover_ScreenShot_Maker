window.onload = function () {

    // Adding Press enter to submit functionanlity
    window.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submit").click();
        }

        if (event.ctrlKey && event.key == 'p') {
            event.preventDefault();
            downloadCanvas.click();
            console.log("crtle p")
        }
    });

    // On clicking submit btn
    document.getElementById('submit').addEventListener('click', () => {
        //Setting up Canvas
        var canvas = document.getElementById('screenshotCanvas');
        var ctx = canvas.getContext('2d');

        // All the Options
        var songName = document.getElementById("songName");
        var artistName = document.getElementById("artistName");
        var playlistName = document.getElementById("playlistName");
        var isPAL = document.getElementById("isPAL");
        var albumCover = document.getElementById("albumCover");
        var bgColor = document.getElementById("bgColor")
        var downloadCanvas = document.getElementById("downloadCanvas");
        var chkstr =
            `_________________________________________
| songName       : ${songName.value}
| artistName     : ${artistName.value}
| playlistName   : ${playlistName.value}
| isPAL          : ${isPAL.checked}
| albumCover     : ${albumCover.value}
| bgColor        : ${bgColor.value}
| downloadCanvas : ${downloadCanvas.value}
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`

        // ------------------------------------------- //
        //Coords List from JSON
        var request = new XMLHttpRequest();
        request.open("GET", "https://raw.githubusercontent.com/denzven/Spotify_Album_Cover_ScreenShot_Maker/main/assets/presets.json", false);
        request.send(null)
        var data = JSON.parse(request.responseText);

        var preset = "default"

        //Images
        var [UIx, UIy, UIw, UIh] = [data[preset]["UI"]["x"], data[preset]["UI"]["y"], data[preset]["UI"]["w"], data[preset]["UI"]["h"]]
        var [albumCoverx, albumCovery, albumCoverw, albumCoverh] = [data[preset]["albumCover"]["x"], data[preset]["albumCover"]["y"], data[preset]["albumCover"]["w"], data[preset]["albumCover"]["h"]]
        var [PALx, PALy, PALw, PALh] = [data[preset]["PAL"]["x"], data[preset]["PAL"]["y"], data[preset]["PAL"]["w"], data[preset]["PAL"]["h"]]

        //Text
        var [songNamex, songNamey, songNamec] = [data[preset]["songName"]["x"], data[preset]["songName"]["y"], data[preset]["songName"]["c"]]
        var [artistNamex, artistNamey, artistNamec] = [data[preset]["artistName"]["x"], data[preset]["artistName"]["y"], data[preset]["artistName"]["c"]]
        var [playlistNamex, playlistNamey, playlistNamec] = [data[preset]["playlistName"]["x"], data[preset]["playlistName"]["y"], data[preset]["playlistName"]["c"]]

        // ------------------------------------------- //

        //Download Canvas
        downloadCanvas.addEventListener('click', () => {
            downloadCanvas.href = (canvas.toDataURL('image/png', 1))
        })
        // Clipping Text
        var songNameVal = songName.value.length > songNamec ? songName.value.slice(0, songNamec) + "..." : songName.value;
        var artistNameVal = artistName.value.length > artistNamec ? artistName.value.slice(0, artistNamec) + "..." : artistName.value;
        var playlistNameVal = playlistName.value.length > playlistNamec ? playlistName.value.slice(0, playlistNamec) + "..." : playlistName.value;

        //infodump
        console.log(chkstr)

        //reset canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // creating new image objects
        var PALImage = new Image();
        var albumCoverImage = new Image();
        var UIImage = new Image();

        //fills bgColor
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Loads ui elements
        UIImage.onload = () => {
            ctx.drawImage(UIImage, UIx, UIy, UIw, UIh);
        };
        UIImage.src = "assets/ui/ui.png";

        // Loading Fonts
        document.fonts.ready
            .then(() => {
                //adding playlistName
                ctx.font = '12px gothammedium';
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText(playlistNameVal, playlistNamex, playlistNamey);

                //adding songName
                ctx.font = '24px gothammedium';
                ctx.fillStyle = "white";
                ctx.textAlign = "start";
                ctx.fillText(songNameVal, songNamex, songNamey);

                //adding artistName
                ctx.font = '16px gothamthin';
                ctx.fillStyle = "white";
                ctx.fillText(artistNameVal, artistNamex, artistNamey);
            });

        // quick PAL check and loading album cover
        try {
            if (isPAL.checked) {
                albumCoverImage.onload = () => {
                    ctx.drawImage(albumCoverImage, albumCoverx, albumCovery, albumCoverw, albumCoverh)
                    PALImage.onload = () => {
                        ctx.drawImage(PALImage, PALx, PALy, PALw, PALh)
                    };
                    PALImage.src = "assets/ui/PAL.png";
                };
                albumCoverImage.src = URL.createObjectURL(albumCover.files[0]);
            } else {
                albumCoverImage.onload = () => {
                    ctx.drawImage(albumCoverImage, albumCoverx, albumCovery, albumCoverw, albumCoverh)
                };
                albumCoverImage.src = URL.createObjectURL(albumCover.files[0]);
            };
        } catch (err) {
            console.log(err)
        }
    });

}