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
    var targetFile = ctx.opts.projectRoot+"/platforms/android/src/"+appdir+"/GCMIntentService.java";

    fs.unlink( targetFile, function(err) {
        // err interessiert hier nicht, wenn die Datei nich da war
        promise.resolve();
    } );

    return promise.promise;
};