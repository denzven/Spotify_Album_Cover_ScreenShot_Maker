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
    var chkstr         = 
`_________________________________________
| songName       : ${songName.value}
| artistName     : ${artistName.value}
| playlistName   : ${playlistName.value}
| isLiked        : ${isLiked.checked}
| isShuffle      : ${isShuffle.checked}
| isPAL          : ${isPAL.checked}
| isPaused       : ${isPaused.checked}
| albumCover     : ${albumCover.value}
| bgColor        : ${bgColor.value}
| downloadCanvas : ${downloadCanvas.value}
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`

    //Download Canvas
    downloadCanvas.addEventListener('click', () => {
        downloadCanvas.href = (canvas.toDataURL('image/png', 1))
    })

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
            ctx.drawImage(UIImage, 24, 63,366,758);
        }; UIImage.src = "assets/ui/ui.png";

        // quick PAL check and loading album cover
        if (isPAL.checked) {
            albumCoverImage.onload = () =>{
                ctx.drawImage(albumCoverImage,24,157,366,366)
                PALImage.onload = () => {
                    ctx.drawImage(PALImage,304,461,66,42)
                }; PALImage.src = "assets/ui/PAL.png"; 
            }; albumCoverImage.src = URL.createObjectURL(albumCover.files[0]);
        }else{
            albumCoverImage.onload = () =>{
                ctx.drawImage(albumCoverImage,24,157,366,366)
            }; albumCoverImage.src = URL.createObjectURL(albumCover.files[0]);
        }

        //adding text
        if (playlistName.value != "") {

            
            ctx.font = '12px gotham-black';
            ctx.fillStyle = "white";
            ctx.fillText(playlistName.value, 176, 67);
        }


    });
}

// document.fonts.ready
//   .then(() => {
//     // do those operations after
//     // the fonts are loaded here
//     ....
//   })
//   .catch(() => {
//     console.log("Error");
//   });