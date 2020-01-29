// bad approach

interface Question {
  question: string;
  type: "bool" | "option" | "range";
  answers?: string[];
}

const badPrintQuiz = (quiz: Question[]) => {
  quiz.forEach(q => {
    console.log(q.question);

    switch (q.type) {
      case "bool":
        console.log("True");
        console.log("False");
        break;

      case "option":
        q.answers?.forEach(answer => console.log(answer));
        break;

      case "range":
        console.log(`MIN ${q.answers?.[0]}`);
        console.log(`MAX ${q.answers?.[1]}`);
        break;

      default:
        console.log("Question type is not defined");
    }
  });
};

const badQuiz: Question[] = [
  { type: "bool", question: "Bool Question?" },
  {
    type: "option",
    question: "Option Question?",
    answers: ["A", "B", "C", "D"],
  },
  { type: "range", question: "Range Question?", answers: ["100", "200"] },
  // { type: "text", question: "What's your name?" }
];

badPrintQuiz(badQuiz);

// right approach

interface QuestionWrapper {
  question: string;
  printAnswers(): void;
}

class BoolQuestion implements QuestionWrapper {
  constructor(public question: string) {}

  public printAnswers = () => {
    console.info("True");
    console.info("False");
  };
}

class OptionQuestion implements QuestionWrapper {
  constructor(public question: string, public answers: string[]) {}

  public printAnswers = () => {
    this.answers.map(answer => console.info(answer));
  };
}

class RangeQuestion implements QuestionWrapper {
  constructor(public question: string, public ranges: number[]) {}

  public printAnswers = () => {
    console.info(`MIN ${this.ranges[0]}`);
    console.info(`MAX ${this.ranges[1]}`);
  };
}

class TextQuestion implements QuestionWrapper {
  constructor(public question: string) {}

  public printAnswers = () => {
    console.info("___________");
  };
}

const goodPrintQuiz = (quiz: QuestionWrapper[]) => {
  quiz.forEach(q => {
    console.log(q.question);
    q.printAnswers();
  });
};

const goodQuiz = [
  new BoolQuestion("Bool Question?"),
  new OptionQuestion("Option Question?", ["A", "B", "C", "D"]),
  new RangeQuestion("Range Question?", [10, 20]),
  new TextQuestion("Text Question"),
];

goodPrintQuiz(goodQuiz);
