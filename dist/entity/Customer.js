"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.Gender = void 0;
const typeorm_1 = require("typeorm");
const Branch_1 = require("./Branch");
const Admin_1 = require("./Admin");
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (exports.Gender = Gender = {}));
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Gender
    }),
    __metadata("design:type", String)
], Customer.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date'
    }),
    __metadata("design:type", Date)
], Customer.prototype, "subscriptionStart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date'
    }),
    __metadata("design:type", Date)
], Customer.prototype, "subscriptionEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date'
    }),
    __metadata("design:type", Date)
], Customer.prototype, "subscriptionRenew", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Admin_1.Admin, admin => admin.customers),
    (0, typeorm_1.JoinColumn)({
        name: 'admin_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Admin_1.Admin)
], Customer.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Branch_1.Branch, branch => branch.customer),
    (0, typeorm_1.JoinColumn)({
        name: 'branch_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Branch_1.Branch)
], Customer.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
