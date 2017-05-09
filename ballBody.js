const Box2D = require('box2dweb');
const b2World = Box2D.Dynamics.b2World;
const b2Vec2 = Box2D.Common.Math.b2Vec2;
const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

var body;

export default class BallBody {
  constructor(position, radius, world) {
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = new b2CircleShape();
    fixtureDef.density = 2;
    fixtureDef.shape.SetRadius(radius);

    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set(position[0], position[1]);

    body = world.CreateBody(bodyDef);
    body.CreateFixture(fixtureDef);
    body.SetAngularDamping(500.0);
  }

  applyImpulse(impulse) {
    body.ApplyImpulse(impulse, body.GetPosition());
  }

  position() {
    return [body.GetPosition().x, body.GetPosition().y];
  }

  angle() {
    return body.GetAngle() * (180.0 / Math.PI);
  }
}
