import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Three() {
  const mesh = useRef();
  const gltf = useLoader(GLTFLoader, 'angry_birds_red/scene.gltf');

  useFrame(() => {
    mesh.current.rotation.y += 0.02;
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh} scale={[0.15, 0.15, 0.15]}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}
