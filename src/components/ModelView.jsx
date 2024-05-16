import {
  OrbitControls,
  PerspectiveCamera,
  View,
  Html,
} from "@react-three/drei";
import { AmbientLight } from "three";
import Lights from "./Lights";
import { Suspense } from "react";
import Iphone from "./Iphone";
import * as THREE from "three";
import Loader from "./Loader";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={` w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* ambinet light */}
      <primitive object={new AmbientLight(0x404040, 0.3)} />

      <PerspectiveCamera makeDefault position={[0, 0, 40]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large'`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Html><Loader /></Html>}>
          <Iphone
            scale={index === 1 ? [160, 160, 160] : [180, 180, 180]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
