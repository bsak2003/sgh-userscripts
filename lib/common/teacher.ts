class Teacher {
  title: string = "";
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  note: string = "";

  toString() {
    return `${this.title} ${this.firstName} ${this.lastName}`.trim();
  }

  usosName() {
    return `${this.firstName} ${this.lastName}`;
  }

  wdName() {
    return `${this.title} ${this.lastName} ${this.firstName} ${this.middleName}`.trim();
  }

  // ugly but working (does not remove ',' character yet)
  static parseTeacherFromWD(name: string) {
    let array = name.split(" ");

    let teacher = new Teacher();

    array.forEach((word, cur, arr) => {
      if (teacher.title.endsWith(word)) return;

      if (word.startsWith("prof")) {
        let next = arr[cur + 1];
        console.log(word, next);

        if (
          next.startsWith("mgr") ||
          next.startsWith("dr") ||
          next.endsWith(".")
        ) {
          if (teacher.title) teacher.title += ` ${word}`;
          else teacher.title = `${word}`;
          return;
        } else {
          if (teacher.title) teacher.title += ` ${word} ${next}`;
          else teacher.title = `${word} ${next}`;
          return;
        }
      }

      if (
        word.startsWith("mgr") ||
        word.startsWith("dr") ||
        word.endsWith(".")
      ) {
        if (teacher.lastName && teacher.firstName) {
          teacher.note += ` ${word}`;
          return;
        }

        if (teacher.lastName) {
          teacher.note += ` ${teacher.lastName} ${teacher.firstName}`;
          teacher.lastName = "";
        }

        if (teacher.title) teacher.title += ` ${word}`;
        else teacher.title = `${word}`;

        return;
      }

      if (teacher.note) teacher.note += ` ${word}`;
      else {
        if (!teacher.lastName) {
          teacher.lastName = word;
          return;
        } else if (!teacher.firstName) {
          teacher.firstName = word;
          return;
        } else if (!teacher.middleName) {
          teacher.middleName = word;
          return;
        }

        teacher.note = `${word}`;
      }
    });

    return teacher;
  }
}

export { Teacher };
