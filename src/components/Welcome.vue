<template>
  <div class="container">
    <h4>Welcome to MEMOTE</h4>
    <p>
      Genome-scale metabolic models are hard to understand at a glance; or even
      on second look, or third... MEMOTE, short for <u>me</u>tabolic
      <u>mo</u>del <u>te</u>sting, is here to change that.
    </p>
    <p>
      For a given metabolic model, the tests in MEMOTE fulfill two purposes: 1.
      They give you an independent, comparable score and 2. a comprehensive
      overview. The tests were selected on the basis of previously established
      guidelines (
      <a
        href="http://dx.doi.org/10.1038/nprot.2009.203"
        target="_blank"
        rel="noopener noreferrer"
        >1</a
      >,
      <a
        href="http://dx.doi.org/10.1093/bib/bbv003"
        target="_blank"
        rel="noopener noreferrer"
        >2</a
      >,
      <a
        href="http://dx.doi.org/10.1016/j.copbio.2014.12.010"
        target="_blank"
        rel="noopener noreferrer"
        >3</a
      >, <a href="http://dx.doi.org/10.1038/nbt.2870" target="_blank">4</a>) and
      are continuously curated by the community.
    </p>
    <p>
      Try it out by simple drag &amp; drop of your model of choice onto the
      field above. MEMOTE accepts models formatted in the current
      <em>de facto</em> standard,
      <a href="http://sbml.org/" target="_blank" rel="noopener noreferrer">
        SBML
      </a>
      , or a non-standard JSON format. MEMOTE is powered by
      <a
        href="https://github.com/opencobra/cobrapy"
        target="_blank"
        rel="noopener noreferrer"
        >cobrapy</a
      >
      and thus bound to its capabilities.
    </p>
    <h5>Please Note</h5>
    <ul class="note-list">
      <li>
        Depending on the amount of reactions in your model, testing may take a
        while (possibly &gt;10 minutes).
      </li>
      <li>
        Currently, the resulting report points to potential issues yet offers
        only limited suggestions towards fixing these. Get involved to change
        this!
      </li>
      <li>
        Genome-scale metabolic models are published in two flavors:
        Condition-specific models vs. Uninitialized Reconstructions. Individual
        unscored tests may only apply to the former as they require
        initialization.
      </li>
      <li>
        <b>
          Be aware that the report will only remain available for up to one week
          via an auto-generated URL.
        </b>
      </li>
      <li>
        We store uploaded models temporarily along with the report in order to
        aid debugging and resolving potential issues that may occur during test
        executions. The models are not available to other users and expire along
        with the report results. If you do not wish to give us access to your
        model, consider
        <a
          href="https://memote.readthedocs.io/en/latest/installation.html"
          target="_blank"
          rel="noopener noreferrer"
          >installing and running MEMOTE locally</a
        >.
      </li>
    </ul>
    <h5>Please Cite MEMOTE</h5>
    <div
      class="csl-bib-body"
      style="line-height: 1.35; margin-left: 2em; text-indent:-2em;"
    >
      <div class="csl-entry">
        Lieven, Christian, Moritz E. Beber, Brett G. Olivier, Frank T. Bergmann,
        Meric Ataman, Parizad Babaei, Jennifer A. Bartell, et al. 2020. “MEMOTE
        for Standardized Genome-Scale Metabolic Model Testing.”
        <i>Nature Biotechnology</i>, March.
        <a
          href="https://doi.org/10.1038/s41587-020-0446-y"
          target="_blank"
          rel="noopener noreferrer"
          >https://doi.org/10.1038/s41587-020-0446-y</a
        >.
      </div>
    </div>
    <h5>Spread the Love</h5>
    <p>
      You can
      <a
        class="github-button"
        href="https://github.com/opencobra/memote"
        data-icon="octicon-star"
        data-show-count="true"
        aria-label="Star opencobra/memote on GitHub"
        >Star</a
      >
      or
      <a
        class="github-button"
        href="https://github.com/opencobra/memote/fork"
        data-icon="octicon-repo-forked"
        data-show-count="true"
        aria-label="Fork opencobra/memote on GitHub"
        >Fork</a
      >
      our repository
    </p>
    <hr />
    <p>
      <sup>1</sup> Our sample model is the <em>E. coli</em> core model published
      here:
      <a
        href="https://dx.doi.org/10.1128/ecosalplus.10.2.1"
        target="_blank"
        rel="noopener noreferrer"
        >10.1128/ecosalplus.10.2.1</a
      >
    </p>
  </div>
</template>

<style scoped>
.note-list {
  padding-left: 40px;
}

.note-list,
.note-list li {
  list-style-type: disc;
}
</style>
