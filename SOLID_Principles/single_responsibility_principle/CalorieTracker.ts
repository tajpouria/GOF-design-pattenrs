// bad approach

class BadCalorieTracker {
  private receivedCalorie = 0;
  constructor(private calorieLimit: number) {}

  track(calorieToAdd: number) {
    this.receivedCalorie += calorieToAdd;

    if (this.receivedCalorie >= this.calorieLimit) {
      console.log("You passed allowed calorie limitation.");
    }
  }
}

// right

class RightCalorieTracker {
  private receivedCalorie = 0;
  constructor(private calorieLimit: number) {}

  track(calorieToAdd: number) {
    this.receivedCalorie += calorieToAdd;

    if (this.receivedCalorie >= this.calorieLimit) {
      alertCaloriePassed();
    }
  }
}

function alertCaloriePassed() {
  console.log("You passed allowed calorie limitation.");
}
