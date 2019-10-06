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
  if (!/\/|\\$/.test(path)) path += "/";
  let name = app.activeDocument.name.replace(/\.[\w]*/, ".svg");
  const thisFile = new File(path + name);
  const type = ExportType.WOSVG;
  app.activeDocument.exportFile(thisFile, type, setOptionsForSVGExport());
  return path + name;
}

function getPathItemCount() {
  return app.activeDocument.pathItems.length;
}
