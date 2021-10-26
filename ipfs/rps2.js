class Game {
    players = {
        P1: "Player 1",
        P2: "Player 2",
        Mid: "No Player"
    }

    outcomes = {
        Tie: "tie",
        P1: this.players.P1,
        P2: this.players.P2,
    }

    moves = {
        Rock: {
            id: "Rock",
            position: this.players.Mid
        },
        Paper: {
            id: "Paper",
            position: this.players.Mid
        },
        Scissors: {
            id: "Scissors",
            position: this.players.Mid
        }
    }


    newGame(){
        this.moves.Rock.position = this.players.Mid
        this.moves.Paper.position = this.players.Mid
        this.moves.Scissors.position = this.players.Mid
    }

    wonGame(player) {
        console.log(player + " Won!")
        this.newGame()
    }

    whoWins(player1, player2) {
        if(player1.id == player2.id) {
            return this.outcomes.Tie
        }

        switch (player1.id){
            case this.moves.Rock.id:
                if(player2.id == this.moves.Paper.id) {
                    return this.outcomes.P2
                }
                else{
                    return this.outcomes.P1
                }
                break;
            case this.moves.Paper.id:
                if(player2.id == this.moves.Scissors.id) {
                    return this.outcomes.P2
                }
                else{
                    return this.outcomes.P1
                }
                break;
            case this.moves.Scissors.id:
                if(player2.id == this.moves.Rock.id) {
                    return this.outcomes.P2
                }
                else{
                    return this.outcomes.P1
                }
                break;
        }
    }

    shuffleMoves(move,towardsPlayer) {
        let currentPosition = move.position

        if(currentPosition == towardsPlayer) {
            this.wonGame(towardsPlayer)
            return "won"
        }
        else if(currentPosition == this.players.Mid) {
            move.position = towardsPlayer
        }
        else{
            move.position = this.players.Mid
        }
    }

    playRound(player1, player2) {
        let winner = this.whoWins(player1, player2)
        let moveUsed
        switch (winner) {
            case this.outcomes.Tie:
                return winner
            case this.outcomes.P1:
                moveUsed = player1
                break;
            case this.outcomes.P2:
                moveUsed = player2
                break;
        }

        if(this.shuffleMoves(moveUsed,winner) == "won"){
            return winner + " won!!!"
        }

        return winner
    }
}
let game = new Game()

let gameApp = new Vue({
    el: "#gameBoard",
    data: {
        player: "",
        gameID: "",
    },
    methods: {

        sendMove: async function(move) {
            myJson = {
                'protocol': "RPS2",
                'player': this.player,
                'move': move,
                "gameID": this.gameID
            }
        
            await node.pubsub.publish(this.gameID, JSON.stringify(myJson))
        },
    }

})


function Decodeuint8arr(uint8array){
    return new TextDecoder("utf-8").decode(uint8array);
  }

async function publish(myJson) {
    await node.pubsub.publish(document.getElementById('topic').value, JSON.stringify(myJson))
}

async function sub(topic) {
    const receiveMsg = (msg) => {
        let decoded = Decodeuint8arr(msg.data)
        let myJson = JSON.parse(decoded)
        console.log(JSON.stringify(myJson))
        if(myJson.protocol == "RPS2") {
            console.log("here")
            switch (myJson.player){
                case "player1":
                    player1Move = myJson.move
                    break
                case "player2":
                    player2Move = myJson.move
                    break
            }
            let result
            if((result = playRound()).substr(-6,6) == "won!!!"){
                player1LastMove = null
                player2LastMove = null
                lastWinner = game.outcomes.Tie 

                document.getElementById('winScreen').innerHTML = result
                document.getElementById('winScreen').setAttribute("style","display:block")
                setTimeout(()=>{document.getElementById('winScreen').setAttribute("style","display:none")},2000)
            }
        }
        else if(myJson.protocol =='chat') {
            document.getElementById('feed').innerHTML = document.getElementById('feed').innerHTML + "<br><br>" + "<h4>" + myJson.time + '</h4>' + "<h4>From User: " + myJson.user + '</h4>' + "<h2>Data: " + myJson.data + "</h2>"
            updateScroll()
        }
    }
    game.newGame()
    player1LastMove = null
    player2LastMove = null
    player1Move = null
    player2Move = null
    lastWinner = game.outcomes.Tie 

    await node.pubsub.subscribe(topic, receiveMsg,{discover: true})
    document.getElementById('msg').innerHTML = "Subbed to: " + topic
}

function updateScroll(){
    var element = document.getElementById("feed");
    element.scrollTop = element.scrollHeight;
}

let player1Move = null
let player2Move = null
let player1LastMove = null
let player2LastMove = null
let lastWinner

