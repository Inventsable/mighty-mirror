onmessage = function(e) {};

function parseCode(content, prefs) {
  console.log("Parsing...");
  // Should be separate
  content = prefs.noDataNames
    ? content.replace(/data-name\=\"\.[^\"]*\"\s/gm, "")
    : content;
  content = prefs.noDataNames
    ? content.replace(/\sdata\-name\=\".*\"(?=\>)/gm, "")
    : content;
  content = prefs.hasClassPrefix
    ? content.replace(/cls\-/gm, `${prefs.defaultClassPrefix}-`)
    : content;
  content = prefs.useClasses ? replaceClasses(content) : content;

  // return Promise.resolve(content);
  // return content;
  postMessage(content);
}

function replaceClasses(content) {
  let classLineRX = /\<\w*\sid\=\"\_\.[^\"]*\".*\>/gm;
  let idmatch = /id\=\"\_\.([^\"]*)\"/;
  let classmatch = /class\=\"([^\"]*)\"/;

  let allID = /id\=\"[^\"]*\"\s/gm;
  let allClass = /class\=\"[^\"]*\"/gm;

  let targs = content.match(classLineRX);
  targs.forEach(match => {
    let original = match;
    let idmatcher = original.match(idmatch);
    let newclass = idmatcher[1];
    let classmatcher = original.match(classmatch);
    let oldclass = classmatcher[1];
    let classString = `class="${newclass} ${oldclass}"`;
    // console.log(classString);
    match = match.replace(allID, "");
    match = match.replace(allClass, classString);

    content = content.replace(original, match);
  });
  console.log("Worker is finished");
  return content;
}
