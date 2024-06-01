"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = exports.FoodType = exports.ServeType = void 0;
var ServeType;
(function (ServeType) {
    ServeType["LIMITED"] = "limited";
    ServeType["UNLIMITED"] = "unlimited";
})(ServeType || (exports.ServeType = ServeType = {}));
var FoodType;
(function (FoodType) {
    FoodType["VEG"] = "veg";
    FoodType["NON_VEG"] = "non_veg";
})(FoodType || (exports.FoodType = FoodType = {}));
var Unit;
(function (Unit) {
    Unit["HUNDRED_ML"] = "100ml";
    Unit["TWO_FIFTY_ML"] = "250ml";
    Unit["FIVE_HUNDRED_ML"] = "500ml";
    Unit["ONE_LITER"] = "1ltr";
    Unit["TWO_LITER"] = "2ltr";
})(Unit || (exports.Unit = Unit = {}));
