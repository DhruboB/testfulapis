
 'use strict';
var request = require('supertest');
var app = require('../server.js');
var assert = require('assert');

before(function importSampleData(done) {
  this.timeout(50000);
  if (app.importing) {
    app.on('import done', done);
  } else {
    done();
  }
});

function json(verb, url) {
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
}

describe('REST', function() {
  this.timeout(30000);

  describe('Expected Usage', function() {

    describe('GET /api/DATA_CLASSes', function() {
      it('should return a list of all records present in dataclass', function(done) {
        json('get', '/api/DATA_CLASSes')
          .expect(200)
          .end(function(err, res) {
            assert(Array.isArray(res.body));
            assert(res.body.length);

            done();
          });
      });
    });

    describe('POST /api/DATA_CLASSes', function() {
         it('should INSERT data to dashDB', function(done) {
            json('post', '/api/DATA_CLASSes')
              .send({"DATA_CLASS_ID":201,"DATA_CLASS_NAME":"Music","DATA_CLASS_DESCRIPTION":"all music","PARENT_DATA_CLASS_ID":200})
                .expect(200, function (err, res) {
                done();
              });
          });
        });

    describe('PUT /api/DATA_CLASSes/:DATA_CLASS_ID', function() {
        it('should update', function(done) {
          json('put', '/api/DATA_CLASSes/201')
            .send({"DATA_CLASS_NAME":"Music"})
            .expect(200, function(err, res){
              done();
            });
          });
     });

   describe('Delete /api/DATA_CLASSes/:DATA_CLASS_ID', function() {
          it('should Delete records', function(done) {
            json('del', '/api/DATA_CLASSes/201')
              .expect(200, function(err, res){
                done();
              });
          });
        });

  // describe('GET /api/DATA_CLASSes/downloadFileFromObjectStorage', function() {
  //       it('should download file from object storage ', function (done) {
  //           json('get', '/api/DATA_CLASSes/downloadFileFromObjectStorage?filenameWithExtension=blue.txt')
  //             .expect(200, function (err, res) {
  //               done();
  //             });
  //         });
  //     });

  // describe('POST /api/DATA_CLASSes/uploadFileToObjectStorage', function() {
  //     it('To upload file to object storage ', function (done) {
  //        request(app)
  //       .post('/api/DATA_CLASSes/uploadFileToObjectStorage')
  //       .set('Accept', 'multipart/form-data')
  //       .attach('file', '/home/ajay/Documents/blue.txt')
  //         .expect(200, function (err, res) {
  //           done();
  //         });
  //     });
  //    });

 // describe('GET /api/DATA_CLASSes/count', function() {        
 //    it('write data from Object Storage to dashDB  /api/v1/objectStorage/dashdb/write', function (done) {
 //      json('get', '/api/v1/objectStorage/dashdb/write')
 //      setTimeout(function () {
 //        console.log('.............8....');
 //        done();
 //      }, 200);
 //    });
 //   });

  // describe('GET /api/v1/dashdb/objectStorage/write', function() {
  //            it('write data from dashDB to Object Storage  /api/v1/dashdb/objectStorage/write', function (done) {
  //       json('get', '/api/v1/dashdb/objectStorage/write')
  //       setTimeout(function () {
  //         console.log('.............9....');
  //         done();
  //       }, 200);
  //     });
  //  });

      describe('GET /api/DATA_CLASSes/count', function() {
          it('should return count of records', function(done) {
            json('get', '/api/DATA_CLASSes/count')
              .expect(200)
              .end(function(err, res) {
                done();
              });
          });
        });
  });

});
