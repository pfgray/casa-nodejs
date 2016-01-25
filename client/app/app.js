import "./app.less";

import angular from "angular";
import "jquery";
import "angular-resource";
import "angular-cookies";
import "angular-sanitize";
import "lodash";
import "angular-ui-router";
import "moment";
import "angular-bootstrap";

//This init file is necessary in order to have the angular app ready
//   before controllers are registered to it
import "./init.js";
import "./apps/apps.controller.js";
import "./apps/apps.js";
import "./apps/apps.service.js";
import "./apps/single/singleApp.controller.js";
import "./main/main.controller.js";
import "./main/main.js";
import "./peers/peers.controller.js";
import "./peers/peers.js";
import "./peers/peers.service.js";
import "./components/colors/colorService.js";
import "./components/date/date.js";
import "./components/modal/modal.service.js";
import "./components/navbar/navbar.directive.js";
import "./components/util/focusOn.js";
