const colorPicker = document.getElementById('colorPicker');
const hexValue = document.getElementById('hexValue');
const recentColorsContainer = document.getElementById('recentColors');
const paletteSizeSlider = document.getElementById('paletteSizeSlider');
const backgroundOpacitySlider = document.getElementById('backgroundOpacitySlider');
const paletteSizeValue = document.getElementById('paletteSizeValue');
const backgroundOpacityValue = document.getElementById('backgroundOpacityValue');
const animatedTitle = document.getElementById('animatedTitle');

let selectedColors = []; // Array für die letzten Farben
let lastColorTime = 0;   // Zeitstempel für die letzte hinzugefügte Farbe
let paletteSize = 5;     // Standardgröße der Palette

// Funktion zum Hinzufügen einer neuen Farbe
function addColor(color) {
    const currentTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden

    if (currentTime - lastColorTime >= 300) { // Überprüfen, ob 300ms vergangen sind
        if (selectedColors.length >= paletteSize) {
            selectedColors.shift(); // Entferne die älteste Farbe, wenn die Palette zu groß ist
        }
        selectedColors.push(color); // Neue Farbe hinzufügen
        lastColorTime = currentTime; // Zeitstempel für die letzte Farbe aktualisieren

        displayRecentColors(); // Zeige die neuesten Farben an
    }
}

// Funktion zum Anzeigen der letzten Farben
function displayRecentColors() {
    recentColorsContainer.innerHTML = ''; // Leere den Container

    selectedColors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener('click', () => {
            colorPicker.value = color;
            hexValue.value = color.toUpperCase();
        });
        recentColorsContainer.appendChild(colorDiv);
    });
}

// Aktualisiere die Größe der Palette
paletteSizeSlider.addEventListener('input', (event) => {
    paletteSize = parseInt(event.target.value); // Setze die Palette-Größe basierend auf dem Slider-Wert
    paletteSizeValue.textContent = paletteSize; // Aktualisiere den angezeigten Wert des Sliders

    if (selectedColors.length > paletteSize) {
        selectedColors.length = paletteSize; // Entferne überschüssige Farben
        displayRecentColors(); // Aktualisiere die Anzeige
    }
});

// Hintergrund-Dunkelheit anpassen
backgroundOpacitySlider.addEventListener('input', (event) => {
    const opacity = event.target.value / 100;
    document.getElementById("overlay").style.opacity = opacity; // Setze die Opazität des Overlays
    backgroundOpacityValue.textContent = `${event.target.value}%`; // Zeige den aktuellen Wert des Sliders an
});

// Aktualisieren des HEX-Werts und Hinzufügen der ausgewählten Farbe
colorPicker.addEventListener('input', (event) => {
    const color = event.target.value.toUpperCase();
    hexValue.value = color;
    addColor(color); // Neue Farbe hinzufügen
});

// Zufällige Farbe auswählen (alle möglichen Farben)
animatedTitle.addEventListener('click', () => {
    // Zufällige Farbe generieren (RGB)
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    colorPicker.value = randomColor;
    hexValue.value = randomColor.toUpperCase();
    addColor(randomColor);
});
