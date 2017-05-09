import React, {Component} from "react";
import {View, AppRegistry, PanResponder} from "react-native";
import {Surface} from "gl-react-native";
import GL from "gl-react";
import {resolveAssetSource} from "gl-react-native";
import Dimensions from 'Dimensions';
import BallBody from './ballBody.js';
import Wall from './wall.js';
import Ball from './ball.js';
import Box2D from 'box2dweb';

const b2World = Box2D.Dynamics.b2World;
const b2Vec2 = Box2D.Common.Math.b2Vec2;
const window = Dimensions.get('window');
const ratio = window.width / window.height;
const step = 0.00005;
const radius = 0.15;
const someInitialPosition = [0.5, 1.5];
const image = resolveAssetSource(require('./volleyball.png'));

var world;
var ball;

export default class GLExample extends Component {

  render () {
    var location = ball.position();
    var angle = ball.angle();

    return <View {...this._panResponder.panHandlers}>
        <Surface width={window.width} height={window.height}>
          <GL.Node
            uniforms={{ ratio, radius, location, angle, image }}
            shader={{ frag: Ball }}
          />
        </Surface>
    </View>;
  }

  handleTouch(event) {
    var touchX = event.nativeEvent.locationX / window.width;
    var touchY = 1.0 - event.nativeEvent.locationY / window.height;

    if (this.distance(touchX, touchY / ratio, ball.position()[0], ball.position()[1]) < radius) {
	this.kickBall(touchX > ball.position()[0] ? -50.0 : 50.0, 500.0);
    }
  }

  kickBall(x, y) {
     ball.applyImpulse(new b2Vec2(x, y));
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.handleTouch(evt);
      }
    });
    start();
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.forceUpdate();
    }, 0);
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentWillUpdate() {
    move();
  }
}

function move() {
  world.Step(step, 1, 1);
}

function start() {
  world = new b2World(new b2Vec2(0.0, -2000000.0), true);
  ball = new BallBody(someInitialPosition, radius, world);

  // vertical walls
  new Wall(new b2Vec2(0, 0), new b2Vec2(0, 2.0), world);
  new Wall(new b2Vec2(0.5, 0), new b2Vec2(0.5, 2.0), world);

  // horizontal walls
  new Wall(new b2Vec2(0, 0.03), new b2Vec2(1, 0.03), world);
  new Wall(new b2Vec2(0, 0.5 / ratio), new b2Vec2(1, 0.5 / ratio), world);
}

AppRegistry.registerComponent('GLExample', () => GLExample);
