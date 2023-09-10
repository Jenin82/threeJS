import { Canvas } from "@react-three/fiber";
import { SphereComponent } from "./SphereComponent";

function App() {
    return (
        <div className="container">
            <Canvas
                camera={{ position: [0, 0, 30] }}
                style={{ height: "100vh", width: "100%" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 1, 1]} />
                <SphereComponent />
            </Canvas>
        </div>
    );
}

export default App;