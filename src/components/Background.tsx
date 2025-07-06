import type React from 'react';
import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    life: number;
    maxLife: number;
}

interface GeometricShape {
    x: number;
    y: number;
    rotation: number;
    size: number;
    opacity: number;
    color: string;
    type: 'triangle' | 'square' | 'hexagon' | 'diamond' | 'circle' | 'star';
}

// Customization configuration
const CONFIG = {
    // Particle settings
    particles: {
        count: 120,
        minSize: 1,
        maxSize: 4,
        minOpacity: 0.2,
        maxOpacity: 1.0,
        speed: 0.5,
        friction: 0.99,
        lifespan: { min: 100, max: 300 },
    },
    // Mouse interaction settings
    mouse: {
        enabled: true,
        influenceRadius: 150,
        forceStrength: 0.02,
        rotationRadius: 200,
        opacityRadius: 150,
    },
    // Shape settings
    shapes: {
        count: 150,
        minSize: 15,
        maxSize: 40,
        minOpacity: 0.05,
        maxOpacity: 0.3,
        baseRotationSpeed: 0.2,
        mouseRotationMultiplier: 2,
        opacityChangeSpeed: 0.01,
        opacityFadeSpeed: 0.008,
        gridCols: 15,
        gridRows: 10,
        gridRandomness: 0.6,
    },
    // Visual effects
    effects: {
        gridSize: 50,
        gridOpacity: 0.15,
        gridParallax: 0.01,
    },
};

