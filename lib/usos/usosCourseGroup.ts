class usosCourseGroup {
  amount: number;
  limit: number;
  comment: string;
  groupNo: number;

  constructor(amount: number, limit: number, comment: string, groupNo: number) {
    this.amount = amount;
    this.limit = limit;
    this.comment = comment;
    this.groupNo = groupNo;
  }
}

export { usosCourseGroup };
