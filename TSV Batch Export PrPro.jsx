/**
* Script: TSV Batch Export Premiere (Silent Single Sequence)
* Description: Creates a single sequence and populates it with MOGRT instances from TSV data without user interaction.
* Author: Kristian Broholm (Adapted for Premiere Pro)
* License: GNU GPL-3.0
*/ 

(function(){

    if (!app.project) return alert("Please open a Premiere Pro project first.");

    var file = File.openDialog("Please select TSV file to process");
    if (!file) return alert('TSV Batch Export was cancelled by user.');

    var tsvData = [];

    file.open("r");
    while(!file.eof){
        var line = file.readln();
        if (line && line.length > 0) {
            tsvData.push(line);
        }
    }
    file.close();

    if (tsvData.length === 0) return alert("Selected file is empty!")

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

    // Get the template item from current selection
    var initialSelection = app.getCurrentProjectViewSelection();
    var templateItem;

    if (initialSelection && initialSelection.length > 0) {
        templateItem = initialSelection[0];
    } else {
        return alert("Please select a MOGRT template in the Project panel first.");
    }

    /**
     * Helper to set MGT parameter value (handles JSON for text)
     */
    function setMgtParam(mgtComponent, paramName, newValue) {
        var param = mgtComponent.properties.getParamForDisplayName(paramName);
        if (!param) return false;

        var currentValue = param.getValue();
        // Check if value is JSON (typical for MGT text properties)
        if (currentValue && currentValue.indexOf('{"') !== -1) {
            try {
                var jsonValue = JSON.parse(currentValue);
                if (jsonValue.textEditValue !== undefined) {
                    jsonValue.textEditValue = newValue;
                    if (jsonValue.fontTextRunLength) {
                        jsonValue.fontTextRunLength = [newValue.length];
                    }
                    param.setValue(JSON.stringify(jsonValue), true);
                    return true;
                }
            } catch(e) {}
        }
        
        param.setValue(newValue, true);
        return true;
    }

    var successCount = 0;

    // 1. Create a single sequence for all items silently
    var masterSeqName = file.name.replace(/\.[^\.]+$/, "");
    var targetBin = templateItem.parent || app.project.rootItem;

    // Create sequence using the template item to bypass the preset dialog
    // Third argument ensures the sequence is created in the target bin
    app.project.createNewSequenceFromClips(masterSeqName, [templateItem], targetBin);
    
    var newSeq = app.project.activeSequence;
    if (!newSeq || newSeq.name !== masterSeqName) {
        // Fallback for older versions if the sequence wasn't active immediately
        for (var s = 0; s < app.project.sequences.numSequences; s++) {
            if (app.project.sequences[s].name === masterSeqName) {
                newSeq = app.project.sequences[s];
                break;
            }
        }
    }
    
    if (!newSeq) return alert("Failed to create sequence.");

    var videoTrack = newSeq.videoTracks[0];
    
    // Remove the initial "seed" clip used to create the sequence
    if (videoTrack.clips.numItems > 0) {
        videoTrack.clips[0].remove(false, false);
    }

    var currentTime = new Time();
    currentTime.seconds = 0;

    for(var i = 0; i < data.length; i++) {
        var entry = data[i];

        if (entry['render'] && entry['render'] == 'FALSE') continue;

        // 2. Add the template item to the timeline at the current end point
        videoTrack.overwriteClip(templateItem, currentTime);
        
        // 3. Find the newly inserted clip (last one on the track)
        var clip = videoTrack.clips[videoTrack.clips.numItems - 1];
        
        if (clip) {

            var mgtComponent = clip.getMGTComponent();
            if (mgtComponent) {
                for (var p = 0; p < properties.length; p++) {
                    var propName = properties[p];
                    if (propName === "filename" || propName === "render" || propName === "comp") continue;
                    
                    var val = entry[propName];
                    if (val !== undefined) {
                        setMgtParam(mgtComponent, propName, val);
                    }
                }
                successCount++;
            }
            
            // 4. Update the time for the next clip to be exactly at the end of this one
            currentTime = clip.end;
        }
    }

    alert('Done! Successfully added ' + successCount + ' items to sequence "' + masterSeqName + '".');

})();
