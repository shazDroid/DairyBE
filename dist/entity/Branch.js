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
exports.Branch = void 0;
const typeorm_1 = require("typeorm");
const State_1 = require("./State");
const Admin_1 = require("./Admin");
const Worker_1 = require("./Worker");
const Customer_1 = require("./Customer");
let Branch = class Branch {
};
exports.Branch = Branch;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Branch.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Branch.prototype, "branch_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Branch.prototype, "branch_location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Admin_1.Admin, admin => admin.branches),
    (0, typeorm_1.JoinColumn)({
        name: "admin_id"
    }),
    __metadata("design:type", Admin_1.Admin)
], Branch.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => State_1.State, state => state.branch),
    (0, typeorm_1.JoinColumn)({ name: 'state_id' }),
    __metadata("design:type", State_1.State)
], Branch.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Worker_1.Worker, worker => worker.branch),
    __metadata("design:type", Array)
], Branch.prototype, "workers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Customer_1.Customer, customer => customer.branch),
    __metadata("design:type", Array)
], Branch.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Branch.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Branch.prototype, "updatedAt", void 0);
exports.Branch = Branch = __decorate([
    (0, typeorm_1.Entity)()
], Branch);
