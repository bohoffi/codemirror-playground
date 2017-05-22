/**
 * Created by HOFFM59 on 22.05.2017.
 */

export const TAGS: any = {
  '!top': ['measure'],
  measure: {
    attrs: {
      number: null,
      width: null
    },
    children: ['note']
  },
  note: {
    attrs: {
      'default-x': null
    },
    children: ['pitch', 'duration', 'voice', 'type', 'stem', 'beam', 'notations']
  },
  pitch: {
    children: ['step', 'octave']
  },
  stem: {
    attrs: {
      'default-y': null
    }
  },
  beam: {
    attrs: {
      number: null
    }
  },
  notations: {
    children: ['technical']
  },
  technical: {
    children: ['string', 'fret']
  }
};
