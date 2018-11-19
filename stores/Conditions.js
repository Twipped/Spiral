
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Emotions from '../Icons/Emotions';
import {
  MB_EMOJI_SIZE,
  COLOR_RED,
  COLOR_ORANGE,
  COLOR_YELLOW,
  COLOR_GREEN,
  COLOR_BLUE,
} from '../constants';

function first (array, iteratee) {
  for (const item of array) {
    const r = iteratee(item);
    if (r) return item;
    if (r === false) return;
  }
}

class Conditions {

  byName = new Map();
  byKey = new Map();
  byClass = new Map();
  byToggle = new Map();
  toggleMap = new Map();

  add (condition) {
    const { name, className } = condition;
    const key = condition.key || `${condition.className}/${name}`;
    condition.key = key;

    this.byKey.set(key, condition);

    this.byName.set(name, condition);

    if (!this.byClass.has(className)) {
      this.byClass.set(className, new Set());
    }
    this.byClass.get(className).add(name);

    if (condition.toggles) {
      for (const [ toggleName, toggleLabel ] of condition.toggles) {
        this.toggleMap.set(toggleName, toggleLabel);
        this.byToggle.set(toggleName, condition);
      }
    }
  }

  getByName (name, state) {
    const condition = this.byName.get(name);
    if (!condition) return undefined;
    return state ? this.applyState(condition, state) : condition;
  }

  getByKey (key, state) {
    const condition = this.byKey.get(key);
    if (!condition) return undefined;
    return state ? this.applyState(condition, state) : condition;
  }

  getByToggle (toggle) {
    return this.byToggle.get(toggle);
  }

  applyState (condition, state) {
    const key = condition.key;
    let value = state && state.get(key);
    let valueLabel = null;

    if (value === undefined) value = null;

    if (condition.toggles) {
      value = [];
      valueLabel = [];
      if (state) {
        for (const [ toggleName, toggleLabel ] of condition.toggles) {
          if (state.get(toggleName)) {
            value.push(toggleName);
            valueLabel.push(toggleLabel);
          }
        }
      }

    } else if (value !== null) {
      if (condition.options) {
        valueLabel = first(condition.options, ([ v, l ]) =>
          (v === value ? l : null)
        )[1];

      } else {
        valueLabel = value;
      }
    }

    return { ...condition, value, valueLabel };
  }

  getByClass (className, state) {
    const set = this.byClass.get(className);
    if (!set) return {};
    const result = {};
    set.forEach((name) => {
      result[name] = this.get(name, state);
    });
    return result;
  }

  getToggleLabel (toggleKey) {
    return this.toggleMap.get(toggleKey);
  }

}

const conditions = new Conditions();

export default conditions;

/** Mind **************************************************************************************************************/

conditions.add({
  name: 'appetite',
  className: 'Mind',
  caption: 'Appetite',
  type: 'PlusMinus',
  options: [
    [ -2, 'Absent', <MaterialIcons name="exposure-neg-2" size={MB_EMOJI_SIZE} color="white" /> ],
    [ -1, 'Reduced', <MaterialIcons name="exposure-neg-1" size={MB_EMOJI_SIZE} color="white" /> ],
    [  0, 'Average' ],
    [  1, 'Increased', <MaterialIcons name="exposure-plus-1" size={MB_EMOJI_SIZE} color="white" /> ],
    [  2, 'Ravenous', <MaterialIcons name="exposure-plus-2" size={MB_EMOJI_SIZE} color="white" /> ],
  ],
  default: 0,
});

conditions.add({
  name: 'emotional-stability',
  className: 'Mind',
  caption: 'Emotional Stability',
  type: 'PlusMinus',
  description: 'How rapidly are you shifting between strong moods.',
  options: [
    [  0, 'Stable' ],
    [ -1, 'Unstable' ],
    [ -2, 'Wild' ],
  ],
  default: 0,
});

