# Shreddit.io v2

Shreddit.io is a tool for musicians to explore scales and chords on a variety of instruments. 

## Features
 ## Scale Explorer
Visualize scales on various stringed instruments. Playback scale audio with visual feedback on the neck.

### General Settings
- [x] Key
- [x] Start/end frets
- [x] Instrument
- [x] Tuning
- [ ] Color Blind Mode
  - [ ] Replace circle markers with 12 unique shapes
  - [ ] Color-blind palettes
  - [ ] High-contrast text border

### Scale Explorer
- [x] Select scale name
- [x] Play back scale
- [x] Highlight notes as they play back
- [ ] Rhythm UI
  - [ ] See `wireframes/rhythm_ui.svg`

### Chord Explorer
- [ ] Select chord name, quality
- [ ] Click frets to add/remove notes, recalculate chord with new notes
- [ ] Inversions?

### Progression Builder
- [ ] Select chord and quality
- [ ] Select compatible scales
- [ ] Play back progression, showing selected compatible scales on the neck as chord change
- [ ] Display current chord/scale name and next chord/scale name
- [ ] Chord durations (whole notes, half notes, quarter notes, triplets, dotted notes)
- [ ] Tempo (bpm)

### To Do:
- [ ] Fix styling for mobile screens in landscape orientation
- [ ] Add setting to switch colored note markers to colored note names

### Resources 
[Rhythms in ToneJS](https://www.guitarland.com/MusicTheoryWithToneJS/PlayRhythms.html) 

### Tests

Tests were originally written in Jest / React Testing Library, but due to the lack of browser-specific APIs required for ToneJS, such as the Web Audio API, tests have been switched to use Cypress.

Currently only unit and integration tests exist, but end-to-end tests will be added as the app progresses.

To run integration / unit tests:

```
$ yarn test --component
```

To run e2e tests:
```
$ yarn test
```

To run integration / unit tests in the Cypress GUI:
```
$ yarn cypress --component
```

To run e2e tests in the Cypress GUI:
```
$ yarn cypress
```