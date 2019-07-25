function setOptionsForSVGExport() {
    var options = new ExportOptionsWebOptimizedSVG();
    options.artboardRange = 1;
    options.coordinatePrecision = 2;
    options.fontType = SVGFontType.OUTLINEFONT;
    options.svgId = SVGIdType.SVGIDREGULAR;
    options.cssProperties = SVGCSSPropertyLocation.STYLEELEMENTS;
    return options;
}
function quickExportSVG(path) {
    if (!/\/|\\$/.test(path))
        path += "/";
    var name = app.activeDocument.name.replace(/\.[\w]*/, ".svg");
    var thisFile = new File(path + name);
    var type = ExportType.WOSVG;
    app.activeDocument.exportFile(thisFile, type, setOptionsForSVGExport());
    return path + name;
}