function playRound() {

console.log(player1Move,player2Move)

    if(player1Move == null || player2Move == null) {
        return "null round"
    }
    else {
        let move1
        let move2

        switch (player1Move){
            case "rock":
                move1 = game.moves.Rock
                break;
            case "paper":
                move1 = game.moves.Paper
                break;
            case "scissors":
                move1 = game.moves.Scissors
                break;
        }

        switch (player2Move){
            case "rock":
                move2 = game.moves.Rock
                break;
            case "paper":
                move2 = game.moves.Paper
                break;
            case "scissors":
                move2 = game.moves.Scissors
                break;
        }
        player2LastMove = player2Move
        player1LastMove = player1Move
        player2Move = null
        player1Move = null
        lastWinner = game.playRound(move1, move2)
        return lastWinner
    }

}

setInterval(getGameData,100)

function getGameData(){

    let currentMove = (playingAs == "player1") ? player1Move : player2Move
    switch (currentMove){
        case "rock":
            document.getElementById("rockButton").setAttribute("style","background-color: grey")
            document.getElementById("scissorsButton").setAttribute("style","background-color: darkgrey")
            document.getElementById("paperButton").setAttribute("style","background-color: darkgrey")
            break
        case "paper":
            document.getElementById("rockButton").setAttribute("style","background-color: darkgrey")
            document.getElementById("scissorsButton").setAttribute("style","background-color: darkgrey")
            document.getElementById("paperButton").setAttribute("style","background-color: grey")
            break
        case "scissors":
            document.getElementById("rockButton").setAttribute("style","background-color: darkgrey")
            document.getElementById("scissorsButton").setAttribute("style","background-color: grey")
            document.getElementById("paperButton").setAttribute("style","background-color: darkgrey")
            break
        default:
            document.getElementById("rockButton").setAttribute("style","background-color: darkgrey")
            document.getElementById("scissorsButton").setAttribute("style","background-color: darkgrey")
            document.getElementById("paperButton").setAttribute("style","background-color: darkgrey")
            break
    }

    
    switch(playingAs){
        case "player1":
            document.getElementById("playAsP1").setAttribute("style", "background-color: grey")
            document.getElementById("playAsP2").setAttribute("style"," background-color: darkgrey")
            break
        case "player2":
            document.getElementById("playAsP2").setAttribute("style"," background-color: grey")
            document.getElementById("playAsP1").setAttribute("style"," background-color: darkgray")
            break
    }

    switch(lastWinner) {
        
        case game.outcomes.Tie:
            document.getElementById("winnerBackground").setAttribute("style","display: none;")
            break
        case game.outcomes.P1:
            document.getElementById("winnerBackground").setAttribute("style","display: block; grid-area: LastP1Pic")
            break
        case game.outcomes.P2:
            document.getElementById("winnerBackground").setAttribute("style","display: block; grid-area: LastP2Pic")
            break
    }

    switch(player1LastMove) {
        case "rock":
            document.getElementById("P1LastPic").setAttribute("src","./Assets/Rock.png")
            break
        case "paper":
            document.getElementById("P1LastPic").setAttribute("src","./Assets/paper.png")
            break
        case "scissors":
            document.getElementById("P1LastPic").setAttribute("src","./Assets/scissors.png")
            break
        default:
            document.getElementById("P1LastPic").setAttribute("src"," ")
            break
    }
    switch(player2LastMove) {
        case "rock":
            document.getElementById("P2LastPic").setAttribute("src","./Assets/Rock.png")
            break
        case "paper":
            document.getElementById("P2LastPic").setAttribute("src","./Assets/paper.png")
            break
        case "scissors":
            document.getElementById("P2LastPic").setAttribute("src","./Assets/scissors.png")
            break
        default:
            document.getElementById("P2LastPic").setAttribute("src"," ")
            break
    }
    
    
    
    switch(game.moves.Rock.position){
        case game.players.Mid:
            document.getElementById('rockPic').setAttribute("style","grid-area: RockMid")
            break
        case game.players.P1:
            document.getElementById('rockPic').setAttribute("style","grid-area: RockTop")
            break
        case game.players.P2:
            document.getElementById('rockPic').setAttribute("style","grid-area: RockDown")
            break
    }
    switch(game.moves.Paper.position){
        case game.players.Mid:
            document.getElementById('paperPic').setAttribute("style","grid-area: PaperMid")
            break
        case game.players.P1:
            document.getElementById('paperPic').setAttribute("style","grid-area: PaperTop")
            break
        case game.players.P2:
            document.getElementById('paperPic').setAttribute("style","grid-area: PaperDown")
            break
    }
    switch(game.moves.Scissors.position){
        case game.players.Mid:
            document.getElementById('scissorsPic').setAttribute("style","grid-area: ScissorsMid")
            break
        case game.players.P1:
            document.getElementById('scissorsPic').setAttribute("style","grid-area: ScissorsTop")
            break
        case game.players.P2:
            document.getElementById('scissorsPic').setAttribute("style","grid-area: ScissorsDown")
            break
    }
}

let playingAs = "player1"

function setPlayer(player) {
    playingAs = player
}

async function sendMove(move) {
    myJson = {
        'protocol': "RPS2",
        'player': playingAs,
        'move': move,
        "gameID": document.getElementById('gameID').value
    }

    await node.pubsub.publish(document.getElementById('gameID').value, JSON.stringify(myJson))
}