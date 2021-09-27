import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, OrbitControls } from '@react-three/drei'

function Box(props) {
	const mesh = useRef()
	const [state, setState] = useState({ isHovered: false })

	useFrame((state) => {
		const time = state.clock.getElapsedTime()
		mesh.current.position.y = mesh.current.position.y + Math.sin(time * 2) / 100
		mesh.current.rotation.y = mesh.current.rotation.x += 0.01
	})

	return (
		<mesh
			{...props}
			ref={mesh}
			scale={state.isHovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
			onPointerOver={(e) => setState({ isHovered: true })}
			onPointerOut={(e) => setState({ isHovered: false })}
		>
			<boxBufferGeometry args={[1, 1, 1]} />
			<meshPhongMaterial color={state.isHovered ? '#820263' : '#D90368'} shininess={100} />
		</mesh>
	)
}

export default function App() {
	return (
		<Canvas colorManagement>
			{/* This light makes things look pretty */}
			<ambientLight intensity={0.3} />
			{/* Our main source of light*/}
			<directionalLight position={[0, 10, 0]} intensity={1.5} />
			{/* A light to help illumnate the spinning boxes */}
			<pointLight position={[-10, 0, -20]} intensity={0.5} />
			<pointLight position={[0, -10, 0]} intensity={1.5} />

			<group>
				{/* The bottom plane that looks like ground */}
				<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
					<planeBufferGeometry args={[100, 100]} />
					<meshStandardMaterial color={'lightblue'} />
				</mesh>
			</group>
			{/* Blue sky with sun */}
			<Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
			{/* Left-most box */}
			<Box position={[-1, 0, 0]} />
			{/* Right-most box */}
			<Box position={[1, 0, 0]} />
			{/* Component that allows users to change camera perspective */}
			<OrbitControls />
		</Canvas>
	)
}
