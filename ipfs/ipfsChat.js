Vue.component("msg-component", {
    data: function () {
        return {
          count: 0
        }
      },
      props: {
        date: String,
        user: String,
        data: String,
      },    


      template: '<div class="msgComponent"><div class="username">{{user}}<span class="date">{{date}}</span></div><div class="data">{{data}}</div></div>'
})

let chatApp = new Vue({
    el: "#chatApp",
    data: {
        user: "",
        topic: "",
        lastTopic: "Topic",
        data: "",
        feed: [],
        subbedTo: "Not Subscirbed to any topic ID"
    },
    //components: {
    //    "msg-component": msgComponent,
    //},
    methods: {
        publishChat: async function(event) {
            let myJson = {
                'protocol':'chat',
                'topic': this.topic,
                'data': this.data,
                'user': this.user,
                'time': new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
            }
            console.log(this.feed);
            await node.pubsub.publish(this.topic, JSON.stringify(myJson))

            this.data = "";

            this.updateScroll();
        },

        subChat: async function(event) {
            await node.pubsub.unsubscribe(this.lastTopic);

            const receiveMsg = (msg) => {
                let decoded = msg.data;
                let myJson = JSON.parse(decoded)
                
                console.log(myJson)

                if(myJson.protocol =='chat') {
                    this.feed.push({time: myJson.time, user: myJson.user, data: myJson.data})
                }
                this.updateScroll();
            }
            this.subbedTo = "Talking as <b>" + this.user + "</b> on <b>" + this.topic + "</b>";

            await node.pubsub.subscribe(this.topic, receiveMsg,{discover: true})

            this.lastTopic = this.topic;
        },

        updateScroll : function() {
            var element = this.$refs["feed"];
            element.scrollTop = element.scrollHeight - element.getBoundingClientRect().height;
        },

        clearChat: function() {
            this.feed = [];
        }
    }
})