conditions.add({
  name: 'sex-crave',
  className: 'Mind',
  caption: 'Sexual Thirst',
  type: 'PlusMinus',
  tags: [ 'Allosexual' ],
  description: 'How strongly do you crave physical attention.',
  options: [
    [ -1, 'Stay Away', <FontAwesome name="minus-circle" size={MB_EMOJI_SIZE} color={COLOR_RED} />  ],
    [  0, 'Apathetic', <FontAwesome name="circle" size={MB_EMOJI_SIZE} color="yellow" /> ],
    [  1, 'Thirsty',   <FontAwesome name="plus-circle" size={MB_EMOJI_SIZE} color={COLOR_GREEN} />  ],
  ],
  default: 0,
});

conditions.add({
  name: 'sex-drive',
  className: 'Mind',
  caption: 'Sex Drive',
  type: 'PlusMinus',
  tags: [ 'Allosexual' ],
  description: 'How strong is your desire to initiate sex.',
  options: [
    [ -1, 'Absent', <FontAwesome name="minus-circle" size={MB_EMOJI_SIZE} color={COLOR_RED} /> ],
    [  0, 'Normal', <FontAwesome name="circle" size={MB_EMOJI_SIZE} color="yellow" /> ],
    [  1, 'Horny',  <FontAwesome name="plus-circle" size={MB_EMOJI_SIZE} color={COLOR_GREEN} /> ],
  ],
  default: 0,
});

conditions.add({
  name: 'gender-dysphoria',
  className: 'Mind',
  caption: 'Gender Dysphoria',
  type: 'PlusMinus',
  tags: [ 'Transgender' ],
  options: [
    [  2, 'Euphoric' ],
    [  1, 'None' ],
    [  0, 'Average' ],
    [ -2, 'High' ],
  ],
  default: 0,
});

conditions.add({
  name: 'vocal-quality',
  className: 'Mind',
  caption: 'Vocal Tone Quality',
  type: 'PlusMinus',
  tags: [ 'Transgender' ],
  description: 'How satisfied are you with the quality of your voice?',
  options: [
    [  2, 'Excellent' ],
    [  1, 'Good' ],
    [  0, 'Acceptable' ],
    [ -2, 'Awful' ],
  ],
  default: 0,
});

conditions.add({
  name: 'social-anxiety',
  className: 'Mind',
  caption: 'Social Anxiety',
  type: 'PlusMinus',
  options: [
    [  0, 'None'  ],
    [ -1, 'Low'  ],
    [ -2, 'High'  ],
  ],
  default: 0,
});

conditions.add({
  name: 'body-confidence',
  className: 'Mind',
  caption: 'Body Confidence',
  type: 'PlusMinus',
  options: [
    [  2, 'Very Good', <Emotions.VeryHappy height={MB_EMOJI_SIZE} color="white" /> ],
    [  1, 'Good',      <Emotions.Happy height={MB_EMOJI_SIZE} color="white" /> ],
    [  0, 'Average',   <Emotions.Neutral height={MB_EMOJI_SIZE} color="white" /> ],
    [ -1, 'Poor',      <Emotions.Uncomfortable height={MB_EMOJI_SIZE} color="white" /> ],
    [ -2, 'Very Poor', <Emotions.Sad height={MB_EMOJI_SIZE} color="white" /> ],
  ],
  default: 0,
});

conditions.add({
  name: 'general-mood',
  className: 'Mind',
  caption: 'General Mood',
  type: 'PlusMinus',
  options: [
    [  2, 'Very Happy', <Emotions.VeryHappy height={MB_EMOJI_SIZE} color="white" /> ],
    [  1, 'Happy',      <Emotions.Happy height={MB_EMOJI_SIZE} color="white" /> ],
    [  0, 'Neutral',    <Emotions.Neutral height={MB_EMOJI_SIZE} color="white" /> ],
    [ -1, 'Unhappy',    <Emotions.Uncomfortable height={MB_EMOJI_SIZE} color="white" /> ],
    [ -2, 'Sad',        <Emotions.Sad height={MB_EMOJI_SIZE} color="white" /> ],
  ],
  default: 0,
});

/** Body **************************************************************************************************************/

