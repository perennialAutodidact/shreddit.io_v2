# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### General Settings
- [x] key
- [ ] start/end frets
- [x] instrument
- [x] tuning

### Scale Explorer
- [x] Select scale name
- [x] Play back scale
- [ ] Highlight notes as they play back

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