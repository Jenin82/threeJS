import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Texture, TextureLoader, Color } from "three";
import earthTextureSrc from "./assets/earth.jpg";
import { OrbitControls } from "@react-three/drei";

export const SphereComponent: React.FC = () => {
    const { scene, gl} = useThree();
    const mesh = scene.children.find((child) => child.type === "Mesh");
    const [earthTexture, setEarthTexture] = useState<Texture>();

    useFrame(() => {
        if (mesh) {
            // mesh.rotation.x += 0.0011;
            mesh.rotation.y += 0.005;
        }
    });

    useEffect(() => {
        // Load the Earth texture
        const loader = new TextureLoader();
        loader.load(earthTextureSrc, (texture) => {
            setEarthTexture(texture);
        });

        // Set the background color of the renderer
        gl.setClearColor(new Color("#000000"));
    }, [gl]);

    return (
        <>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
            />
            {/* Sun (Directional Light) */}
            <directionalLight position={[5, 0, 0]} intensity={0.2} />

            {/* Ambient Light */}
            <ambientLight intensity={0.05} />

            <pointLight
                position={[-1.1, 0, 0]}
                distance={0.5}
                intensity={0.5}
                color="#aaffff"
            />

            <mesh position={[0, -10, 0]}>
                <sphereGeometry args={[20, 64, 64]} />
                {earthTexture && <meshStandardMaterial map={earthTexture} />}
            </mesh>
        </>
    );
};
