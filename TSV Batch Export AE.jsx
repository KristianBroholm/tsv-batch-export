/**
* Script: TSV Batch Export
* Description: Simple utility script for Adobe After Effects to populate and export compositions with spreadsheet data.
* Author: Kristian Broholm
* License: GNU GPL-3.0
*/ 

(function(){

    Array.prototype.includes = function(obj) {
    var i = this.length;
        while (i--) {
            if (this[i] === obj) { return true; }
        }
        return false;
    }

    var renderQueue = app.project.renderQueue;
    var projectItems = app.project.items;
    var selectedItem = app.project.activeItem;
    var comp;

    var file = File.openDialog("Please select TSV file to process");
    if (!file) return alert('TSV Batch Export was cancelled by user.');

    var tsvData = [];

    file.open("r");
    do {
        tsvData.push(file.readln());
    } while(!file.eof);
    file.close();

    if (tsvData.length === 0) return alert("Selected file is empty!")

    var outputFolder = Folder.selectDialog("Please select folder for output");

    if (!outputFolder) return alert('TSV Batch Export was cancelled by user.');

    var data = []
    var properties = tsvData[0].split("\t");

    for(var i = 1; i < tsvData.length; i++) {

        var values = tsvData[i].split("\t");
        var obj = {}
        for(var a = 0; a < values.length; a++) {
            var key = properties[a];
            var value = values[a];
            obj[key] = value;
        }
        data.push(obj);
    }

    for(var i = 0; i < data.length; i++) {
        var entry = data[i];

        if (entry['render']) { if (entry['render'] == 'FALSE') continue; }

        if (entry['comp']) {
            for (var e = 1; e < projectItems.length+1; e++) {
                var currentItem = app.project.item(e);
                if (currentItem.typeName == "Composition" && currentItem.name == entry['comp']) {
                    comp = currentItem;
                    break;
                }
            }
            if (!comp) return alert('Composition ' + entry['comp'] + ' was not found!');
        } else {
            comp = selectedItem;
        }

        if (comp.typeName !== "Composition") return alert('Please select a composition!');

        var essentialProperties = comp.layer(1).property("Essential Properties");
       
        for(var x = 0; x < properties.length; x++) {
            var property = properties[x];
            var essentialProperty = essentialProperties.property(property);
            if (!essentialProperty) continue;
            essentialProperty.setValue(entry[property]);
        }

        var renderQueueItem = renderQueue.items.add(comp);
        var filename = entry['filename'] ? entry['filename'] : comp.name + '_' + (i+1);
        var preset = entry['preset'] ? entry['preset'] : 'Lossless with Alpha';
        var templates = renderQueueItem.outputModule(1).templates;
        var templateExists = templates.includes(preset);
        if (!templateExists) return alert('Template ' + preset + ' doesn\'t exist!');

        renderQueueItem.outputModule(1).applyTemplate(preset);
        renderQueueItem.outputModule(1).file = File(outputFolder.absoluteURI + '/' + filename);
        renderQueue.render();
    }
})();