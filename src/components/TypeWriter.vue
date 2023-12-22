<template>
  <div id="intro">
    <div id="line1" class="line">Hello!</div>
    <div id="line2" class="line">
      My name is <span class="coolGold">Eric Breyer</span>.
    </div>
    <div id="line3" class="line">Welcome to my corner of the internet 🌐</div>
  </div>
</template>

<script>
export default {
  name: "TypeWriter",
  components: {},
};
</script>

<style scoped>
#intro * {
  font-family: monospace;
  color: white;
}
#line1 {
  --typewriter-speed: 1s;
  --typewriter-delay: 1s;
  --steps: 6;
}
#line2 {
  --typewriter-speed: 1.5s;
  --typewriter-delay: 3s;
  --steps: 23;
}
#line2 span {
  color: rgb(var(--cool-gold));
  background-color: inherit;
}
#line3 {
  color: hsl(0, 0%, 100%) !important;

  --typewriter-speed: 2s;
  --typewriter-delay: 5.5s;
  --steps: 38;
}
.line {
  position: relative;
  /*animation: fadeAway 1s ease 10s forwards*/
}

.line::before,
.line::after {
  content: "";
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
}
.line::before {
  background-color: hsl(0, 0%, 7%);
  z-index: 2;
  left: -0.1px;
  animation: typeWriter var(--typewriter-speed) steps(var(--steps))
    var(--typewriter-delay) forwards;
}
.line::after {
  width: 0.125em;
  background-color: white;
  opacity: 0;
  z-index: 3;
  animation: typeWriter var(--typewriter-speed) steps(var(--steps))
      var(--typewriter-delay) forwards,
    myblink 800ms ease calc(var(--typewriter-delay) - 1s) infinite,
    goAway 1s ease calc(var(--typewriter-speed) + var(--typewriter-delay))
      infinite forwards;
}
#intro {
  position: absolute;
  top: 0;
  background-color: transparent;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 1rem;

  min-width: 283px;

  /*animation: fadeAway 1s ease 10s forwards*/
}

#line1 {
  font-size: 2rem;
}

#line2 {
  font-size: 1.5rem;
}

#line3 {
  font-size: 1rem;
}

.line {
  background-color: hsl(0, 0%, 7%);
}

#line4 {
  transform: translateY(2em);
  opacity: 0%;

  animation: flyUp 2s ease 10s forwards;
  margin-top: 0.5em;
  font-size: 3rem;
}

@keyframes typeWriter {
  to {
    left: 100%;
  }
}
@keyframes myblink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes goAway {
  from {
    opacity: 0;
    z-index: -1;
    /* display: none; */
  }
  to {
    opacity: 0;
    z-index: -1;
    /* display: none; */
  }
}

@keyframes fadeAway {
  from {
    align-items: center;
  }
  to {
    align-items: flex-start;
  }
}

@keyframes flyUp {
  to {
    transform: translateY(0);
    opacity: 100%;
  }
}

/*media query for mobile device*/
@media only screen and (max-width: 600px) {
  #intro {
    margin-top: 35px;
  }
}
</style>
