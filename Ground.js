class Ground {
  constructor(xInput, yInput, widthInput, heightInput) {
    let options = {
      isStatic: true,
    };
    this.body = Bodies.rectangle(
      xInput,
      yInput,
      widthInput,
      heightInput,
      options
    );
    this.w = widthInput;
    this.h = heightInput;
    World.add(srWorld, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    noStroke();
    fill(148, 127, 146);
    rect(pos.x, pos.y, this.w, this.h);
    pop();
  }
}
