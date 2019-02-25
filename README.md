[#Live Demo](https://douglasdev.github.io/projects/harpsichordHero/index.html)

![screenshot](https://i.ibb.co/VtLwQ9x/screenshot.png)

# Harpsichord-Hero

Games based around playing an electronic instrument such as Guitar Hero give non-musicians a taste of what it's like to play music in an ensemble. However, since the player is limited to playing a predefined pattern of notes with no control over tempo, dynamics, or rhythm, opportunites for creative play are limited. 

Harpsichord Hero is a new type of music game, where the goal is creative expression, rather that technical ability. Since the game has no goal or score, the player is free to play whatever their heart desires. The app is designed so that it is nearly impossible for the player to play a note that sounds out of key. This encourages musical experimentation, and allows for true self-expression through music, even for people with no musical background.

There are several ways to control the instrument: The player can press the number keys which corrospond to the notes of the current chord. Single notes can be played by clicking with the mouse. Preprogrammed musical motifs can be played with the top two rows of the alphabet keys, and new motifs can be added easily. The starting note of the motif is selected by holding down the spacebar and moving the mouse. The motifs can be inverted with the shift key, and can be played in a sequence which ascends by default, or descends if the tab key is held. Different rhythms can be applied to the motifs using the bottom row of arrow keys. The notes in each motif will automatically adjust so that they harmonize well with the current chord.

New songs and motifs can be programmed into the scales_and_chord.js file. The songs are written as arrays with each element containing a chord, duration, and scale. A midi file containing musical accompanyment can also be added. All tracks in the midi should be set to play on instrument channel 1. BPM sets the tempo of the song. Motifs are are written as arrays with each element containing the scale degree relative to the currently selected note and the time offset from the start of the motif.

Uses the Soundfont Player, Teoria, and Midi Player JS libraries. Visualizations are created with the HTML Canvas.
