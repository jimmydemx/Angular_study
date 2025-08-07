import {Component, EventEmitter, InjectionToken, Input, Output} from "@angular/core";

interface OfficeProcess {
  flow : Array<string> // ["staff","manager","logistic","financial"]
  name: "reimbursement" | "leave" | "business trip",
  role: "staff"| "manager"|"logistic"|"financial"
}

class StaffLeaveApplicationComponent{
  // this is a component, for Staff Leave Application Form
}

class ManagerLeaveApplicationComponent{
  // this is a component, for Staff Leave Application Form
}

type ReviewResult={
  result: "approved"
} | {
  result: "rejected";
  reason: string
}

class ManagerReviewComponent{
  // this is a component, for Manger Review Form

  @Input()
  SubmittedForm!:StaffLeaveApplicationComponent | ManagerLeaveApplicationComponent


   @Output()
  reviewResult=new EventEmitter<ReviewResult>()

  onApprove(){
    this.reviewResult.emit({result:'approved'})
  }

  onReject(){
    this.reviewResult.emit({result:'rejected',reason:"reason1"})
  }
}

class LogisticReviewComponent{
  // this is a component, for Logistic Review Form
}

class FinancialReviewComponent{
  // this is a component, for Financial Review Form
}

// @Component({
//   template: `
//     <ManagerReviewComponent (reviewResult)="OnCheckReviewResult()"></ManagerReviewComponent>
//   `
// })
class OfficeProcessWrapper implements OfficeProcess{

   flow= ["staff","manager"]
   name:"reimbursement" | "leave" | "business trip" ="leave"
   role:"staff"| "manager"|"logistic"|"financial"="staff"

  OnCheckReviewResult(){

  }
}

export const DYNAMIC_DEPARTMENT = new InjectionToken<Record<any, any>>("Dynamic_Department")


type RoleWithComponent= {
  name: "Employee",
  Leave: "EmployeeLeaveComponent",
  Reimburse: "EmployeeReimburseComponent",
} | {
  name: "Manager",
  Leave:"ManagerLeaveComponent"
  Reimburse:  "ManagerReimburseComponent"
} | {
  name: "Finance",
  Leave:"FinanceLeaveComponent"
  Reimburse:  "FinanceReimburseComponent"
} | {
  name: "Admin",
  Leave:"AdminLeaveComponent"
  Reimburse:  "AdminReimburseComponent"
}


type ReviewChains = {
  name: string,
  role: "Employee",


}
