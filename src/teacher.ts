class Teacher {
    title: string = '';
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    note: string = '';

    toString(){
      return `${this.title} ${this.firstName} ${this.lastName}`.trim();
    }

    usosName() {
      return `${this.firstName} ${this.lastName}`;
    }

    wdName() {
      return `${this.title} ${this.lastName} ${this.firstName} ${this.middleName}`.trim();
    }

    // TODO edge case 'dr hab. prof. SGH lastName firstName'
    static parseTeacherFromWD(name: string) {
        let array = name.split(' ')

        let teacher = new Teacher();

        array.forEach((word, cur, arr) => {
          if (word.startsWith('mgr') || word.startsWith('dr') || word.endsWith('.')) {
      
            if (teacher.lastName || (teacher.lastName && teacher.firstName)) {
              teacher.note += ` ${teacher.lastName} ${teacher.firstName}`;
              teacher.lastName = '';
            }
      
            if (teacher.title) teacher.title += ` ${word}`;
            else teacher.title = `${word}`;
      
            return;
          }
      
          if (!teacher.lastName) {
            teacher.lastName = word;
            return;
          }
          else if (!teacher.firstName) {
            teacher.firstName = word;
            return;
          }
          else if (!teacher.middleName) {
            teacher.middleName = word;
            return;
          }
      
          if (teacher.note) teacher.note += ` ${word}`;
          else teacher.note = `${word}`;
        });
      
        return teacher;
      }
}

export { Teacher }