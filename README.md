# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### General Settings
- [x] key
- [ ] start/end frets
- [x] instrument
- [x] tuning

### Scale Explorer
- [x] select scale name
- [ ] play back scale, highlighting notes as they play back

### Chord Explorer
- [ ] Select chord name, quality
- [ ] click frets to add/remove notes, recalculate chord with new notes
- [ ] inversions?

### Progression Builder
- [ ] select chord and quality
- [ ] select compatible scales
- [ ] play back progression, showing selected compatible scales on the neck as chord change
- [ ] display current chord/scale name and next chord/scale name
- [ ] chord durations (whole notes, half notes, quarter notes, triplets, dotted notes)
- [ ] tempo (bpm)

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