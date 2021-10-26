document.addEventListener('DOMContentLoaded', async () => {
    const node = await Ipfs.create({
      EXPERIMENTAL: { pubsub: true },
      repo: (() => `repo-${Math.random()}`)(),
      config: {
          Addresses: {
              Swarm: [
                  '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
              ]
          },
          Bootstrap: []
      }
    })

    window.node = node
    const res = await node.bootstrap.reset()
    console.log(res.Peers)
    //node.swarm.connect("/ipfs/QmRelay/p2p-circuit/ipfs/QmTarget")
  
    // You can write more code here to use it. Use methods like
    // node.add, node.get. See the API docs here:
    // https://github.com/ipfs/js-ipfs/tree/master/packages/interface-ipfs-core
  })


  function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("window");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "flex";
  }