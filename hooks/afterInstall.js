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
        cfg = new ConfigParser(xml),
        promise = ctx.requireCordovaModule('q').defer();


    var packageName = cfg.packageName();
    var appdir = packageName.split('.').join('/');
    var sourceFile = ctx.opts.plugin.dir+"/src/android/GCMIntentService.java";
    var targetFile = ctx.opts.projectRoot+"/platforms/android/src/"+appdir+"/GCMIntentService.java";

    var filecontents = fs.readFileSync(sourceFile,{encoding:'utf8'});
    filecontents = filecontents.replace('package com.littlepostman.cordova.plugin;', 'package '+packageName+';');
    fs.writeFile(targetFile, filecontents, function(err){
        if(err) {
            promise.reject(err);
        } else {
            promise.resolve();
        };
    });

    return promise.promise;
};