'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import { SimulatorPreset } from '../../data/simulatorPresets';
import { buildVeinScene, BuiltScene, SceneLayersConfig } from './VeinSceneBuilder';

interface VeinViewer3DProps {
  preset: SimulatorPreset;
  layers: SceneLayersConfig;
  height?: number;
}

export default function VeinViewer3D({ preset, layers, height = 480 }: VeinViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sceneRef = useRef<BuiltScene | null>(null);
  const resetCameraRef = useRef<() => void>(() => {});

  // Update layer visibility when props change
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.layers.vein.visible = layers.vein;
    sceneRef.current.layers.projects.visible = layers.projects;
    sceneRef.current.layers.grid.visible = layers.grid;
  }, [layers]);

  // Build and mount Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    setLoading(true);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate 900 engineering dark background

    const width = container.clientWidth || 600;
    const currentHeight = container.clientHeight || height;

    const camera = new THREE.PerspectiveCamera(45, width / currentHeight, 0.1, 1000);
    camera.position.set(22, 18, 32);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, currentHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(3, 3, 10);
    controls.maxDistance = 120;
    controls.minDistance = 5;

    resetCameraRef.current = () => {
      camera.position.set(22, 18, 32);
      controls.target.set(3, 3, 10);
      controls.update();
    };

    const built = buildVeinScene(preset);
    sceneRef.current = built;
    scene.add(built.root);

    // Apply current layers
    built.layers.vein.visible = layers.vein;
    built.layers.projects.visible = layers.projects;
    built.layers.grid.visible = layers.grid;

    setLoading(false);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || height;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      built.dispose();
      scene.remove(built.root);
      renderer.dispose();
      sceneRef.current = null;
    };
  }, [preset, height]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : height,
        borderRadius: isFullscreen ? 0 : 2,
        overflow: 'hidden',
        border: isFullscreen ? 'none' : '1px solid #334155',
        backgroundColor: '#0f172a'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.8)'
          }}
        >
          <CircularProgress size={36} sx={{ color: '#14B8A6' }} />
        </Box>
      )}

      {/* Floating Toolbar */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 1,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: 1.5,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          p: 0.5,
          zIndex: 10
        }}
      >
        <Tooltip title="Restablecer vista isométrica">
          <IconButton
            size="small"
            onClick={() => resetCameraRef.current()}
            sx={{ color: '#cbd5e1', '&:hover': { color: '#ffffff', bgcolor: 'rgba(255,255,255,0.08)' } }}
          >
            <RestartAltOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}>
          <IconButton
            size="small"
            onClick={toggleFullscreen}
            sx={{ color: '#cbd5e1', '&:hover': { color: '#ffffff', bgcolor: 'rgba(255,255,255,0.08)' } }}
          >
            {isFullscreen ? <FullscreenExitOutlinedIcon fontSize="small" /> : <FullscreenOutlinedIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Overlay legend tag */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          borderRadius: 1.5,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          px: 1.5,
          py: 0.75,
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', fontSize: '0.7rem', fontWeight: 600 }}>
          SIMULADOR THREE.JS EN TIEMPO REAL
        </Typography>
        <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.8rem' }}>
          {preset.name} · {preset.level} ({preset.strikeLabel} / {preset.dip}° {preset.dipDirection})
        </Typography>
      </Box>
    </Box>
  );
}

