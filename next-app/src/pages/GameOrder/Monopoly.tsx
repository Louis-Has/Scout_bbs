import React, { useState } from 'react'
import {
  WebGLEngine,
  Camera,
  MeshRenderer,
  PrimitiveMesh,
  BlinnPhongMaterial,
  DirectLight,
  Script,
  Vector3,
  Vector4,
  Color,
  PointLight,
  Entity,
  StaticCollider,
  BoxColliderShape,
  Vector2,
  Pointer,
  GLTFResource,
} from 'oasis-engine'

import { OrbitControl } from 'oasis-engine-toolkit'
import { LitePhysics } from '@oasis-engine/physics-lite'

import styles from './Monopoly.module.scss'
import classNames from 'classnames/bind'

const Monopoly: React.FC = () => {
  const cn = classNames.bind(styles)

  const initMono = async () => {
    // Create an Engine Instance
    const engine = new WebGLEngine('canvas')
    engine.physicsManager.initialize(LitePhysics)
    engine.canvas.resizeByClientSize()
    // engine.

    const invCanvasWidth = 1 / engine.canvas.width
    const invCanvasHeight = 1 / engine.canvas.height

    // Create Scene Root Entity
    const inputManager = engine.inputManager
    const scene = engine.sceneManager.activeScene
    const rootEntity = scene.createRootEntity('root')
    scene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1)
    scene.ambientLight.diffuseIntensity = 1.2

    // init camera
    const cameraEntity = rootEntity.createChild('camera')
    const camera = cameraEntity.addComponent(Camera)
    cameraEntity.transform.setPosition(10, 10, 10)
    cameraEntity.transform.lookAt(new Vector3(0, 0, 0))
    cameraEntity.addComponent(OrbitControl)

    // init point light
    let light = rootEntity.createChild('light1')
    light.transform.setPosition(-8, -2, 8)
    light.addComponent(PointLight).intensity = 0.12

    light = rootEntity.createChild('light2')
    light.transform.setPosition(8, -2, 0)
    light.addComponent(PointLight).intensity = 0.12

    class PanScript extends Script {
      private startPointerPos = new Vector3()
      private tempVec2: Vector2 = new Vector2()
      private tempVec3: Vector3 = new Vector3()
      private zValue: number = 0

      onPointerDown(pointer: Pointer) {
        console.log('onPointerDown')
        this.zValue = camera.worldToViewportPoint(this.entity.transform.worldPosition, this.tempVec3).z
        const { tempVec2, tempVec3 } = this
        tempVec2.copyFrom(pointer.position)
        tempVec3.set(tempVec2.x * invCanvasWidth, tempVec2.y * invCanvasHeight, this.zValue)
        camera.viewportToWorldPoint(tempVec3, this.startPointerPos)
      }

      onPointerDrag(pointer: Pointer) {
        // console.log('onPointerDrag')
        const { tempVec2, tempVec3, startPointerPos } = this
        const { transform } = this.entity
        tempVec2.copyFrom(pointer.position)
        tempVec3.set(tempVec2.x * invCanvasWidth, tempVec2.y * invCanvasHeight, this.zValue)
        camera.viewportToWorldPoint(tempVec3, tempVec3)
        Vector3.subtract(tempVec3, startPointerPos, startPointerPos)
        transform.worldPosition.add(startPointerPos)
        startPointerPos.copyFrom(tempVec3)
      }
    }

    class EnterExitScript extends Script {
      private material: BlinnPhongMaterial

      onStart() {
        this.material = this.entity.getComponent(MeshRenderer).getInstanceMaterial() as BlinnPhongMaterial
      }

      onPointerEnter() {
        this.material.baseColor.set(0.3, 0.3, 0.6, 1.0)
      }

      onPointerExit() {
        this.material.baseColor.set(hexToOasis(color))
      }
    }

    function createBox(x: number, y: number, z: number): Entity {
      // create box test entity
      const cubeSize = cubeDistance - 0.2
      const boxEntity = rootEntity.createChild('BoxEntity')
      boxEntity.transform.setPosition(x, y, z)

      const boxMtl = new BlinnPhongMaterial(engine)
      const boxRenderer = boxEntity.addComponent(MeshRenderer)
      boxMtl.baseColor.set(hexToOasis(color))
      console.log(hexToOasis(color),'dsifhiushdfiu')
      boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, cubeSize, cubeSize / 5, cubeSize)
      boxRenderer.setMaterial(boxMtl)

      const boxCollider: StaticCollider = boxEntity.addComponent(StaticCollider)
      const boxColliderShape = new BoxColliderShape()
      boxColliderShape.setSize(cubeSize, cubeSize / 5, cubeSize)
      boxCollider.addShape(boxColliderShape)
      return boxEntity
    }

    const createMatrix = (side: number, distance = cubeDistance) => {
      const result = []
      const offset = (side / 2 - 0.5) * distance
      for (let i = 0; i < side; i++) {
        for (let u = 0; u < side; u++) {
          result.push({ size: [i * distance - offset, 0, -u * distance + offset] })
        }
      }
      return result
    }

    const source = createMatrix(4)

    // const source = [
    //   { size: [0, 0, 0] },
    //   { size: [0, 0, -cubeDistance] },
    //   { size: [cubeDistance, 0, 0] },
    //   { size: [cubeDistance, 0, -cubeDistance] },
    // ]

    source.map((item) => {
      const boxEntity = createBox(...item.size)
      boxEntity.addComponent(EnterExitScript)
    })

    const gltf = await engine.resourceManager.load<GLTFResource>(
      // 'https://gw.alipayobjects.com/os/bmw-prod/34847225-bc1b-4bef-9cb9-6b9711ca2f8c.glb'
      '/Heart_Low.gltf'
    )

    rootEntity.addChild(gltf.defaultSceneRoot)

    // Start the Engine
    engine.run()
  }

  const [color, setColor] = useState('#e66465')

  const cubeDistance = 3.0

  const colorToGui: () => number[] = (color: Color = new Color(1, 1, 1, 1)) => {
    const v = []
    v[0] = color.r * 255
    v[1] = color.g * 255
    v[2] = color.b * 255
    return v
  }

  const hexToOasis: (color: string) => Color = (color) => {
    const result = new Color()
    result.set(
      parseInt(color.slice(1, 3), 16) / 255,
      parseInt(color.slice(3, 5), 16) / 255,
      parseInt(color.slice(5, 7), 16) / 255,
      1
    )
    console.log(color, result)
    return result
  }

  React.useEffect(() => {
    initMono().then(() => {})
  }, [])

  return (
    <>
      <canvas id='canvas' style={{ width: '100vw', height: '100vh', position: 'absolute' }} />
      <div className={styles.controlPanel}>
        <div className={styles.folder}>sss</div>
        <div className={styles.folder}>
          <input
            type='color'
            id='head'
            name='head'
            value={color}
            onChange={(event) => {
              setColor(event.target.value)
              hexToOasis(color)
            }}
          />
          <label htmlFor='head'>Color</label>
        </div>
      </div>
    </>
  )
}
export default Monopoly
