class Signature {
  courseId: string = "";
  courseOfStudy: string = "";
  mainTeacherId: string = "";

  usosSignature() {
    if (this.courseId == null || this.courseOfStudy == null) throw new Error();
    return `${this.courseId}-${this.courseOfStudy}`;
  }

  wdSignature() {
    if (this.courseId == null || this.mainTeacherId == null) throw new Error();
    return `${this.courseId}-${this.mainTeacherId}`;
  }

  static fromUsosSignature(signature: string) {
    const parts = signature.split("-");
    let sign = new Signature();
    sign.courseId = parts[0];
    sign.courseOfStudy = parts[1];
    return sign;
  }
}

export { Signature };
