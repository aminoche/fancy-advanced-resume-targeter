const uniq = require('lodash/uniq');
const sampleData = require('../../data/sampleData');
const nlp = require('compromise');

const typeOfWord = string =>
  nlp(string)
    .out('tags')
    .map(obj => obj.tags)[0];

const compareSourceToTarget = (source, target) => {
  const sourceSplit = source.replace(/\n/g, ' ').split(' ');
  const targetSplit = target.replace(/\n/g, ' ').split(' ');
  const comparedSourceVsTarget = sourceSplit.map(word => {
    const sourceWordInTarget = targetSplit.includes(word);
    const partOfSpeech = typeOfWord(word)[0] || [];
    return { word, sourceWordInTarget, partOfSpeech };
  });
  return comparedSourceVsTarget;
};

const compareTargetToSource = (source, target) => {
  const sourceSplit = source.replace(/\n/g, ' ').split(' ');
  const targetSplit = target.replace(/\n/g, ' ').split(' ');
  const comparedTargetVsSource = targetSplit.map(word => {
    const targetWordInSource = sourceSplit.includes(word);
    const partOfSpeech = typeOfWord(word)[0] || [];
    return { word, targetWordInSource, partOfSpeech };
  });
  return comparedTargetVsSource;
};

const summary = (source, target) => {
  const sourceVsTarget = compareSourceToTarget(source, target);
  const targetVsSource = compareTargetToSource(source, target);
  const skillsYouHaveAndInJobDescription = uniq(
    sourceVsTarget
      .filter(
        obj => obj.sourceWordInTarget && obj.partOfSpeech.includes('Noun')
      )
      .map(obj => obj.word)
  );
  const skillsYouDoNotHaveAndInJobDescription = uniq(
    targetVsSource
      .filter(
        obj => !obj.targetWordInSource && obj.partOfSpeech.includes('Noun')
      )
      .map(obj => obj.word)
  );
  const percentSkillsMatching =
    skillsYouHaveAndInJobDescription.length /
      (skillsYouHaveAndInJobDescription.length +
        skillsYouDoNotHaveAndInJobDescription.length) || 0;

  return {
    skillsYouHaveAndInJobDescription,
    skillsYouDoNotHaveAndInJobDescription,
    percentSkillsMatching
  };
};

const cl = func => {
  console.log('************************************************');
  console.log(func);
  console.log('************************************************');
};

cl(summary(sampleData.resumeSample, sampleData.jobDescriptionSample));
