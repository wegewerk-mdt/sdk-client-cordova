module.exports = function(ctx) {
    // Nur wenn android platform gebaut wird
    if (ctx.opts.cordova.platforms.indexOf('android') < 0) {
        return;
    }
    var fs = ctx.requireCordovaModule('fs'),
        cordova_util = ctx.requireCordovaModule("cordova-lib/src/cordova/util"),
        ConfigParser = ctx.requireCordovaModule("cordova-lib/src/configparser/ConfigParser"),
        projectRoot = cordova_util.isCordova(),
        xml = cordova_util.projectConfig(projectRoot),
        cfg = new ConfigParser(xml);


    var packageName = cfg.packageName();
    var sourceFile = ctx.opts.plugin.dir+"/src/android/GCMIntentService.java";
    var targetFile = ctx.opts.projectRoot+"/platforms/android/src/com/igmetall/kongressapp/GCMIntentService.java";

    var filecontents = fs.readFileSync(sourceFile,{encoding:'utf8'});
    filecontents = filecontents.replace('package com.littlepostman.cordova.plugin;', 'package '+packageName+';');
    fs.writeFileSync(targetFile, filecontents);

    return true;
};