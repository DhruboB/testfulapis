'use strict';

module.exports = function(Data_class) {

 var fs = require('fs');
 var pkgcloud = require('pkgcloud');
 var config = {
    provider: 'openstack',
    useServiceCatalog: true,
    useInternal: false,
    keystoneAuthVersion: 'v3',
    authUrl: 'https://identity.open.softlayer.com',
    tenantId: 'efe29cf578904e139bc4504bafdfd65d',    
    domainId: 'fad8dec66b064775bbb58f6345c13550',
    username: 'admin_63dbe541f3f76d095c53c8b2b8b69cb1d021730f',
    password: 'k5k{jamBF*_?PC1_',
    region: 'dallas',   //dallas or london region
    role: "admin"
  };

  var storageClient = pkgcloud.storage.createClient(config);
  storageClient.auth(function(err) {
      if (err) {
         console.log(err);
      }
      else {
        console.log('successfully connected')
      }
  });

    var multer  = require('multer');
    var mkdirp = require('mkdirp');
    var dest = __dirname+"/tempFiles/";
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        mkdirp(dest, function (err) {
            if (err){
              cb(err, dest);
            } else{
            cb(null, dest);
            }
        });
      },
      filename: function (req, file, cb) {
        cb(null,file.originalname);
      }
    });

  var upload = multer({ storage: storage }).single('file');

  Data_class.uploadFileToObjectStorage = function (req,res, cb) {

     upload(req, res, function(err) {
        if(err){
         res.send(err);
        }else{
         var readStream = fs.createReadStream(dest+req.file.originalname);
        var writeStream = storageClient.upload({
          container: 'BlueBerryPOC1',
          remote: req.file.originalname
        });
        writeStream.on('error', function (err) {
          console.log(err);
        });
        writeStream.on('success', function (file) {
          res.send('successfully uploaded..');
        });
        readStream.pipe(writeStream);
        }
    })

  };
  Data_class.remoteMethod('uploadFileToObjectStorage', {
    http: {path: '/uploadFileToObjectStorage', verb: 'post'},
    accepts: [{arg: 'req', type: 'object', 'http': {source: 'req'}},
              {arg: 'res', type: 'object', 'http': {source: 'res'}}],
    returns: {arg: 'success', type: 'object'},
    description: "upload File To ObjectStorage.Give input key name is:file"
  });


  Data_class.downloadFileFromObjectStorage = function (filenameWithExtension,req,res,cb) {

    if(filenameWithExtension){
        var filePath = __dirname+"/tempFiles/"+filenameWithExtension;
        var stream = fs.createWriteStream(filePath.toString());

       storageClient.auth(function (error) {
          storageClient.download({
            container: 'BlueBerryPOC1',
            remote: filenameWithExtension
          }).pipe(stream);
        });
        stream.on('error', function (err) {
          cb(null,err);
        });
        stream.on('finish', function (er) {
          if(er){
           console.log(er);

          } else {
        res.set('Content-Type','application/force-download');
        res.set('Content-Type','application/octet-stream');
        res.set('Content-Type','application/download');
        // disposition / encoding on response body
        //res.set('Content-Disposition','attachment;filename=Data.csv');
        res.set('Content-Transfer-Encoding','binary');

        res.download(__dirname+"/tempFiles/"+filenameWithExtension,filenameWithExtension, function(err1){
          if (err1) {
            console.log(err1);
          } else {
            return;
          }
        });
        }
       
        });
     } else{
        res.send('please give file name with extension');
      }
  };

  Data_class.remoteMethod('downloadFileFromObjectStorage', {
    http: {path: '/downloadFileFromObjectStorage', verb: 'get'},
    accepts: [{arg: 'filenameWithExtension', type: 'string'},
              {arg: 'req', type: 'object', 'http': {source: 'req'}},{arg: 'res', type: 'object', 'http': {source: 'res'}}],
    returns: {arg: 'success', type: 'object'},
    description: "Download File from ObjectStorage."
  });



/*
 Wish.disableRemoteMethod("create", true);
  Wish.disableRemoteMethod("upsert", true);
  Wish.disableRemoteMethod("upsertWithWhere", true);
  Wish.disableRemoteMethod("exists", true);
//Wish.disableRemoteMethod("findById", true);
//Wish.disableRemoteMethod("find", true);
  Wish.disableRemoteMethod("findOne", true);
  Wish.disableRemoteMethod("deleteById", true);
  Wish.disableRemoteMethod("destroyById", true);
  Wish.disableRemoteMethod("count", true);
  Wish.disableRemoteMethod("updateAttributes", false);
  Wish.disableRemoteMethod("createChangeStream", true);
  Wish.disableRemoteMethod("updateAll", true);
  Wish.disableRemoteMethod("replaceOrCreate", true);
  Wish.disableRemoteMethod("replaceById", true);

  Wish.disableRemoteMethod('__findById__comments', false);
  Wish.disableRemoteMethod('__delete__comments', false); // DELETE
  Wish.disableRemoteMethod('__updateById__comments', false); // PUT

  Wish.disableRemoteMethod('__findById__likes', false); // DELETE
  Wish.disableRemoteMethod('__delete__likes', false); // DELETE
  Wish.disableRemoteMethod('__updateById__likes', false); // PUT

  Wish.disableRemoteMethod('__findById__bookmarks', false); // DELETE
  Wish.disableRemoteMethod('__delete__bookmarks', false); // DELETE
  Wish.disableRemoteMethod('__updateById__bookmarks', false); // PUT
*/


};