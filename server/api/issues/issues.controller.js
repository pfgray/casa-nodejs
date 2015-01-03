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
                completed:true
            }]
        },{
            name:"Relay",
            features:[{
                name:"ADJOUTTRANSFORM",
                completed:true
            },{
                name:"ADJOUTFILTER",
                completed:true
            },{
                name:"ADJOUTTRANSLATE",
                completed:true
            }]
        },{
            name:"Local",
            features:[{
                name:"SENDLOCAL_ALL",
                completed:true
            },{
                name:"SENDLOCAL_ONE",
                completed:true
            },{
                name:"SENDLOCAL_QUERY",
                completed:false
            }]
        },{
            name:"Payload",
            features:[{
                name:"TRANSITPAYLOAD",
                completed:true
            },{
                name:"LOCALPAYLOAD",
                completed:true
            }]
        },{
            name:"Publisher",
            features:[{
                name:"SENDOUT",
                completed:true
            }]
        }]
    });
};