conditions.add({
  name: 'body:head-neck',
  className: 'Body',
  caption: 'Head and Neck',
  type: 'TogglePanel',
  toggles: [
    [ 'Body/Headache',    'Headache' ],
    [ 'Body/Migraine',    'Migraine' ],
    [ 'Body/Neck Pain',   'Neck Pain' ],
    [ 'Body/Lightheaded', 'Lightheaded' ],
    [ 'Body/Dizziness',   'Dizziness' ],
    [ 'Body/Hair Loss',   'Hair Loss' ],
  ],
});

conditions.add({
  name: 'body:chest',
  className: 'Body',
  caption: 'Abdomen and Digestion',
  type: 'TogglePanel',
  toggles: [
    [ 'Body/Breast Swelling',  'Breast Swelling' ],
    [ 'Body/Tenderness',       'Tenderness' ],
    [ 'Body/Breast Pain',      'Breast Pain' ],
  ],
});

conditions.add({
  name: 'body:abdomen-digestion',
  className: 'Body',
  caption: 'Abdomen and Digestion',
  type: 'TogglePanel',
  toggles: [
    [ 'Body/Cramping',      'Cramping' ],
    [ 'Body/Bloating',      'Bloating' ],
    [ 'Body/Pressure Pain', 'Pressure Pain' ],
    [ 'Body/Stomach Ache',  'Stomach Ache' ],
    [ 'Body/Indigestion',   'Indigestion' ],
    [ 'Body/Gas',           'Gas' ],
    [ 'Body/Constipation',  'Constipation' ],
    [ 'Body/Loose Stool',   'Loose Stool' ],
    [ 'Body/Diarrhea',      'Diarrhea' ],
  ],
});

conditions.add({
  name: 'body:menses',
  className: 'Body',
  caption: 'Menstrual Discharge',
  type: 'PlusMinus',
  tags: [ 'Menstruation' ],
  options: [
    [ 0, 'Nothing' ],
    [ 1, 'Spotting' ],
    [ 2, 'Light' ],
    [ 3, 'Medium' ],
    [ 4, 'Heavy' ],
  ],
});

conditions.add({
  name: 'body:general-maladies',
  className: 'Body',
  caption: 'General Maladies',
  type: 'TogglePanel',
  toggles: [
    [ 'Body/Body Aches', 'Body Aches' ],
    [ 'Body/Nausea', 'Nausea' ],
    [ 'Body/Hot Flashes', 'Hot Flashes' ],
    [ 'Body/Joint Pain', 'Joint Pain' ],
    [ 'Body/Tight Muscles', 'Tight Muscles' ],
    [ 'Body/Numbness', 'Numbness' ],
  ],
});

conditions.add({
  name: 'sleep',
  className: 'Body',
  caption: 'Sleep Quality',
  description: 'How well did you sleep last night?',
  type: 'PlusMinus',
  options: [
    [ -1, 'Poor' ],
    [  0, 'OK' ],
    [  1, 'Good' ],
  ],
});

conditions.add({
  name: 'energy',
  className: 'Body',
  caption: 'Energy Level',
  type: 'PlusMinus',
  options: [
    [ -2, 'Very Low', <MaterialIcons name="exposure-neg-2" size={MB_EMOJI_SIZE} color="white" /> ],
    [ -1, 'Low', <MaterialIcons name="exposure-neg-1" size={MB_EMOJI_SIZE} color="white" /> ],
    [  0, 'Average' ],
    [  1, 'High', <MaterialIcons name="exposure-plus-1" size={MB_EMOJI_SIZE} color="white" /> ],
    [  2, 'Very High', <MaterialIcons name="exposure-plus-2" size={MB_EMOJI_SIZE} color="white" /> ],
  ],
  default: 0,
});

conditions.add({
  name: 'temperature',
  className: 'Body',
  caption: 'Basal Body Temperature',
  type: 'Temperature',
});

conditions.add({
  name: 'weight',
  className: 'Body',
  caption: 'Weight',
  type: 'Decimal',
});

