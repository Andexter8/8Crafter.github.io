export default function getComponent(tabIndex = -1){
	return `<header class="header" style="position: fixed; width: 100%">
    <noscript>
      <div class="alert warning">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        This website requires JavaScript to function, please allow JavaScript on this website.
      </div>
    </noscript>
    <div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      This website is currently under construction.
    </div>
    <ul class="horizontal-nav">
      <li style="height: 48px; margin-bottom: -10px;"><a href="https://youtube.com/@8crafter" style="padding-top: 3.5px; padding-bottom: 3.5px;"><image title="8Crafter" src="/favicon.ico" width="32px" height="32px" class="piximg" style="vertical-align: middle; margin-right: 5px; padding: 2px 0px;"></image><span style="vertical-align: text-bottom; font-size: 32px; font-family: Mojangles; line-height: initial;">8Crafter</span></a></li>
      <li${tabIndex==0?' class="active"':""}><a href="/index.html">Home</a></li>
      <li${tabIndex==1?' class="active"':""}><a href="https://wiki.8crafter.com/main/" style="/*line-height: 20px;*/">Wiki<image src="/assets/images/ui/glyphs/external_link.png" style="width: 17px; height: 17px; margin: -10px -10px -10px 5px; image-rendering: pixelated; vertical-align: middle; padding: 9.5px 0px;"></image></a></li>
      <li${tabIndex==2?' class="active"':""}><a href="/main/contact.html">Contact</a></li>
      <li${tabIndex==3?' class="active"':""}><a href="/main/about.html">About</a></li>
      <li style="float:right;cursor:pointer;"><a onclick="$('#settings_menu').slideToggle()" style="vertical-align: middle;"><div class="settings_button" title="Settings Icon" style="width: 30px; height: 30px; margin-right: 5px"></div>Settings</a></li>
    </ul>
  </header>`
}