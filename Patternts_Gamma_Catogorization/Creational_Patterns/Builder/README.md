# Builder

## when piecewise object construction is complicated, provide and API for doing it succinctly

![Builder pattern](https://refactoring.guru/images/patterns/content/builder/builder.png)

- Some object are simple and can created in a single constructor call
- Other objects require lot of ceremony it no to create
- Having an object with 10 constructor arguments is not productive
- Instead, opt for piecewise the contractor
- Builder provides an API for constructing and object step-by-step
