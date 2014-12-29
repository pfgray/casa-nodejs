/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
    res.json({
        casa_modules:[{
            name:"Payload",
            features:[{
                name:"TRANSITPAYLOAD",
                completed:false
            },{
                name:"LOCALPAYLOAD",
                completed:false
            }]
        },{
            name:"Publisher",
            features:[{
                name:"SENDOUT",
                completed:false
            }]
        },{
            name:"Local",
            features:[{
                name:"SENDLOCAL",
                completed:false
            }]
        },{
            name:"Receiver",
            features:[{
                name:"RECEIVEIN",
                completed:true
            },{
                name:"ADJINTRANSLATE",
                completed:true
            },{
                name:"ADJINSQUASH",
                completed:true
            },{
                name:"ADJINFILTER",
                completed:false
            }]
        },{
            name:"Relay",
            features:[{
                name:"ADJOUTTRANSFORM",
                completed:false
            },{
                name:"ADJOUTFILTER",
                completed:false
            },{
                name:"ADJOUTTRANSLATE",
                completed:false
            }]
        }]
    });
};