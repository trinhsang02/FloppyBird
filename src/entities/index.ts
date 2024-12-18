import Matter from "matter-js";
import { Dimensions } from "react-native";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";

const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;

const BOTTOM = 51

export default (skin : string) => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    engine.gravity.y = 0.4;

    const pipeSizePosA = getPipeSizePosPair();
    const pipeSizePosB = getPipeSizePosPair( windowsWidth * 0.9);

    // Calculate the y position of the bottom of the bottom obstacle
    const obstacleBottomY = pipeSizePosA.pipeBottom.pos.y + pipeSizePosA.pipeBottom.size.height;

// Set the y position of the floor to be the same as the bottom of the bottom obstacle
    const floorY = obstacleBottomY;


    return {
        physics: {engine, world},
        Bird: Bird(world, 'green', {x: 120, y: 400}, {height: 40,  width: 40},skin),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'green', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size, true),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'green', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size, false),
        
        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'green', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size, true),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'green', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size, false),
        
        Floor: Floor(world, '#E1D694', {x: windowsWidth / 2, y: floorY}, {height: BOTTOM + 20,  width: windowsWidth})
    }
}