# Crystalsystem Module
Im Kristallsystemmodul können die 7 Modelle der Kristallsysteme angezeigt werden.
Die Modelle werden mit threejs in einem iFrame gerendert, da threejs nicht so gut mit Angular/Typescript zusammenarbeitet. 
Im Angular Modul `CrystalsystemModule` gibt es nur eine Komponente, die den iFrame erzeugt und globale Javascriptfunktionen in diesem aufruft, um folgende Anzeigeeinstellungen zu ermöglichen:
* Koordinatenachsen (an/aus)
* Eckpunkte (an/aus)
* Flächen (an/aus)
* Spezialebenen (kein/100/110/111)
* Umschalten zwischen perspektivischer und isometrischer (orthographischer) Ansicht

Der eigentliche Code dazu findet sich in `assets/crystalsystem`. In der `iframe.html` ist eine einfache HTMl-Struktur, die notwendiges Javascript einbindet.
In dem Ordner `assets/crystalsystem/geometry` findet sich pro Model eine Datei, in der die Modelle definiert werden.
Im Ordner `assets/crystalsystem/js` finden sich alle weiteren Javascriptdateien. Bis auf die `renderer.js` handelt es sich um Bestandteile von threejs.
In der `renderer.js` wird das threejs Modell erzeugt und angezeigt. Außerdem finden sich dort die Funktionen, die vom Angular-Code aufgerufen werden können. An die Definitionen der Modelle kommt das Script, weil die entsprechenden Variablen aus den anderen Javascriptdateien jeweils in der globalen Scope landen.


