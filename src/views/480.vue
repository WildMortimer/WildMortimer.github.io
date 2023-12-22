<template>
  <div>
    <h1>The Fuse XORier Lookup Table</h1>
    <h2>Junior year term project on probabilistic data structures</h2>
    <hr />
    &emsp; &emsp; In my junior year of college, I took a course on probabilistic
    algorithms and data structures. We had the choice to either take a final
    exam or do a mini research project on a topic of our choice. A friend and I
    decided to do the project. We liked learning about
    <a target="_blank" href="https://en.wikipedia.org/wiki/Bloom_filter"
      >Bloom filters</a
    >
    and wanted to look more into other probabilistic data structures. We found a
    paper on the
    <a
      target="_blank"
      href="https://www.cs.princeton.edu/~chazelle/pubs/soda-rev04.pdf"
      >Bloomier Filter</a
    >
    - a data structure that is similar to a Bloom filter but can store arbitrary
    data instead of just a set of keys - and decided to try to understand and
    implement it, as there was little to no code or articles about it available
    online. We ended up implementing and learning about the Bloomier Filter, XOR
    filters, and Binary Fuse Filters. We took what we learned from all these
    papers, and implemented a new data structure that we call the
    <a target="_blank" href="https://arxiv.org/abs/2312.13541"
      >Fuse XORier Lookup Table.</a
    >
    <br />
    <br />
    &emsp; &emsp; The Fuse XORier Lookup Table is a data structure that is
    similar to a Bloomier Filter, but employs a faster and more space efficient
    construction algorithm. It implements an associative array (map) in
    sublinear space, sacrificing a small false positive probability. We provide
    code for a C and Python implementation of the data structure. The paper is
    available on arXiv and the code is available on GitHub.
    <ul>
      <li>
        <a target="_blank" href="https://arxiv.org/abs/2312.13541"
          >Paper on arXiv</a
        >
      </li>
      <li>
        <a
          target="_blank"
          href="https://github.com/ericbreyer/C-Fuse-XORier-Filter"
          >C Implementation on GitHub</a
        >
      </li>
    </ul>
  </div>
  <!-- </div>
</div> -->
</template>
<style scoped>
h2 {
  padding-inline: 1em;
  text-align: center;
  filter: brightness(0.8);
  margin-top: 0;
}
</style>