// Theme-specific colors
const getThemeColors = (isDark: boolean) => ({
    particles: isDark
        ? ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']
        : ['#3B82F6', '#6366F1', '#0EA5E9', '#059669', '#D97706', '#DC2626'],
    grid: isDark ? '#1E293B' : '#E2E8F0',
});

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const shapesRef = useRef<GeometricShape[]>([]);
    const animationRef = useRef<number>();
    const { isDark } = useTheme();    // Initialize particles
    const initParticles = () => {
        const colors = getThemeColors(isDark);
        particlesRef.current = [];
        for (let i = 0; i < CONFIG.particles.count; i++) {
            const lifespan = CONFIG.particles.lifespan.min +
                Math.random() * (CONFIG.particles.lifespan.max - CONFIG.particles.lifespan.min);

            particlesRef.current.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * CONFIG.particles.speed,
                vy: (Math.random() - 0.5) * CONFIG.particles.speed,
                size: CONFIG.particles.minSize + Math.random() * (CONFIG.particles.maxSize - CONFIG.particles.minSize),
                opacity: CONFIG.particles.minOpacity,
                color: colors.particles[Math.floor(Math.random() * colors.particles.length)],
                life: lifespan,
                maxLife: lifespan,
            });
        }
    };    // Initialize geometric shapes
    const initShapes = () => {
        const colors = getThemeColors(isDark);
        shapesRef.current = [];
        const shapeTypes: ('triangle' | 'square' | 'hexagon' | 'diamond' | 'circle' | 'star')[] = [
            'triangle', 'square', 'hexagon', 'diamond', 'circle', 'star'
        ];

        // Create a grid-like distribution to prevent overlapping
        const cols = CONFIG.shapes.gridCols;
        const rows = CONFIG.shapes.gridRows;
        const cellWidth = window.innerWidth / cols;
        const cellHeight = window.innerHeight / rows;

        for (let i = 0; i < CONFIG.shapes.count; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);

            // Add some randomness within each cell to avoid perfect grid
            const offsetX = (Math.random() - 0.5) * cellWidth * CONFIG.shapes.gridRandomness;
            const offsetY = (Math.random() - 0.5) * cellHeight * CONFIG.shapes.gridRandomness;
            shapesRef.current.push({
                x: col * cellWidth + cellWidth / 2 + offsetX,
                y: row * cellHeight + cellHeight / 2 + offsetY,
                rotation: Math.random() * 360,
                size: CONFIG.shapes.minSize + Math.random() * (CONFIG.shapes.maxSize - CONFIG.shapes.minSize),
                opacity: CONFIG.shapes.minOpacity,
                color: colors.particles[Math.floor(Math.random() * colors.particles.length)],
                type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
            });
        }
    };

    // Draw geometric shape
    const drawShape = (ctx: CanvasRenderingContext2D, shape: GeometricShape) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate((shape.rotation * Math.PI) / 180);
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = shape.opacity;

        const size = shape.size; switch (shape.type) {
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0, -size / 2);
                ctx.lineTo(-size / 2, size / 2);
                ctx.lineTo(size / 2, size / 2);
                ctx.closePath();
                ctx.stroke();
                break;
            case 'square':
                ctx.strokeRect(-size / 2, -size / 2, size, size);
                break;
            case 'hexagon':
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    const x = Math.cos(angle) * size / 2;
                    const y = Math.sin(angle) * size / 2;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
                break;
            case 'diamond':
                ctx.beginPath();
                ctx.moveTo(0, -size / 2);
                ctx.lineTo(size / 2, 0);
                ctx.lineTo(0, size / 2);
                ctx.lineTo(-size / 2, 0);
                ctx.closePath();
                ctx.stroke();
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 'star':
                ctx.beginPath();
                for (let i = 0; i < 10; i++) {
                    const angle = (i * Math.PI) / 5;
                    const radius = i % 2 === 0 ? size / 2 : size / 4;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
                break;
        }
        ctx.restore();
    };    // Update and draw particles
    const updateParticles = (ctx: CanvasRenderingContext2D) => {
        const mousePos = mousePosRef.current;
        const colors = getThemeColors(isDark);

        particlesRef.current.forEach((particle) => {
            // Calculate distance to mouse
            const dx = mousePos.x - particle.x;
            const dy = mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);            // Apply mouse influence (only if mouse interaction is enabled)
            if (CONFIG.mouse.enabled && distance < CONFIG.mouse.influenceRadius) {
                const force = (CONFIG.mouse.influenceRadius - distance) / CONFIG.mouse.influenceRadius;
                particle.vx += (dx / distance) * force * CONFIG.mouse.forceStrength;
                particle.vy += (dx / distance) * force * CONFIG.mouse.forceStrength;

                // Make particles glow when influenced by mouse
                particle.opacity = Math.min(CONFIG.particles.maxOpacity, particle.opacity + 0.1);
            } else {
                particle.opacity = Math.max(CONFIG.particles.minOpacity, particle.opacity - 0.02);
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Add friction
            particle.vx *= CONFIG.particles.friction;
            particle.vy *= CONFIG.particles.friction;

            // Bounce off edges
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -0.8;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -0.8;

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));

            // Update life
            particle.life--;
            if (particle.life <= 0) {
                // Respawn particle
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
                particle.vx = (Math.random() - 0.5) * CONFIG.particles.speed;
                particle.vy = (Math.random() - 0.5) * CONFIG.particles.speed;
                particle.life = particle.maxLife;
                particle.color = colors.particles[Math.floor(Math.random() * colors.particles.length)];
            }

            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.opacity * (particle.life / particle.maxLife);
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    };    // Update and draw shapes
    const updateShapes = (ctx: CanvasRenderingContext2D) => {
        const mousePos = mousePosRef.current;

        shapesRef.current.forEach((shape) => {
            // Calculate distance to mouse for rotation effect
            const dx = mousePos.x - shape.x;
            const dy = mousePos.y - shape.y;
            const distance = Math.sqrt(dx * dx + dy * dy);            // Rotate based on mouse proximity (only if mouse interaction is enabled)
            if (CONFIG.mouse.enabled && distance < CONFIG.mouse.rotationRadius) {
                const rotationSpeed = (CONFIG.mouse.rotationRadius - distance) / CONFIG.mouse.rotationRadius * CONFIG.shapes.mouseRotationMultiplier;
                shape.rotation += rotationSpeed;
            } else {
                shape.rotation += CONFIG.shapes.baseRotationSpeed;
            }

            // Pulse opacity based on mouse distance (only if mouse interaction is enabled)
            if (CONFIG.mouse.enabled && distance < CONFIG.mouse.opacityRadius) {
                shape.opacity = Math.min(CONFIG.shapes.maxOpacity, shape.opacity + CONFIG.shapes.opacityChangeSpeed);
            } else {
                shape.opacity = Math.max(CONFIG.shapes.minOpacity, shape.opacity - CONFIG.shapes.opacityFadeSpeed);
            }

            drawShape(ctx, shape);
        });
    };    // Draw grid pattern
    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        const mousePos = mousePosRef.current;
        const colors = getThemeColors(isDark);
        const offsetX = (mousePos.x * CONFIG.effects.gridParallax) % CONFIG.effects.gridSize;
        const offsetY = (mousePos.y * CONFIG.effects.gridParallax) % CONFIG.effects.gridSize;

        ctx.save();
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;
        ctx.globalAlpha = CONFIG.effects.gridOpacity;

        // Vertical lines
        for (let x = -offsetX; x < window.innerWidth + CONFIG.effects.gridSize; x += CONFIG.effects.gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, window.innerHeight);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = -offsetY; y < window.innerHeight + CONFIG.effects.gridSize; y += CONFIG.effects.gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(window.innerWidth, y);
            ctx.stroke();
        }
        ctx.restore();
    };

    // Main animation loop
    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background elements
        drawGrid(ctx);
        updateParticles(ctx);
        updateShapes(ctx);

        animationRef.current = requestAnimationFrame(animate);
    };    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        let clientX: number, clientY: number;

        if ('touches' in e && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
            clientX = e.clientX;
            clientY = e.clientY;
        } else {
            return;
        }

        mousePosRef.current = { x: clientX, y: clientY };
    };

    // Handle resize
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        initParticles();
        initShapes();
    }; useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set initial canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Initialize particles and shapes
        initParticles();
        initShapes();

        // Set initial mouse position to off-screen so shapes start invisible
        mousePosRef.current = {
            x: -1000,  // Off-screen position
            y: -1000   // Off-screen position
        };

        // Event listeners - try both document and window
        const addMouseListeners = () => {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('touchmove', handleMouseMove);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('resize', handleResize);
        };

        const removeMouseListeners = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };

        addMouseListeners();

        // Start animation
        animate();

        return () => {
            removeMouseListeners();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isDark]); // Re-run when theme changes
    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }}
        />
    );
};

export default Background;
