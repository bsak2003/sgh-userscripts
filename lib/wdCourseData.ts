// PORTING req'd

class wdCourseData {
  signature: string;
  teacher: string;
  courseOfStudy: string;
  academicCycle: string;

  constructor(
    signature: string,
    teacher: string,
    courseOfStudy: string,
    academicCycle: string
  ) {
    this.signature = signature;
    this.teacher = teacher;
    this.courseOfStudy = courseOfStudy;
    this.academicCycle = academicCycle;
  }

  usosSignature() {
    let subjectId = this.signature.split("-")[0];
    return `${subjectId}-${this.courseOfStudy}`;
  }

  previousCycle() {
    let academicYear = parseInt(this.academicCycle.slice(0, 4));
    let academicSemester = parseInt(this.academicCycle.slice(4, 5));

    academicYear = academicYear - 1;

    return `${academicYear}${academicSemester}`;
  }

  static serializeAcademicCycle(cycle: string) {
    let year = cycle.slice(0, 4);
    let semester = cycle.slice(4, 5);

    switch (semester) {
      case "1":
        return `zimowy ${year}`;
      case "2":
        return `letni ${year}`;
    }
  }
}

const getDataFromWD = function () {
  const signatureXPath = document.evaluate(
    '//div[contains(@id, "strona-srodek-wyszukiwarka-tabela-c12-div")]//td[contains(., "Sygnatura:")]',
    document
  );
  const signatureItem = signatureXPath.iterateNext();
  let signature = signatureItem?.nextSibling?.textContent?.trim(); // was innerText

  const teacherXPath = document.evaluate(
    '//div[contains(@id, "strona-srodek-wyszukiwarka-tabela-c12-div")]//td[contains(., "Prowadzący")]',
    document
  );
  const teacherItem = teacherXPath.iterateNext();
  const teacher = teacherItem?.nextSibling?.textContent?.trim(); // was innerText

  const urlSearchParams = new URLSearchParams(window.location.search);
  const course = urlSearchParams.get("ak_try");
  const academicCycle = urlSearchParams.get("ak_ris");

  return new wdCourseData(signature!, teacher!, course!, academicCycle!);
};

export { wdCourseData, getDataFromWD };
