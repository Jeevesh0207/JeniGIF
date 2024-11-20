<div align="center">
    <img src="./screenshot/logo.png" width="128" height="128" style="display: block; margin: 0 auto"/>
    <h1> Jeni GIF </h1>
    <h3>Welcome to JeniGIF</h3> 
    <p> Your ultimate GIF companion! Share, search, and download your favorite GIFs in a tap! 🎉✨</p>
</div>

---

<p align="center">
  <img src="./screenshot/1.png" width="30%" onclick="openGif(this)" />
  <img src="./screenshot/2.png" width="30%" onclick="openGif(this)" />
  <img src="./screenshot/3.png" width="30%" onclick="openGif(this)" />

  <img src="./screenshot/4.png" width="30%" onclick="openGif(this)" />
  <img src="./screenshot/5.png" width="30%" onclick="openGif(this)" />
  <img src="./screenshot/6.png" width="30%" onclick="openGif(this)" />

  <img src="./screenshot/7.png" width="30%" onclick="openGif(this)" />
  <img src="./screenshot/8.png" width="30%" onclick="openGif(this)" />
  <img src="./screenshot/9.png" width="30%" onclick="openGif(this)" />
</p>

<script>
  function openGif(gif) {
    const gifSrc = gif.src;
    const action = prompt("Do you want to Share or Download this GIF? Type 'Share' or 'Download'").toLowerCase();

    if (action === 'share') {
      window.alert("GIF Shared: " + gifSrc);  // Replace with actual sharing functionality
    } else if (action === 'download') {
      window.location.href = gifSrc;  // This triggers the download of the GIF
    } else {
      window.alert("Invalid action. Please type 'Share' or 'Download'.");
    }
  }
</script>

## 🎉 JeniGIF - Your Ultimate GIF Experience 🎬
- 🔄 Search Any GIF
- 📤 Share with Friends
- 📥 Download Instantly
- 🎯 Filter Your Results
- 🖼️ Easy Access to All GIFs
- ✨ Customizable Experience
- 🎉 Endless Entertainment

## 📥 Download
[<img src="https://github.com/machiav3lli/oandbackupx/blob/034b226cea5c1b30eb4f6a6f313e4dadcbb0ece4/badge_github.png"
    alt="Get it on GitHub"
    height="80">](https://github.com/Jeevesh0207/JeniGIF/releases/tag/v.1.0.0)

## 📢 Disclaimer
This project and its contents are not affiliated with, funded, authorized, endorsed by, or in any way associated with any GIF-related service providers.

Any trademark, service mark, trade name, or other intellectual property rights used in this project are owned by the respective owners.
