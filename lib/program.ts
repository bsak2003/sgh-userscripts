class Program {
  // rodzaj, dziekanat, poziom, tryb
  type: string = "";
  department: string = "";
  level: string = "";
  courseOfStudy: string = "";

  fieldOfStudy: string = "";

  toString() {
    return `${this.type}${this.department}${this.level}${this.courseOfStudy}-${this.fieldOfStudy}`;
  }

  static fromDescription(programString: string) {
    let parts = programString.split("-");

    let program = new Program();

    program.type = parts[0][0];
    program.department = parts[0][1];
    program.level = parts[0][2];
    program.courseOfStudy = parts[0][3];

    program.fieldOfStudy = parts[1];

    return program;
  }
}

export { Program };
