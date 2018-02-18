// Generated by CoffeeScript 2.2.0
var Instascan, ppol;

import "./body.html";

import {
  PPoL
} from "../objects/ppol.js";

import QRCode from "qrcode";

Instascan = require("instascan");

ppol = new PPoL();

ppol.init("0xba91d77dd6da144ecbc4d5b3aa69f2d0c166f711");

Template.user.events({
  "click .gen_user_sig": function() {
    var message;
    message = $("#user_message")[0].value;
    return ppol.signUserMsg(message).then(function(_sig) {
      return QRCode.toDataURL(_sig._userSig).then(function(url) {
        var scanner;
        $("#user_sig_qr").attr("src", url);
        scanner = new Instascan.Scanner({
          video: $('#preview')[0]
        });
        scanner.addListener('scan', function(content) {
          console.log(content);
          scanner.stop();
          return ppol.logProof(_sig._blockNum, _sig._blockHash, _sig._uid, _sig._userAddr, _sig._userSig, content).on('transactionHash', function(_tx) {
            return $("log_proof_out").innerHTML = _tx;
          });
        });
        return Instascan.Camera.getCameras().then(function(cameras) {
          if (cameras.length > 0) {
            return scanner.start(cameras[0]);
          } else {
            return console.error('No cameras found.');
          }
        }).catch(function(e) {
          return console.error(e);
        });
      }).catch(function(err) {
        return console.error(err);
      });
    });
  }
});

//# sourceMappingURL=body.js.map