/** Anger *************************************************************************************************************/

conditions.add({
  name: 'anger:1',
  className: 'Anger',
  type: 'TogglePanel',
  fillColor: COLOR_RED,
  textColor: '#fceaea',
  toggles: [
    [ 'Anger/Disrespected', 'Disrespected' ],
    [ 'Anger/Embarrassed',  'Embarrassed' ],
    [ 'Anger/Persecuted',   'Persecuted' ],
    [ 'Anger/Bitter',       'Bitter' ],
    [ 'Anger/Disgruntled',  'Disgruntled' ],
    [ 'Anger/Indignant',    'Indignant' ],
    [ 'Anger/Horrified',    'Horrified' ],
    [ 'Anger/Violated',     'Violated' ],
    [ 'Anger/Frustrated',   'Frustrated' ],
    [ 'Anger/Aggressive',   'Aggressive' ],
    [ 'Anger/Annoyed',      'Annoyed' ],
    [ 'Anger/Hostile',      'Hostile' ],
    [ 'Anger/Jealous',      'Jealous' ],
    [ 'Anger/Envious',      'Envious' ],
    [ 'Anger/Spiteful',     'Spiteful' ],
  ],
});

conditions.add({
  name: 'anger',
  className: 'Anger',
  type: 'TogglePanel',
  fillColor: COLOR_RED,
  textColor: '#fceaea',
  toggles: [
    [ 'Anger/Angry', 'Angry' ],
  ],
});

/** Anxiety ***********************************************************************************************************/

conditions.add({
  name: 'anxiety:3',
  className: 'Anxiety',
  type: 'TogglePanel',
  fillColor: COLOR_YELLOW,
  textColor: '#000099',
  toggles: [
    [ 'Anxiety/Stressed',    'Stressed' ],
    [ 'Anxiety/Overwhelmed', 'Overwhelmed' ],
    [ 'Anxiety/Rushed',      'Rushed' ],
  ],
});

conditions.add({
  name: 'anxiety:2',
  className: 'Anxiety',
  type: 'TogglePanel',
  fillColor: COLOR_YELLOW,
  textColor: '#000099',
  toggles: [
    [ 'Anxiety/Nervous',     'Nervous' ],
    [ 'Anxiety/Insecure',    'Insecure' ],
    [ 'Anxiety/Worried',     'Worried' ],
    [ 'Anxiety/Emotional',   'Emotional' ],
    [ 'Anxiety/Fear',        'Fear' ],
    [ 'Anxiety/Guilt',       'Guilt' ],
  ],
});

conditions.add({
  name: 'anxiety:1',
  className: 'Anxiety',
  type: 'TogglePanel',
  fillColor: COLOR_YELLOW,
  textColor: '#000099',
  toggles: [
    [ 'Anxiety/Impatient',   'Impatient' ],
    [ 'Anxiety/Tired',       'Tired' ],
    [ 'Anxiety/Unfocused',   'Unfocused' ],
    [ 'Anxiety/Distracted',  'Distracted' ],
  ],
});

conditions.add({
  name: 'anxiety',
  className: 'Anxiety',
  type: 'TogglePanel',
  fillColor: COLOR_ORANGE,
  textColor: '#000099',
  toggles: [
    [ 'Anxiety/Anxious', 'Anxious' ],
  ],
});

/** Neutral ***********************************************************************************************************/

conditions.add({
  name: 'neutral:1',
  className: 'Neutral',
  type: 'TogglePanel',
  fillColor: COLOR_YELLOW,
  textColor: '#000',
  toggles: [
    [ 'Neutral/Apathetic',   'Apathetic' ],
    [ 'Neutral/Numb',        'Numb' ],
    [ 'Neutral/Bored',       'Bored' ],
    [ 'Neutral/Blah',        'Blah' ],
    [ 'Neutral/Empty',       'Empty' ],
    [ 'Neutral/Unmotivated', 'Unmotivated' ],
  ],
});

