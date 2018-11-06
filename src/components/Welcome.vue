<template>
  <div class="container">
    <p>Hi there!</p>
    <p>Genome-scale metabolic models are tough to understand at a glance. Memote, short for metabolic model tests, is
      here to change that.</p>
    <p>For a given metabolic model, the tests in memote fulfill two purposes: They give you 1. an independent,
      comparable score and 2. a comprehensive overview. The tests were selected on the basis of previously established
      guidelines (<a href="http://dx.doi.org/10.1038/nprot.2009.203" target="_blank">1</a>, <a
        href="http://dx.doi.org/10.1093/bib/bbv003" target="_blank">2</a>, <a
        href="http://dx.doi.org/10.1016/j.copbio.2014.12.010" target="_blank">3</a>,
      <a href="http://dx.doi.org/10.1038/nbt.2870" target="_blank">4</a>)
      and are continuously curated by the community.</p>
    <p>To try it out simply drag&amp;drop your model of choice onto the field above. Memote accepts models formatted in
      the current exchange standard,
      <a href="http://sbml.org/Documents/Specifications#SBML_Level_3_Packages" target="_blank">SBML
        Level3
      </a> +
      <a href="http://sbml.org/Documents/Specifications/SBML_Level_3/Packages/Flux_Balance_Constraints_(flux)"
         target="_blank">FBC2</a>,
      or a non-standard JSON format provided by
      <a href="https://github.com/opencobra/cobrapy" target="_blank">cobrapy</a>.
    </p>
    PLEASE NOTE:
    <ul class="note-list">
      <li>- Depending on the amount of reactions in your model, testing may take a while (possibly &gt;10 minutes).</li>
      <li>- Currently, the resulting report points to potential issues yet offers only limited suggestions
        towards fixing these. Get involved to change this!</li>
      <li>- Genome-scale metabolic models are published in two flavors:
        Condition-specific models vs. Uninitialized Reconstructions. Individual unscored tests may only apply to the
      former as they require initialization.</li>
      <li>- Be aware that <u>the report will remain available for up to one week via an auto-generated URL.</u></li>
    </ul>
    <p>Check out the <a href="http://memote.readthedocs.io/en/latest/" target="_blank">documentation</a>, <a
      href="https://www.biorxiv.org/content/early/2018/07/11/350991" target="_blank">Cite us</a>,
      Star us, and contribute on <a
        href="https://www.github.com/opencobra/memote" target="_blank">GitHub</a></p>
    <hr>
    <p>
      1. Our sample model is the <em>E. coli</em> core model published here: <a href="https://dx.doi.org/10.1128/ecosalplus.10.2.1">10.1128/ecosalplus.10.2.1</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
};
</script>
