<template>
  <div>
    <h1>Me</h1>
    <hr />
    &emsp; &emsp; I am a third-year computer science student at Rice University
    with a passion for solving complex computer science problems from embedded C
    programming to web development. Here are some of the things I have made and
    written that I think are cool. More on github and elsewhere.
    <h1>Projects</h1>
    <hr />
    &emsp; &emsp; Some projects I wanted to highlight. There are some more
    things on my Github.
    <ul>
      <li>
        <router-link to="/computer">WC1308-EAL Breadboard Computer</router-link
        >:
        <!-- <a target="" href="/static/computer">WC1308-EAL Breadboard Computer</a>: -->
        Processor built with discrete TTL components on breadboards
      </li>
      <!-- <li>
        <a target="_blank" href="http://servery.ericbreyer.com"
          >Rice Dining Website Redesign</a
        >: Personally redesigning the
        <a target="_blank" href="https://dining.rice.edu/">Rice Dining</a>
        website to be more immediately useable and feature-rich
      </li> -->
      <li>
        <router-link to="/480">Fuse XORier Lookup Table</router-link>:
        Probabilistic data structure which implements an associative array in
        sub-linear space, sacrificing a small false positive rate.
      </li>
      <li>
        <a
          target="_blank"
          href="https://github.com/ericbreyer/NondeterministicSudoku"
          >Nondeterministic Sudoku Solver</a
        >: A magic sudoku solver implemented using the <code>amb</code> form in
        scheme/racket and logical programming
      </li>
      <li>
        <a target="_blank" href="https://github.com/ericbreyer/LambdaCalculus"
          >Writing Scheme with Pure Lambda Calculus</a
        >: A series of Racket macros to transform Scheme syntax into pure lambda
        calculus computation.
        <i>
          I am also working on a way to represent universal turing machines with
          pure lambda calculus using these macros. I have not written the
          writeup yet, but the code is in this repository.</i
        >
      </li>
      <li>
        <a
          target="_blank"
          href="https://sites.google.com/view/theboyzportfolio/the-stayin-alive-method-major-project/"
          >Ambulance Drone</a
        >: Senior year design project. Cargo drone with autopilot capability
        built from scratch
      </li>
    </ul>
    <h1>Writings</h1>
    <hr />
    &emsp; &emsp; I write a lot of stuff down about what I am working
    on/learning about. So why not put it on the internet.
    <ul>
      <li>
        <a target="_blank" href="/static/introtolc.pdf"
          >Lambda Calculus Exploration</a
        >: Learning about Lambda Calculus, combinators, and functional
        programming concepts
      </li>
      <li>
        <a target="_blank" href="/static/Pure_LC_Scheme_Macros.pdf"
          >Writing Scheme in Scheme</a
        >: Companion for "Writing Scheme with Pure Lambda Calculus" project
      </li>
      <li>
        <a
          target="_blank"
          href="https://docs.google.com/document/d/1udyeh_N8O74573erzfXaw_pQkFyo9swuM0iWjnVWxM8/edit"
          >WC1308-EAL Technical Writeup</a
        >: Technical writeup for breadboard processor
      </li>
      <li>
        <a target="_blank" href="https://eric-breyer.medium.com/"
          >Medium Articles</a
        >: Published some stuff relating to cool functional programming concepts
        here to try to help others learn
      </li>
    </ul>
    <h1>Find Me Online</h1>
    <hr />
    <ul>
      <li>
        GitHub:
        <a target="_blank" href="https://github.com/ericbreyer">ericbreyer</a>
      </li>
      <li>
        LinkedIn:
        <a target="_blank" href="https://www.linkedin.com/in/eric-breyer"
          >Eric Breyer</a
        >
      </li>
      <li>
        Medium:
        <a target="_blank" href="https://eric-breyer.medium.com/"
          >Eric Breyer</a
        >
      </li>
      <li>
        Itch.io:
        <a target="_blank" href="https://wild-mortimer.itch.io/"
          >Wild_Mortimer</a
        >
      </li>
      <li>
        YouTube:
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UCJUtMYyEcdAQNTKuja74Alg"
          >Eric Breyer</a
        >
      </li>
      <li>
        Instagram:
        <a target="_blank" href="https://www.instagram.com/eric_breyer/"
          >eric_breyer</a
        >
      </li>
      <li>Discord: @Wild_Mortimer#8607</li>
    </ul>
  </div>
  <!-- </div>
</div> -->
</template>