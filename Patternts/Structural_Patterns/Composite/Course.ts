namespace course {
  interface ICourse {
    total(): number;
  }

  export class Course implements ICourse {
    constructor(private title: string, private price: number) {}

    public total() {
      return this.price;
    }

    public print() {
      console.info(`${this.title}, ${this.price}`);
    }
  }

  class CourseGroup {
    constructor(private title: string, private composite: Array<ICourse>) {}

    public total() {
      return this.composite.reduce((acc, curr) => acc + curr.total(), 0);
    }

    public print() {
      console.log(`${this.title}, ${this.total}`);
    }
  }

  const jsCourse = new Course("jsCourse", 15);
  const pyCourse = new Course("pyCourse", 20);

  const webCourses = new CourseGroup("web", [jsCourse, pyCourse]);

  const psCourse = new Course("psCourse", 5);
  const skCourse = new Course("skCourse", 5);

  const designCourses = new CourseGroup("design", [psCourse, skCourse]);

  console.info(webCourses.total());
  console.info(designCourses.total());
}
