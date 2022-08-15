window.onload = function () {

    //Setting up Canvas
    const canvas = document.getElementById('screenshotCanvas');
    const ctx = canvas.getContext('2d');

    // All the Options
    var songName       = document.getElementById("songName");
    var artistName     = document.getElementById("artistName");
    var playlistName   = document.getElementById("playlistName");
    //var isLiked        = document.getElementById("isLiked");
    //var isShuffle      = document.getElementById("isShuffle");
    var isPAL          = document.getElementById("isPAL");
    //var isPaused       = document.getElementById("isPaused");
    var albumCover     = document.getElementById("albumCover");
    var bgColor        = document.getElementById("bgColor")
    var downloadCanvas = document.getElementById("downloadCanvas");
    var watermark      = document.getElementById("watermark");
    var chkstr         = 
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
    var jsonFile;
    var data;
    var res;
    fetch("assets/presets.json").then(
        res => res.json()
    ).then(
        data => jsonFile = JSON.parse(data)
    );
    var preset = "default";

    console.log(data)
    //console.log(data.[preset].["UI"].["x"]) //24

    //Images
    var [UIx,UIy,UIw,UIh] = [24,63,366,758]
    var [albumCoverx,albumCovery,albumCoverw,albumCoverh] = [24,157,366,366]
    var [PALx,PALy,PALw,PALh] = [304,461,66,42]

    //Text
    var [songNamex,songNamey,songNamec] = [25, 582,25]
    var [artistNamex,artistNamey,artistNamec] = [26,616,36]
    var [playlistNamex,playlistNamey,playlistNamec] = [212, 67,33]

    // ------------------------------------------- //

    // Clipping Text
    var songNameVal     = songName.value.length > songNamec ? songName.value.slice(0,songNamec) + "..." : songName.value;
    var artistNameVal   = artistName.value.length > artistNamec ? artistName.value.slice(0,artistNamec) + "..." : artistName.value;
    var playlistNameVal = playlistName.value.length > playlistNamec ? playlistName.value.slice(0,playlistNamec) + "..." : playlistName.value;    

    //Download Canvas
    downloadCanvas.addEventListener('click', () => {
        downloadCanvas.href = (canvas.toDataURL('image/png', 1))
    })

    // Adding Press enter to submit functionanlity
    window.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("submit").click();
        }

        if (event.ctrlKey && event.key =='p') {
          event.preventDefault();
          downloadCanvas.click();
          console.log("crtle p")
        }
      }); 

    // On clicking submit btn
    document.getElementById('submit').addEventListener('click',() => {

        //infodump
        console.log(chkstr)

        //reset canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        // creating new image objects
        //var likedImage      = new Image();
        //var shuffleImage    = new Image();
        var PALImage        = new Image();
        //var pausedImage     = new Image();
        var albumCoverImage = new Image();
        var UIImage = new Image();

        //fills bgColor
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        //Loads ui elements
        UIImage.onload = () => {
            ctx.drawImage(UIImage, UIx,UIy,UIw,UIh);
        }; UIImage.src = "assets/ui/ui.png";

        // Loading Fonts
        document.fonts.ready
        .then(() => {
            //adding playlistName
            ctx.font = '12px gothammedium';
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(playlistNameVal,playlistNamex,playlistNamey);

            //adding songName
            ctx.font = '24px gothammedium';
            ctx.fillStyle = "white";
            ctx.textAlign = "start";
            ctx.fillText(songNameVal,songNamex,songNamey);

            //adding artistName
            ctx.font = '16px gothamthin';
            ctx.fillStyle = "white";
            ctx.fillText(artistNameVal,artistNamex,artistNamey);
        }).catch(() => {
          console.log("Error");
        });

        // quick PAL check and loading album cover
        if (isPAL.checked) {
            albumCoverImage.onload = () =>{
                ctx.drawImage(albumCoverImage,albumCoverx,albumCovery,albumCoverw,albumCoverh)
                PALImage.onload = () => {
                    ctx.drawImage(PALImage,PALx,PALy,PALw,PALh)
                }; PALImage.src = "assets/ui/PAL.png"; 
            }; albumCoverImage.src = URL.createObjectURL(albumCover.files[0]);
        }else{
            albumCoverImage.onload = () =>{
                ctx.drawImage(albumCoverImage,albumCoverx,albumCovery,albumCoverw,albumCoverh)
            }; albumCoverImage.src = URL.createObjectURL(albumCover.files[0]);
        };
    });
}