conditions.add({
  name: 'neutral',
  className: 'Neutral',
  type: 'TogglePanel',
  fillColor: COLOR_YELLOW,
  textColor: '#000',
  toggles: [
    [ 'Neutral/Neutral', 'Neutral' ],
  ],
});

/** Joy ***********************************************************************************************************/

conditions.add({
  name: 'joy:4',
  className: 'Joy',
  type: 'TogglePanel',
  fillColor: COLOR_GREEN,
  textColor: '#000',
  toggles: [
    [ 'Joy/Confident',  'Confident' ],
    [ 'Joy/Proud',      'Proud' ],
    [ 'Joy/Motivated',  'Motivated' ],
    [ 'Joy/Inspired',   'Inspired' ],
    [ 'Joy/Courageous', 'Courageous' ],
  ],
});

conditions.add({
  name: 'joy:3',
  className: 'Joy',
  type: 'TogglePanel',
  fillColor: COLOR_GREEN,
  textColor: '#000',
  toggles: [
    [ 'Joy/Loving',     'Loving' ],
    [ 'Joy/Thankful',   'Thankful' ],
    [ 'Joy/Intimate',   'Intimate' ],
    [ 'Joy/Frisky',     'Frisky' ],
    [ 'Joy/Cheeky',     'Cheeky' ],
    [ 'Joy/Playful',    'Playful' ],
  ],
});


conditions.add({
  name: 'joy:2',
  className: 'Joy',
  type: 'TogglePanel',
  fillColor: COLOR_GREEN,
  textColor: '#000',
  toggles: [
    [ 'Joy/Excited',    'Excited' ],
    [ 'Joy/Energetic',  'Energetic' ],
    [ 'Joy/Hopeful',    'Hopeful' ],
    [ 'Joy/Curious',    'Curious' ],
  ],
});

conditions.add({
  name: 'joy:1',
  className: 'Joy',
  type: 'TogglePanel',
  fillColor: COLOR_GREEN,
  textColor: '#000',
  toggles: [
    [ 'Joy/Calm',       'Calm' ],
    [ 'Joy/Content',    'Content' ],
    [ 'Joy/Peaceful',   'Peaceful' ],
  ],
});

conditions.add({
  name: 'joy',
  className: 'Joy',
  type: 'TogglePanel',
  fillColor: COLOR_GREEN,
  textColor: '#000',
  toggles: [
    [ 'Joy/Happy', 'Happy' ],
  ],
});

/** Sad ***********************************************************************************************************/

conditions.add({
  name: 'sad:1',
  className: 'Sad',
  type: 'TogglePanel',
  fillColor: COLOR_BLUE,
  textColor: '#000',
  toggles: [
    [ 'Sad/Rejected',      'Rejected' ],
    [ 'Sad/Ignored',       'Ignored' ],
    [ 'Sad/Vulnerable',    'Vulnerable' ],
    [ 'Sad/Lonely',        'Lonely' ],
    [ 'Sad/Isolated',      'Isolated' ],
    [ 'Sad/Abandoned',     'Abandoned' ],
    [ 'Sad/Fragile',       'Fragile' ],
    [ 'Sad/Grief',         'Grief' ],
    [ 'Sad/Weepy',         'Weepy' ],
    [ 'Sad/Anguish',       'Anguish' ],
    [ 'Sad/Despair',       'Despair' ],
    [ 'Sad/Powerless',     'Powerless' ],
    [ 'Sad/Guilt',         'Guilt' ],
    [ 'Sad/Shame',         'Shame' ],
    [ 'Sad/Embarrassed',   'Embarrassed' ],
    [ 'Sad/Disappointed',  'Disappointed' ],
    [ 'Sad/Disillusioned', 'Disillusioned' ],
    [ 'Sad/Depressed',     'Depressed' ],
    [ 'Sad/Defeated',      'Defeated' ],
  ],
});

conditions.add({
  name: 'sad',
  className: 'Sad',
  type: 'TogglePanel',
  fillColor: COLOR_BLUE,
  textColor: '#000',
  toggles: [
    [ 'Sad/Sad', 'Sad' ],
  ],
});
