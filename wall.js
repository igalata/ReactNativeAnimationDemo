const Box2D = require('box2dweb');
const b2World = Box2D.Dynamics.b2World;
const b2Vec2 = Box2D.Common.Math.b2Vec2;
const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

export default class Wall {
  constructor(startPosition, endPosition, world) {
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = new b2PolygonShape();
    fixtureDef.shape.SetAsEdge(startPosition, endPosition);

    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.Set(startPosition.x, startPosition.y);

    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixtureDef);
  }
}
