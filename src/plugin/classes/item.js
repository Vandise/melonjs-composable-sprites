class CompositionItem extends me.Entity
{

  constructor(x, y, settings, owner)
  {
    settings.GUID = me.utils.createGUID();
    super(x, y, settings);
    this.GUID = settings.GUID;
    this.owner = owner; // set position based on direction, etc

    this.renderable.anchorPoint = this.owner.renderable.anchorPoint;

    for (let i = 0; i < this.body.shapes.length; i++)
    {
      this.body.removeShapeAt(i);
    }
    this.body.shapes = [];
    owner.body.shapes.forEach((s) => {
      this.body.addShape(
        Object.assign( Object.create( Object.getPrototypeOf(s)), s)
      );
    });

    this.renderable.scale(
      owner.renderable.scaled.x,
      owner.renderable.scaled.y
    );

    this.renderable.anim = Object.assign({}, owner.renderable.anim);
    this.renderable.animationspeed = this.owner.renderable.animationspeed;
    this.renderable.setCurrentAnimation(
      owner.renderable.current.name
    );

    this.pos = this.owner.pos;
    this._absPos = this.owner._absPos;
    this.ancestor = this.owner;
  }

  update(time)
  {
    this.pos = this.owner.pos;
    this._absPos = this.owner._absPos;

    this.body.update(time);

    return (this._super(me.Entity, 'update', [time]) );
  }

  onCollision(response, other) {
    return false;
  }

}

window.me.CompositionItem = CompositionItem;

export default CompositionItem;