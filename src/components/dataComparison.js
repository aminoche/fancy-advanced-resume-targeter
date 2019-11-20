const uniq = require('lodash/uniq');
const nlp = require('compromise');

const typeOfWord = string =>
  nlp(string)
    .out('tags')
    .map(obj => obj.tags);

const compareSourceToTarget = (source, target) => {
  const sourceSplit = source.replace(/\n/g, ' ').split(' ');
  const targetSplit = target.replace(/\n/g, ' ').split(' ');
  const comparedSourceVsTarget = sourceSplit.map(word => {
    const sourceWordInTarget = targetSplit.includes(word);
    const partOfSpeech = typeOfWord(word)[0] || [];
    return {
      word,
      sourceWordInTarget,
      partOfSpeech
    };
  });
  return comparedSourceVsTarget;
};

const compareTargetToSource = (source, target) => {
  const sourceSplit = source.replace(/\n/g, ' ').split(' ');
  const targetSplit = target.replace(/\n/g, ' ').split(' ');
  const comparedTargetVsSource = targetSplit.map(word => {
    const targetWordInSource = sourceSplit.includes(word);
    const partOfSpeech = typeOfWord(word)[0] || [];
    return {
      word,
      targetWordInSource,
      partOfSpeech
    };
  });
  return comparedTargetVsSource;
};

export const summary = (source, target) => {
  const sourceVsTarget = compareSourceToTarget(source, target);
  const targetVsSource = compareTargetToSource(source, target);
  const skillsYouHaveAndInJobDescription = uniq(
    sourceVsTarget
      .filter(
        obj => obj.sourceWordInTarget && obj.partOfSpeech.includes('Noun')
      )
      .map(obj => obj.word)
  );
  // const skillsYouHaveAndNotInJobDescription = uniq(
  //   sourceVsTarget
  //     .filter(
  //       obj => !obj.sourceWordInTarget && obj.partOfSpeech.includes('Noun')
  //     )
  //     .map(obj => obj.word)
  // );
  const skillsYouDoNotHaveAndInJobDescription = uniq(
    targetVsSource
      .filter(
        obj => !obj.targetWordInSource && obj.partOfSpeech.includes('Noun')
      )
      .map(obj => obj.word)
  );
  // const fluffInJobDescription = uniq(
  //   targetVsSource
  //     .filter(
  //       obj => !obj.targetWordInSource && !obj.partOfSpeech.includes('Noun')
  //     )
  //     .map(obj => obj.word)
  // );
  const percentSkillsMatching =
    skillsYouHaveAndInJobDescription.length /
      (skillsYouHaveAndInJobDescription.length +
        skillsYouDoNotHaveAndInJobDescription.length) || 0;

  return {
    skillsYouHaveAndInJobDescription,
    // skillsYouHaveAndNotInJobDescription,
    skillsYouDoNotHaveAndInJobDescription,
    // fluffInJobDescription,
    percentSkillsMatching
  };
};
