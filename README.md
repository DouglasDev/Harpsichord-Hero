# Harpsichord-Hero

Games based around playing an electronic instrument such as 'Guitar Hero' give non-musicians a taste of what it's like to play music in an ensemble. However, since the player is limited to playing a predefined pattern of notes with no control over tempo, dynamics, or rhythm, opportunites for creative play are limited. 

Harpsichord hero is a new type of music game. The player selects notes highlighted in yellow with the mouse. Only notes in the current chord can be selected so it is impossible to play out of key. Preprogrammed musical motifs can be played with the alphabet keys, and new motifs can be added easily. The game has no goal or score. The player is free to play whatever their heart desires. True self-expression through music can be realized for people with no musical training.

Currently there is only one song available, Vivaldi's Largo from the Four Seasons, Winter. New songs and motifs can be programmed into the scales_and_chord.js file. The songs are written as arrays with each element containing a chord, duration, and scale. A midi file containing musical accompanyment can also be added. All tracks in the midi should be set to play on instrument channel 1. BPM sets the tempo of the song. Motifs are are written as arrays with each element containing the scale degree relative to the currently selected note and the time offset from the start of the motif.

The code really needs to be refactored but the program works as a proof of concept.

Uses the Soundfont Player, Teoria, and Midi Player JS libraries.
