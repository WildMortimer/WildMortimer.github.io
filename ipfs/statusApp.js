let statusApp = new Vue({
    el: "#statusApp",
    data: {
        statusText: "offline",
        statusImg: "../assets/logoblack.svg"
    },
    methods: {
        getStatus: function () {
            if(!window.node) return;

            status = window.node.isOnline()

            if (status) {
                this.statusText = "online"
                this.statusImg = "../assets/logo.svg"
            }
            else {
                this.statusText = "offline"
                this.statusImg = "../assets/logoblack.svg"
            }
        },

        openChat: function() {
            openTab("chatApp");
        },

        openRPS2: function() {
            openTab("gameBoard");
        }
    },
    created: function() {
        setInterval(this.getStatus,5000);
    }
})

/*    const status = node.isOnline() ? 'online' : 'offline'
    
    console.log(`Node status: ${status}`)
    document.getElementById('status').innerHTML = `<object data="logo.svg" type="image/svg+xml" style="height: 100px;">
    </object> Node status: ${status}`
    var link = document.querySelector("link[rel~='icon']");
      if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = 'logo.svg';
} */
  